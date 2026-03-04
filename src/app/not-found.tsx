import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="page-wrap">
      <section className="content-wrap">
        <h1 className="section-title">页面不存在</h1>
        <p>你访问的页面不存在或已被移除。</p>
        <p>
          <Link className="action-primary" href="/">
            返回首页
          </Link>
        </p>
      </section>
    </main>
  );
}
