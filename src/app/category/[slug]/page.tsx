import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { columnToSlug, getAllColumns, getColumnLabel, getPostsByColumn } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const columns = await getAllColumns();
  return columns.map((column) => ({ slug: columnToSlug(column) }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getPostsByColumn(slug);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap">
        <h1 className="section-title">{getColumnLabel(posts[0]?.column ?? "")}</h1>
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
