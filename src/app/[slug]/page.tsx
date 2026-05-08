import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPost, postExists } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!postExists(slug)) return {};
  const post = await getPost(slug);
  return {
    title: `${post.title} — Hahnbee Lee`,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!postExists(slug)) notFound();
  const post = await getPost(slug);

  return (
    <main className="p-6 pt-3 md:pt-6 min-h-screen">
      <header className="mb-6">
        <Link href="/" className="text-sm font-bold hover:underline">
          ← Back
        </Link>
      </header>
      <article>
        <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
        <time
          dateTime={post.date}
          className="block text-sm text-neutral-500 font-[family-name:var(--font-geist-mono)] mb-8"
        >
          {formatDate(post.date)}
        </time>
        <div
          className="prose-content text-sm/7"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
