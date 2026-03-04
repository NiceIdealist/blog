import Link from "next/link";
import { type PostMeta } from "@/lib/posts";

type PostCardProps = {
  post: PostMeta;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`post-card${featured ? " post-card-featured" : ""}`}>
      <Link href={`/post/${post.slug}`} className="post-card-link" aria-label={`阅读文章：${post.title}`}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-meta" aria-label="文章元信息">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.author}</span>
        </div>
      </Link>
    </article>
  );
}
