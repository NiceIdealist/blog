import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <main id="main-content" className="page-wrap">
      <Header />
      <section className="content-wrap">
        <p className="section-eyebrow">ABOUT</p>
        <h1 className="section-title">关于</h1>
        <p className="section-lead">我是 Ivan Zhang，专注于写作、创业与长期主义实践。</p>
        <p>这个博客不是情绪日志，而是面向现实问题的决策手册。</p>
        <ul className="about-principles">
          <li>先看本质，再做判断</li>
          <li>先搭系统，再拼意志力</li>
          <li>先小步验证，再持续放大</li>
          <li>在变化中保持战略定力</li>
        </ul>
      </section>
    </main>
  );
}
