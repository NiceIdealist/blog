import Link from "next/link";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import {
  columnToSlug,
  getAllColumns,
  getColumnDescription,
  getColumnLabel,
  getSortedPostsMeta,
} from "@/lib/posts";

type HomePageProps = {
  searchParams: Promise<{ q?: string }>;
};

const QUOTES = [
  {
    content: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    content: "Focus is saying no to the hundred other good ideas.",
    author: "Steve Jobs",
  },
  {
    content: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    content: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const posts = await getSortedPostsMeta();
  const { q = "" } = await searchParams;
  const query = q.trim();
  const queryLower = query.toLowerCase();
  const filteredPosts = query
    ? posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(queryLower) ||
          post.excerpt.toLowerCase().includes(queryLower) ||
          post.author.toLowerCase().includes(queryLower) ||
          post.column.toLowerCase().includes(queryLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(queryLower))
        );
      })
    : posts;
  const [featuredPost, ...remainingPosts] = filteredPosts;
  const quoteOfTheDay = QUOTES[new Date().getDate() % QUOTES.length];
  const columns = await getAllColumns();
  const columnPostCount = posts.reduce<Map<string, number>>((acc, post) => {
    acc.set(post.column, (acc.get(post.column) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap">
        <section className="site-slogan" aria-label="价值主张">
          <p className="slogan-label slogan-label-accent">价值主张</p>
          <h1 className="slogan-heading">赋能教育，重塑商业</h1>
          <p className="slogan-desc">
            <br />
            为初创公司，建立AI业务流，实现业务结果
            <br />
            为就业者，建立AI思维，实现智能化转型
            <br />
            物竞天择，适者生存，拥抱变化
          </p>
        </section>

        <section className="columns-section" aria-label="专栏内容">
          <div className="columns-head">
            <div className="columns-head-main">
              <h2 className="columns-kicker">专栏内容</h2>
            </div>
            <p className="columns-head-action">
              <Link href={{ pathname: "/category" }} className="action-text columns-view-all">
                查看所有专栏
              </Link>
            </p>
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
                  <h3 className="column-card-title">{getColumnLabel(column)}</h3>
                  <p className="column-card-desc">{getColumnDescription(column)}</p>
                  <p className="column-card-action">进入专栏</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="columns-empty">暂时还没有可展示的专栏内容。</p>
          )}
        </section>

        <section className="latest-articles-section" aria-label="全部文章">
          <div className="latest-articles-head">
            <div className="latest-articles-main">
              <p className="latest-articles-kicker">文章列表</p>
            </div>
            <p className="latest-articles-action">
              <Link href={{ pathname: "/archive" }} className="action-text latest-articles-link">
                查看全部
              </Link>
            </p>
          </div>
        
          {filteredPosts.length > 0 ? (
            <>
              <div className="latest-articles-layout">
                <div className="latest-articles-content">
                  {featuredPost && (
                    <div className="latest-articles-spotlight">
                      <PostCard post={featuredPost} featured />
                    </div>
                  )}
                  {remainingPosts.length > 0 && (
                    <div className="post-list latest-articles-list">
                      {remainingPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  )}
                </div>
                <aside className="latest-articles-quote" aria-label="名人名言">
                  <p className="latest-quote-kicker">今日一句</p>
                  <blockquote className="latest-quote-content">“{quoteOfTheDay.content}”</blockquote>
                  <p className="latest-quote-author">— {quoteOfTheDay.author}</p>
                  <p className="latest-quote-note">愿你今天保持清晰与行动</p>
                </aside>
              </div>
            </>
          ) : (
            <div className="latest-articles-layout">
              <div>
                <p className="columns-empty">
                  {query ? "没有找到匹配的文章，试试更短的关键词。" : "暂时还没有可展示的文章。"}
                </p>
              </div>
              <aside className="latest-articles-quote" aria-label="名人名言">
                <p className="latest-quote-kicker">今日一句</p>
                <blockquote className="latest-quote-content">“{quoteOfTheDay.content}”</blockquote>
                <p className="latest-quote-author">— {quoteOfTheDay.author}</p>
                <p className="latest-quote-note">愿你今天保持清晰与行动</p>
              </aside>
            </div>
          )}
        </section>

      </section>      
    </main>
  );
}
