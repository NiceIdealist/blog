import Link from "next/link";
import { Header } from "@/components/Header";
import { columnToSlug, getArchiveGroups, getColumnLabel } from "@/lib/posts";

export default async function ArchivePage() {
  const groups = await getArchiveGroups();

  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap">
        <p className="section-eyebrow">ARCHIVE</p>
        <h1 className="section-title">归档</h1>
        <p className="section-lead">按时间回看每一轮思考与行动，保留可复盘的战略轨迹。</p>
        <div className="archive-list">
          {groups.map((group) => (
            <section key={group.yearMonth} className="archive-group">
              <h2>{group.yearMonth}</h2>
              <ul>
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    <span>{post.date}</span>
                    <Link href={`/category/${columnToSlug(post.column)}`}>
                      {getColumnLabel(post.column)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
