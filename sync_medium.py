#!/usr/bin/env python3
"""
sync_medium.py
Syncs published Medium articles from a user's RSS feed to local Markdown files.
Matches the structure and frontmatter conventions of sadimanna.github.io.
"""

import os
import re
import sys
import glob
import json
import urllib.parse
from datetime import datetime
import requests
import feedparser
from bs4 import BeautifulSoup
from markdownify import markdownify as md

# Configuration from environment variables
MEDIUM_USER = os.environ.get("MEDIUM_USER", "mannasiladittya")
OUT_DIR = os.environ.get("OUT_DIR", "content/posts")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "").strip()

# If OUT_DIR was passed as _posts (e.g. from generic template), but content/posts exists, use content/posts
if OUT_DIR == "_posts" and os.path.exists("content/posts"):
    OUT_DIR = "content/posts"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}

CATEGORY_KEYWORDS = {
    "Federated Learning": ["federated", "fl", "privacy-preserving", "aggregation"],
    "Large Language Models": ["llm", "large language model", "llama", "gemma", "gpt", "gguf", "transformers"],
    "Deployment": ["deployment", "fastapi", "server", "docker", "serving", "llama-server", "hugging face"],
    "Computer Vision": ["computer vision", "cv", "object detection", "segmentation", "mnist", "cifar", "vgg", "resnet", "detectron2"],
    "Self-Supervised Learning": ["self-supervised", "ssl", "simclr", "contrastive"],
    "Medical AI": ["medical", "imaging", "nii", "healthcare"],
    "Deep Learning": ["deep learning", "neural network", "backpropagation", "loss", "weights", "biases", "wandb"],
    "Machine Learning": ["machine learning", "logistic regression", "bias-variance", "cross-validation", "evaluation"],
    "Mathematics": ["mathematics", "math", "proof", "divisible", "linear algebra", "qr-factorization"],
    "PyTorch": ["pytorch", "torch", "tensor"],
    "Git": ["git", "github", "branch", "repo", "repository", "remote"],
    "Version Control": ["version control", "git", "branching"],
    "Developer Tools": ["developer tools", "tools", "terminal", "shell", "colab", "script"],
    "Data Visualization": ["matplotlib", "data visualization", "chart", "plot", "waterfall"],
    "Python": ["python", "pandas", "dataframe", "timeit"],
}


def sanitize_slug(title: str, max_len: int = 60) -> str:
    """Create a URL-safe slug matching existing post format."""
    # Remove emoji and special symbols
    s = re.sub(r"[^\w\s-]", "", title).strip().lower()
    # Replace whitespace and repeated dashes with single dash
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    if len(s) > max_len:
        # Avoid splitting right after a dash
        s = s[:max_len].rstrip("-")
    return s or "medium-post"


def get_existing_posts(posts_dir: str):
    """
    Scans existing markdown posts to collect canonical URLs, Medium post IDs,
    and normalized titles to avoid duplicate syncing.
    """
    known_canonicals = set()
    known_ids = set()
    known_titles = set()

    if not os.path.exists(posts_dir):
        return known_canonicals, known_ids, known_titles

    for filepath in glob.glob(os.path.join(posts_dir, "*.md")):
        try:
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read(3000)

            # Extract canonical_url
            c_match = re.search(r"canonical_url:\s*([^\n\r]+)", content)
            if c_match:
                raw_url = c_match.group(1).strip().strip("'\"")
                clean_url = raw_url.split("?")[0].rstrip("/")
                known_canonicals.add(clean_url)
                # Medium post ID is the last segment after hyphen
                last_seg = clean_url.split("-")[-1]
                if len(last_seg) >= 8 and re.match(r"^[0-9a-fA-F]+$", last_seg):
                    known_ids.add(last_seg.lower())

            # Extract title
            t_match = re.search(r'title:\s*["\']?(.*?)["\']?\s*$', content, re.MULTILINE)
            if t_match:
                title = t_match.group(1).strip().lower()
                known_titles.add(title)
        except Exception as e:
            print(f"Warning reading {filepath}: {e}")

    return known_canonicals, known_ids, known_titles


def infer_categories(title: str, tags: list[str]) -> list[str]:
    """Infers 1-2 categories based on title text and Medium tags."""
    text = (title + " " + " ".join(tags)).lower()
    categories = []

    for cat_name, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in text for kw in keywords):
            categories.append(cat_name)
            if len(categories) >= 2:
                break

    if not categories:
        if tags:
            # Capitalize first tag
            categories = [tags[0].replace("-", " ").title()]
        else:
            categories = ["Technology"]

    return categories


