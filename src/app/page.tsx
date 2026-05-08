import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="p-6 pt-3 md:pt-6 min-h-screen">
      <header className="mb-3 font-bold">Hahnbee Lee</header>
      <div className="text-sm/6 font-[family-name:var(--font-geist-mono)] mb-10">
        Co-founder @ Mintlify
      </div>
      {posts.length > 0 && (
        <section>
          <h2 className="text-sm font-bold mb-3">Writing</h2>
          <ul className="text-sm/6 font-[family-name:var(--font-geist-mono)]">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex justify-between gap-4 items-baseline"
              >
                <Link href={`/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
                <time
                  dateTime={post.date}
                  className="text-neutral-500 tabular-nums shrink-0"
                >
                  {formatDate(post.date)}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
