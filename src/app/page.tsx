export default function Home() {
  return (
    <main className="p-6 pt-3 md:pt-6 min-h-screen">
      <header className="mb-3 font-bold">Hahnbee Lee</header>
      <div className="text-sm/6 font-[family-name:var(--font-geist-mono)]">
        Co-founder @{" "}
        <a
          href="https://www.mintlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          Mintlify
        </a>
      </div>
    </main>
  );
}
