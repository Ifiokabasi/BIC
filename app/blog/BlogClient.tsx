"use client";

// app/blog/BlogClient.tsx
// Place this file at: app/blog/BlogClient.tsx

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post, Category } from "@/lib/sanity";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

// ── Featured Hero Card ──────────────────────────────────────────────────────
function FeaturedCard({ post, urlFor }: { post: Post; urlFor: (s: unknown) => { url: () => string } }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className="featured-card"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity .7s ease, transform .7s ease" }}
    >
      <Link href={`/blog/${post.slug.current}`} className="featured-link">
        <div className="featured-image-wrap">
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.coverImage?.alt ?? post.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          )}
          <div className="featured-overlay" />
          <div className="featured-content">
            <div className="featured-meta">
              {post.category && (
                <span className="cat-pill" style={{ background: post.category.accent + "22", color: post.category.accent, border: `1px solid ${post.category.accent}44` }}>
                  {post.category.title}
                </span>
              )}
              <span className="feat-badge">Featured</span>
            </div>
            <h2 className="featured-title">{post.title}</h2>
            <p className="featured-excerpt">{post.excerpt}</p>
            <div className="post-byline">
              {post.author?.image && (
                <div className="author-avatar-sm">
                  <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                </div>
              )}
              <span>{post.author?.name}</span>
              <span className="byline-dot">·</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span className="byline-dot">·</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Regular Post Card ───────────────────────────────────────────────────────
