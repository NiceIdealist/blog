import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ivan Zhang",
  description: "Ivan Zhang 的个人博客，聚焦写作、创业与长期主义。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a href="#main-content" className="skip-link">
          跳转到正文
        </a>
        {children}
      </body>
    </html>
  );
}
