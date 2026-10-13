import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([1-4])\b([^>]*)>(.*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const attrs = match[2];
    const idMatch = attrs.match(/\bid="([^"]*)"/i);
    const id = idMatch ? idMatch[1] : '';

    // Strip anchor icons, HTML tags, and leading '#' characters
    let text = match[3]
      .replace(/<span\s+class="anchor-icon"[^>]*>.*?<\/span>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
    text = text.replace(/^#\s*/, '').trim();

    if (id && text) {
      headings.push({
        level,
        id,
        text,
      });
    }
  }
  return headings;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse as any)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight, { detect: true, ignoreMissing: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['anchor-icon'] },
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function readPostFile(slug: string): { data: Record<string, any>; content: string } {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, content } = readPostFile(slug);
  const contentHtml = await markdownToHtml(content);
  const headings = extractHeadings(contentHtml);
  const readingTime = computeReadingTime(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().split('T')[0],
    categories: data.categories || [],
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    coverImage: data.coverImage,
    readingTime,
    contentHtml,
    headings,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.map(({ contentHtml, headings, ...meta }) => meta);
}

export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((post) =>
    post.categories.forEach((cat) => map.set(cat, (map.get(cat) || 0) + 1))
  );
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((post) =>
    post.tags.forEach((tag) => map.set(tag, (map.get(tag) || 0) + 1))
  );
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getSearchIndex(): Promise<
  { slug: string; title: string; excerpt: string; categories: string[]; tags: string[]; date: string; readingTime: number }[]
> {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    categories: p.categories,
    tags: p.tags,
    date: p.date,
    readingTime: p.readingTime,
  }));
}
