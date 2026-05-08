import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function readPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    data: data as Omit<PostMeta, "slug">,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data } = readPost(slug);
    return { slug, ...data };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const { data, content } = readPost(slug);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    ...data,
    contentHtml: processed.toString(),
  };
}

export function postExists(slug: string): boolean {
  return fs.existsSync(path.join(postsDirectory, `${slug}.md`));
}
