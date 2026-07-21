/**
 * RSS Feed Generator
 * Run at build time to produce /public/rss.xml and /public/atom.xml
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';

const SITE_URL = 'https://sadimanna.github.io';
const AUTHOR = {
  name: 'Dr. Siladittya Manna',
  link: SITE_URL,
};

function getPostSlugs() {
  const dir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function readPost(slug) {
  const fullPath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date) : new Date(),
    excerpt: data.excerpt || '',
    categories: data.categories || [],
    tags: data.tags || [],
  };
}

async function main() {
  const slugs = getPostSlugs();
  if (slugs.length === 0) {
    console.log('No posts found, skipping RSS generation.');
    return;
  }

  const posts = slugs.map(readPost).sort((a, b) => b.date - a.date);

  const feed = new Feed({
    title: 'Dr. Siladittya Manna — Technical Blog',
    description:
      'Technical blog on federated learning, self-supervised learning, medical AI, and trustworthy machine learning.',
    id: SITE_URL,
    link: `${SITE_URL}/blog/`,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} Dr. Siladittya Manna`,
    updated: posts[0].date,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
    },
    author: AUTHOR,
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}/`,
      link: `${SITE_URL}/blog/${post.slug}/`,
      description: post.excerpt,
      date: post.date,
      author: [AUTHOR],
      category: post.categories.map((c) => ({ name: c })),
    });
  });

  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicDir, 'atom.xml'), feed.atom1());
  console.log(`✅ Generated RSS (${posts.length} posts) → public/rss.xml, public/atom.xml`);
}

main().catch(console.error);
