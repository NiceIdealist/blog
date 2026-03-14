import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getPostBySlug, getSortedPostsMeta } from "@/lib/posts";

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
        <header className="post-header">
          <h1>{post.title}</h1>
          <section className="post-summary" aria-label="文章引言">
            <p className="post-summary-copy">{post.excerpt}</p>
          </section>
          <div className="post-page-meta" aria-label="文章信息">
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.author}</span>
          </div>
        </header>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
