import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Ivan Zhang 首页">
        <span className="brand-logo" aria-hidden="true" />
        <span>Ivan Zhang</span>
      </Link>
      <nav className="nav" aria-label="Primary">
        <Link href="/">文章</Link>
        <Link href={{ pathname: "/category" }}>专栏</Link>
        <Link href="/about">关于</Link>
        <Link href="/archive">更多</Link>
      </nav>
    </header>
  );
}
