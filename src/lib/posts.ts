import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  column: string;
  tags: string[];
  excerpt: string;
  cover?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * 专栏文案配置：可在这里自定义专栏名称与一句话描述。
 * key 建议使用文章 frontmatter 的原始 column 值。
 */
export const COLUMN_COPY: Record<string, { label: string; description: string }> = {
  "Writing Strategies": {
    label: "写作策略",
    description: "从表达到结构化思考，提升内容影响力。",
  },
  "Founder Notes": {
    label: "创始人笔记",
    description: "围绕战略、组织与执行的长期实践记录。",
  },
  "Marketing Strategies": {
    label: "营销策略",
    description: "聚焦增长系统、渠道打法与转化效率。",
  },
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getSortedPostsMeta(): Promise<PostMeta[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
      .map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data } = matter(fileContents);
        const slug = (data.slug as string | undefined) ?? fileName.replace(/\.(mdx|md)$/i, "");

        return {
          slug,
          title: String(data.title ?? slug),
          date: String(data.date ?? ""),
          author: String(data.author ?? "Ivan Zhang"),
          column: String((data.column as string | undefined) ?? (data.category as string | undefined) ?? "General"),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          excerpt: String(data.excerpt ?? ""),
          cover: (data.cover as string | undefined) ?? undefined,
        };
      }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllColumns(): Promise<string[]> {
  const posts = await getSortedPostsMeta();
  return Array.from(new Set(posts.map((post) => post.column)));
}

export async function getPostsByColumn(columnSlug: string): Promise<PostMeta[]> {
  const posts = await getSortedPostsMeta();
  return posts.filter((post) => toSlug(post.column) === columnSlug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileNames = await fs.readdir(postsDirectory);
  let fileName = fileNames.find((candidate) => candidate.replace(/\.(mdx|md)$/i, "") === slug);

  if (!fileName) {
    for (const candidate of fileNames) {
      const fileContents = await fs.readFile(path.join(postsDirectory, candidate), "utf8");
      const { data } = matter(fileContents);
      if ((data.slug as string | undefined) === slug) {
        fileName = candidate;
        break;
      }
    }
  }

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    slug: ((data.slug as string | undefined) ?? fileName.replace(/\.(mdx|md)$/i, "")) as string,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Ivan Zhang"),
    column: String((data.column as string | undefined) ?? (data.category as string | undefined) ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
    cover: (data.cover as string | undefined) ?? undefined,
    contentHtml: processedContent.toString(),
  };
}

export async function getArchiveGroups(): Promise<Array<{ yearMonth: string; posts: PostMeta[] }>> {
  const posts = await getSortedPostsMeta();
  const grouped = new Map<string, PostMeta[]>();

  for (const post of posts) {
    const key = post.date.slice(0, 7);
    const bucket = grouped.get(key) ?? [];
    bucket.push(post);
    grouped.set(key, bucket);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([yearMonth, groupedPosts]) => ({ yearMonth, posts: groupedPosts }));
}

export function columnToSlug(column: string): string {
  return toSlug(column);
}

export function getColumnLabel(column: string): string {
  return COLUMN_COPY[column]?.label ?? column;
}

export function getColumnDescription(column: string): string {
  return COLUMN_COPY[column]?.description ?? "进入专栏，查看该主题下的全部文章。";
}