function PostCard({ post, index, urlFor }: { post: Post; index: number; urlFor: (s: unknown) => { url: () => string } }) {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="post-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .55s ease ${(index % 4) * 0.08}s, transform .55s ease ${(index % 4) * 0.08}s`,
        borderColor: hovered ? (post.category?.accent ?? "#fff") + "44" : "rgba(255,255,255,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/blog/${post.slug.current}`} className="post-card-link">
        <div className="post-image-wrap">
          {post.coverImage ? (
            <Image src={urlFor(post.coverImage).url()} alt={post.coverImage?.alt ?? post.title} fill style={{ objectFit: "cover", transition: "transform .5s ease" }} className={hovered ? "img-zoomed" : ""} />
          ) : (
            <div className="post-image-placeholder" style={{ background: (post.category?.accent ?? "#333") + "18" }} />
          )}
          {post.category && (
            <span className="cat-pill card-cat" style={{ background: post.category.accent + "22", color: post.category.accent, border: `1px solid ${post.category.accent}44` }}>
              {post.category.title}
            </span>
          )}
        </div>
        <div className="post-body">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-byline">
            {post.author?.image && (
              <div className="author-avatar-sm">
                <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
              </div>
            )}
            <span>{post.author?.name}</span>
            <span className="byline-dot">·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="byline-dot">·</span>
            <span>{post.readTime} min</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Main Client Component ───────────────────────────────────────────────────
export default function BlogClient({
  posts,
  categories,
  urlFor,
}: {
  posts: Post[];
  categories: Category[];
  urlFor: (s: unknown) => { url: () => string };
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const featured = posts.find((p) => p.featured);
  const filtered = posts
    .filter((p) => !p.featured || activeCategory !== "all")
    .filter((p) => activeCategory === "all" || p.category?.slug?.current === activeCategory);

  // Magazine layout: first non-featured post gets a wider "lead" slot
  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .blog-page {
          background: #080808;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        /* ── PAGE HEADER ── */
        .blog-header {
          padding: 7rem 3rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.38);
          margin-bottom: 1rem;
        }

        .blog-eyebrow::before {
          content: '';
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,.28);
          display: inline-block;
        }

        .blog-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          letter-spacing: -.04em;
          line-height: 1;
          color: #fff;
        }

        .blog-title em {
          font-style: normal;
          color: #C8F135;
        }

        .blog-subtitle {
          font-size: .95rem;
          color: rgba(255,255,255,.42);
          margin-top: 1rem;
          font-weight: 300;
          max-width: 500px;
          line-height: 1.65;
        }

        /* ── CATEGORY FILTER BAR ── */
        .filter-bar {
          padding: 1.75rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: .6rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: .45rem 1.1rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.12);
          background: transparent;
          color: rgba(255,255,255,.45);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, color .2s, background .2s;
        }

        .filter-btn:hover {
          border-color: rgba(255,255,255,.3);
          color: #fff;
        }

        .filter-btn.active {
          background: #C8F135;
          border-color: #C8F135;
          color: #000;
        }

        .filter-count {
          font-size: .6rem;
          opacity: .6;
          margin-left: .25rem;
        }

        /* ── FEATURED CARD ── */
        .featured-card {
          max-width: 1200px;
          margin: 0 auto 2.5rem;
          padding: 0 3rem;
        }

        .featured-link { display: block; text-decoration: none; }

        .featured-image-wrap {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,.3) 50%, transparent 100%);
          z-index: 1;
        }

        .featured-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem;
          z-index: 2;
        }

        .featured-meta {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin-bottom: 1rem;
        }

        .feat-badge {
          font-size: .6rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          padding: .25rem .65rem;
          border-radius: 100px;
          background: rgba(255,255,255,.12);
          color: rgba(255,255,255,.7);
          border: 1px solid rgba(255,255,255,.18);
        }

        .featured-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          letter-spacing: -.03em;
          color: #fff;
          line-height: 1.1;
          margin-bottom: .75rem;
          max-width: 680px;
        }

        .featured-excerpt {
          font-size: .9rem;
          line-height: 1.6;
          color: rgba(255,255,255,.6);
          max-width: 560px;
          margin-bottom: 1.25rem;
          font-weight: 300;
        }

        /* ── CATEGORY PILL ── */
        .cat-pill {
          display: inline-flex;
          align-items: center;
          font-size: .62rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: .25rem .7rem;
          border-radius: 100px;
        }

        /* ── BYLINE ── */
        .post-byline {
          display: flex;
          align-items: center;
          gap: .5rem;
          font-size: .78rem;
          color: rgba(255,255,255,.45);
        }

        .author-avatar-sm {
          position: relative;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,.2);
        }

        .byline-dot { color: rgba(255,255,255,.25); }

        /* ── MAGAZINE GRID ── */
        .magazine-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem 5rem;
        }

        .magazine-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .magazine-label {
          font-size: .65rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        .post-count {
          font-size: .7rem;
          color: rgba(255,255,255,.25);
        }

        /* Lead post (wide) */
        .magazine-lead {
          margin-bottom: 1.25rem;
        }

        .magazine-lead .post-card {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0;
          min-height: 320px;
        }

        .magazine-lead .post-image-wrap {
          aspect-ratio: unset;
          height: 100%;
          border-radius: 16px 0 0 16px;
        }

        .magazine-lead .post-body {
          padding: 2rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .magazine-lead .post-title {
          font-size: 1.5rem;
        }

        /* Grid posts */
        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        /* ── POST CARD ── */
        .post-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.08);
          background: #0d0d0d;
          overflow: hidden;
          transition: border-color .3s, transform .2s;
        }

        .post-card:hover { transform: translateY(-3px); }

        .post-card-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          height: 100%;
        }

        .post-image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .card-cat {
          position: absolute;
          top: .85rem;
          left: .85rem;
          z-index: 2;
        }

        .post-image-placeholder { width: 100%; height: 100%; }

        .img-zoomed { transform: scale(1.05) !important; }

        .post-body {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .post-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -.02em;
          color: #fff;
          line-height: 1.25;
          margin-bottom: .6rem;
          flex: 1;
        }

        .post-excerpt {
          font-size: .8rem;
          line-height: 1.6;
          color: rgba(255,255,255,.42);
          font-weight: 300;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          text-align: center;
          padding: 5rem 0;
          color: rgba(255,255,255,.3);
        }

        .empty-state p { font-size: .9rem; margin-top: .5rem; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .magazine-grid { grid-template-columns: repeat(2, 1fr); }
          .magazine-lead .post-card { grid-template-columns: 1fr; }
          .magazine-lead .post-image-wrap { aspect-ratio: 16/9; height: auto; border-radius: 16px 16px 0 0; }
        }

        @media (max-width: 640px) {
          .blog-header, .filter-bar, .featured-card, .magazine-section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .magazine-grid { grid-template-columns: 1fr; }
          .featured-image-wrap { height: 340px; }
          .blog-header { padding-top: 5rem; }
        }
      `}</style>

      <div className="blog-page">
        {/* Header */}
        <div className="blog-header"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "opacity .6s ease, transform .6s ease" }}
        >
          <div className="blog-eyebrow">Insights & Research</div>
          <h1 className="blog-title">The BIC <em>Journal</em></h1>
          <p className="blog-subtitle">
            Market intelligence, investment insights, and thought leadership from the BIC research desk.
          </p>
        </div>

        {/* Category filter */}
        <div className="filter-bar"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity .6s ease .1s" }}
        >
          <button className={`filter-btn ${activeCategory === "all" ? "active" : ""}`} onClick={() => setActiveCategory("all")}>
            All <span className="filter-count">{posts.length}</span>
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category?.slug?.current === cat.slug.current).length;
            return (
              <button
                key={cat._id}
                className={`filter-btn ${activeCategory === cat.slug.current ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.slug.current)}
                style={activeCategory === cat.slug.current ? { background: cat.accent, borderColor: cat.accent, color: "#000" } : {}}
              >
                {cat.title} <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Featured hero — only show when "All" is selected */}
        {featured && activeCategory === "all" && <FeaturedCard post={featured} urlFor={urlFor} />}

        {/* Magazine grid */}
        <div className="magazine-section">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: "2rem" }}>📭</div>
              <p>No posts in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="magazine-header">
                <span className="magazine-label">
                  {activeCategory === "all" ? "Latest Posts" : categories.find((c) => c.slug.current === activeCategory)?.title}
                </span>
                <span className="post-count">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Lead wide card */}
              {lead && (
                <div className="magazine-lead">
                  <PostCard post={lead} index={0} urlFor={urlFor} />
                </div>
              )}

              {/* 3-column grid */}
              {rest.length > 0 && (
                <div className="magazine-grid">
                  {rest.map((post, i) => (
                    <PostCard key={post._id} post={post} index={i + 1} urlFor={urlFor} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
