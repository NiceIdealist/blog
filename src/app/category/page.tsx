import Link from "next/link";
import { Header } from "@/components/Header";
import {
  columnToSlug,
  getAllColumns,
  getColumnDescription,
  getColumnLabel,
  getSortedPostsMeta,
} from "@/lib/posts";

export default async function CategoryIndexPage() {
  const posts = await getSortedPostsMeta();
  const columns = await getAllColumns();
  const columnPostCount = posts.reduce<Map<string, number>>((acc, post) => {
    acc.set(post.column, (acc.get(post.column) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap">
        <section className="columns-section" aria-label="所有专栏">
          <div className="columns-head">
            <h1 className="section-title">所有专栏</h1>
          </div>
          {columns.length > 0 ? (
            <div className="columns-grid">
              {columns.map((column) => (
                <Link
                  key={column}
                  href={`/category/${columnToSlug(column)}`}
                  className="column-card"
                >
                  <div className="column-card-top">
                    <p className="column-card-meta">{columnPostCount.get(column) ?? 0} 篇文章</p>
                    <span className="column-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h2 className="column-card-title">{getColumnLabel(column)}</h2>
                  <p className="column-card-desc">{getColumnDescription(column)}</p>
                  <p className="column-card-action">进入专栏</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="columns-empty">暂时还没有可展示的专栏内容。</p>
          )}
        </section>
      </section>
    </main>
  );
}
