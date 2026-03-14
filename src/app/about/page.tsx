import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap about-content" aria-label="关于">
        <header className="about-header">
          <h1>关于</h1>
          <p className="about-lead">我是 Ivan Zhang，专注于写作、创业与长期主义实践。</p>
        </header>
        <div className="about-body">
          <p>这个博客不是情绪日志，而是面向现实问题的决策手册。</p>
          <ul className="about-principles">
            <li>先看本质，再做判断</li>
            <li>先搭系统，再拼意志力</li>
            <li>先小步验证，再持续放大</li>
            <li>在变化中保持战略定力</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