def fetch_gist_content(gist_id: str) -> str:
    """Fetch GitHub gist file contents via GitHub REST API."""
    api_url = f"https://api.github.com/gists/{gist_id}"
    req_headers = {"Accept": "application/vnd.github.v3+json", "User-Agent": "sync-medium"}
    if GITHUB_TOKEN:
        req_headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

    try:
        resp = requests.get(api_url, headers=req_headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            files = data.get("files", {})
            snippets = []
            for fname, finfo in files.items():
                language = (finfo.get("language") or "").lower()
                code = finfo.get("content", "")
                snippets.append(f"```{language}\n# {fname}\n{code}\n```")
            return "\n\n".join(snippets)
    except Exception as e:
        print(f"Failed to fetch gist {gist_id}: {e}")

    return f"[View GitHub Gist](https://gist.github.com/{gist_id})"


def download_and_localize_images(soup: BeautifulSoup, slug: str) -> None:
    """Downloads Medium CDN images locally into public/images/blog/{slug}/."""
    images = soup.find_all("img")
    if not images:
        return

    images_dir = os.path.join("public", "images", "blog", slug)
    img_idx = 1

    for img in images:
        src = img.get("src", "")
        # Skip tracking pixels
        if not src or "stat?event=" in src:
            img.decompose()
            continue

        try:
            os.makedirs(images_dir, exist_ok=True)
            # Determine extension
            ext = ".png"
            if ".jpg" in src.lower() or ".jpeg" in src.lower():
                ext = ".jpg"
            elif ".gif" in src.lower():
                ext = ".gif"
            elif ".webp" in src.lower():
                ext = ".webp"

            local_filename = f"img{img_idx}{ext}"
            local_filepath = os.path.join(images_dir, local_filename)

            # Download if not already present
            if not os.path.exists(local_filepath):
                r = requests.get(src, headers=HEADERS, timeout=15)
                if r.status_code == 200:
                    with open(local_filepath, "wb") as f:
                        f.write(r.content)
                else:
                    # Keep remote src if download failed
                    continue

            # Update img src to relative public path
            img["src"] = f"/images/blog/{slug}/{local_filename}"
            img_idx += 1
        except Exception as e:
            print(f"Could not download image {src}: {e}")


def process_embedded_gists(soup: BeautifulSoup) -> None:
    """Finds script/iframe/a gist embeds and replaces them with code blocks."""
    # Look for script embeds
    for script in soup.find_all("script"):
        src = script.get("src", "")
        m = re.search(r"gist\.github\.com/(?:[\w-]+/)?([a-fA-F0-9]+)\.js", src)
        if m:
            gist_id = m.group(1)
            code_md = fetch_gist_content(gist_id)
            script.replace_with(soup.new_string(f"\n\n{code_md}\n\n"))

    # Look for iframe embeds
    for iframe in soup.find_all("iframe"):
        src = iframe.get("src", "")
        m = re.search(r"gist\.github\.com/(?:[\w-]+/)?([a-fA-F0-9]+)", src)
        if m:
            gist_id = m.group(1)
            code_md = fetch_gist_content(gist_id)
            iframe.replace_with(soup.new_string(f"\n\n{code_md}\n\n"))


def sync_medium():
    print(f"=== Starting Medium Sync for @{MEDIUM_USER} ===")
    print(f"Output directory: {OUT_DIR}")

    os.makedirs(OUT_DIR, exist_ok=True)

    known_canonicals, known_ids, known_titles = get_existing_posts(OUT_DIR)
    print(f"Indexed {len(known_canonicals)} existing posts with canonical URLs.")

    feed_url = f"https://medium.com/feed/@{MEDIUM_USER}"
    print(f"Fetching RSS feed from: {feed_url}")

    feed = feedparser.parse(feed_url, request_headers=HEADERS)

    if not feed.entries:
        print("No entries found in RSS feed. Please check the username or network.")
        return 0

    print(f"Found {len(feed.entries)} entries in RSS feed.")
    new_posts_count = 0

    for entry in feed.entries:
        title = entry.get("title", "").strip()
        link = entry.get("link", "").strip()
        clean_link = link.split("?")[0].rstrip("/")
        last_seg = clean_link.split("-")[-1] if "-" in clean_link else ""

        # Check if already present
        if clean_link in known_canonicals:
            print(f"  [Skip] URL already synced: {title}")
            continue

        if len(last_seg) >= 8 and last_seg.lower() in known_ids:
            print(f"  [Skip] Medium ID {last_seg} already synced: {title}")
            continue

        norm_title = re.sub(r"[^\w\s]", "", title).strip().lower()
        if norm_title in known_titles:
            print(f"  [Skip] Title already synced: {title}")
            continue

        print(f"\n⚡ New post detected: {title}")

        # Parse publication date
        published_parsed = getattr(entry, "published_parsed", None)
        if published_parsed:
            post_date = datetime(*published_parsed[:6]).strftime("%Y-%m-%d")
        else:
            post_date = datetime.now().strftime("%Y-%m-%d")

        # Extract tags
        tags = []
        if hasattr(entry, "tags"):
            tags = [t.term.strip().lower() for t in entry.tags if hasattr(t, "term") and t.term]

        categories = infer_categories(title, tags)
        slug = sanitize_slug(title)

        # Retrieve HTML content
        content_html = ""
        if hasattr(entry, "content") and entry.content:
            content_html = entry.content[0].value
        elif hasattr(entry, "summary"):
            content_html = entry.summary

        soup = BeautifulSoup(content_html, "html.parser")

        # Process embedded gists
        process_embedded_gists(soup)

        # Download images locally
        download_and_localize_images(soup, slug)

        # Convert to Markdown
        markdown_body = md(
            str(soup),
            heading_style="ATX",
            bullets="-",
            strip=["script", "style"],
        ).strip()

        # Format frontmatter
        categories_json = json.dumps(categories)
        tags_json = json.dumps(tags)
        escaped_title = title.replace('"', '\\"')

        post_content = f"""---
title: "{escaped_title}"
date: {post_date}
categories: {categories_json}
permalink: /blog/{slug}/
canonical_url: {clean_link}
tags: {tags_json}
---

{markdown_body}

---
*Originally published on [Medium]({clean_link}).*
"""

        filename = f"{post_date}-{slug}.md"
        filepath = os.path.join(OUT_DIR, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(post_content)

        print(f"  ✅ Saved post: {filepath}")
        new_posts_count += 1

        # Update known records to prevent duplicate within the same run
        known_canonicals.add(clean_link)
        if len(last_seg) >= 8:
            known_ids.add(last_seg.lower())
        known_titles.add(norm_title)

    print(f"\nFinished sync. Total new posts added: {new_posts_count}")
    return new_posts_count


if __name__ == "__main__":
    count = sync_medium()
    sys.exit(0)
