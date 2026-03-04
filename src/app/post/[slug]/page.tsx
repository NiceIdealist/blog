import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { columnToSlug, getColumnLabel, getPostBySlug, getSortedPostsMeta } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getSortedPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <article className="content-wrap post-content">
        <p className="section-eyebrow">ARTICLE</p>
        <div className="post-page-meta">
          <time dateTime={post.date}>{post.date}</time>
          <Link className="action-text" href={`/category/${columnToSlug(post.column)}`}>
            {getColumnLabel(post.column)}
          </Link>
        </div>
        {post.tags.length > 0 && (
          <div className="post-tags" aria-label="文章标签">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <h1>{post.title}</h1>
        <p className="post-lead">在复杂环境里，保持独立判断，持续行动，并为长期结果负责。</p>
        <section className="post-summary" aria-label="结论先行">
          <h2>结论先行</h2>
          <p>{post.excerpt}</p>
        </section>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
