// app/blog/[slug]/page.tsx

import { client, urlFor, POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY, ALL_SLUGS_QUERY } from "@/lib/sanity";
import type { Post } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Pre-generate all post pages at build time
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(ALL_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ── Portable Text components (rich body renderer) ──────────────────────────
const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string } }) => (
      <figure className="pt-image">
        <div className="pt-image-wrap">
          <Image
            src={urlFor(value).url()}
            alt={value.alt ?? ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        {value.alt && <figcaption className="pt-caption">{value.alt}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="pt-h2">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="pt-h3">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="pt-p">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="pt-blockquote">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="pt-strong">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="pt-em">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} className="pt-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="pt-ul">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="pt-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li className="pt-li">{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li className="pt-li">{children}</li>,
  },
};

// ── Related Post Card ──────────────────────────────────────────────────────
function RelatedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="related-card">
      <div className="related-image-wrap">
        {post.coverImage && (
          <Image src={urlFor(post.coverImage).url()} alt={post.coverImage?.alt ?? post.title} fill style={{ objectFit: "cover" }} />
        )}
      </div>
      <div className="related-body">
        {post.category && (
          <span className="related-cat" style={{ color: post.category.accent }}>{post.category.title}</span>
        )}
        <h4 className="related-title">{post.title}</h4>
        <span className="related-time">{post.readTime} min read</span>
      </div>
    </Link>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug });
  if (!post) notFound();

  const related: Post[] = await client.fetch(RELATED_POSTS_QUERY, {
    slug: params.slug,
    category: post.category?.slug?.current ?? "",
  });

  const dateFormatted = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        .post-page {
          background: #080808;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        /* ── BACK LINK ── */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          font-size: .78rem;
          color: rgba(255,255,255,.4);
          text-decoration: none;
          padding: 2rem 3rem 0;
          transition: color .2s;
        }
        .back-link:hover { color: #fff; }

        /* ── HERO ── */
        .post-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 3rem 0;
        }

        .post-hero-meta {
          display: flex;
          align-items: center;
          gap: .65rem;
          margin-bottom: 1.5rem;
        }

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

        .post-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.75rem);
          letter-spacing: -.04em;
          line-height: 1.05;
          color: #fff;
          max-width: 860px;
          margin-bottom: 1.5rem;
        }

        .post-hero-excerpt {
          font-size: 1.1rem;
          line-height: 1.65;
          color: rgba(255,255,255,.5);
          font-weight: 300;
          max-width: 680px;
          margin-bottom: 2rem;
        }

        .post-hero-byline {
          display: flex;
          align-items: center;
          gap: .85rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .author-avatar {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,.15);
        }

        .author-info { display: flex; flex-direction: column; gap: .1rem; }

        .author-name {
          font-size: .85rem;
          font-weight: 500;
          color: #fff;
        }

        .author-meta {
          font-size: .75rem;
          color: rgba(255,255,255,.38);
        }

        .hero-read-time {
          margin-left: auto;
          font-size: .72rem;
          color: rgba(255,255,255,.3);
          letter-spacing: .06em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.1);
          padding: .3rem .75rem;
          border-radius: 100px;
        }

        /* ── COVER IMAGE ── */
        .post-cover {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 3rem;
        }

        .post-cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 21/9;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
        }

        /* ── BODY ── */
        .post-body-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 1rem 3rem 4rem;
        }

        /* Portable Text styles */
        .pt-p {
          font-family: 'Lora', serif;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(255,255,255,.72);
          margin-bottom: 1.5rem;
        }

        .pt-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          letter-spacing: -.03em;
          color: #fff;
          margin: 2.5rem 0 1rem;
          line-height: 1.15;
        }

        .pt-h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: -.02em;
          color: #fff;
          margin: 2rem 0 .75rem;
        }

        .pt-blockquote {
          border-left: 3px solid #C8F135;
          padding: .75rem 0 .75rem 1.5rem;
          margin: 2rem 0;
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(255,255,255,.55);
          line-height: 1.7;
        }

        .pt-strong { color: #fff; font-weight: 600; }
        .pt-em { font-style: italic; color: rgba(255,255,255,.65); }

        .pt-link {
          color: #C8F135;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(200,241,53,.4);
          transition: text-decoration-color .2s;
        }
        .pt-link:hover { text-decoration-color: #C8F135; }

        .pt-ul, .pt-ol {
          margin: 1rem 0 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }

        .pt-li {
          font-family: 'Lora', serif;
          font-size: 1rem;
          color: rgba(255,255,255,.65);
          line-height: 1.7;
        }

        .pt-image {
          margin: 2.5rem -2rem;
        }

        .pt-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
        }

        .pt-caption {
          font-size: .75rem;
          color: rgba(255,255,255,.3);
          text-align: center;
          margin-top: .6rem;
          font-style: italic;
        }

        /* ── RELATED POSTS ── */
        .related-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem 5rem;
          border-top: 1px solid rgba(255,255,255,.07);
        }

        .related-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -.02em;
          color: #fff;
          padding: 2.5rem 0 2rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .related-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          background: #0d0d0d;
          transition: transform .2s, border-color .2s;
        }
        .related-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.18); }

        .related-image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .related-body { padding: 1rem 1.1rem 1.25rem; }

        .related-cat {
          font-size: .6rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: .35rem;
        }

        .related-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: .95rem;
          letter-spacing: -.02em;
          color: #fff;
          line-height: 1.25;
          margin-bottom: .5rem;
        }

        .related-time {
          font-size: .72rem;
          color: rgba(255,255,255,.3);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .back-link, .post-hero, .post-cover, .post-body-wrap, .related-section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .post-cover-wrap { aspect-ratio: 4/3; }
          .related-grid { grid-template-columns: 1fr; }
          .pt-image { margin: 2rem 0; }
        }
      `}</style>

      <div className="post-page">
        {/* Back */}
        <Link href="/blog" className="back-link">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Journal
        </Link>

        {/* Hero */}
        <div className="post-hero">
          <div className="post-hero-meta">
            {post.category && (
              <span className="cat-pill" style={{ background: post.category.accent + "22", color: post.category.accent, border: `1px solid ${post.category.accent}44` }}>
                {post.category.title}
              </span>
            )}
          </div>

          <h1 className="post-hero-title">{post.title}</h1>
          {post.excerpt && <p className="post-hero-excerpt">{post.excerpt}</p>}

          <div className="post-hero-byline">
            {post.author?.image && (
              <div className="author-avatar">
                <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div className="author-info">
              <span className="author-name">{post.author?.name}</span>
              <span className="author-meta">{post.author?.role} · {dateFormatted}</span>
            </div>
            <span className="hero-read-time">{post.readTime} min read</span>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="post-cover">
            <div className="post-cover-wrap">
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.coverImage?.alt ?? post.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div className="post-body-wrap">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} components={ptComponents} />
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className="related-section">
            <h3 className="related-heading">Continue Reading</h3>
            <div className="related-grid">
              {related.map((p) => <RelatedCard key={p._id} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
