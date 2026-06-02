"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: "01",
    title: "Wealth Management",
    category: "Advisory",
    description:
      "Bespoke portfolio strategies crafted for high-net-worth individuals and family offices. We align every investment decision with your long-term financial legacy.",
    stats: { value: "$4.2B", label: "AUM" },
    accent: "#C8F135",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Private Equity",
    category: "Direct Investment",
    description:
      "We identify, acquire, and scale high-growth private companies across emerging markets and established sectors — delivering above-market returns.",
    stats: { value: "23%", label: "Avg. IRR" },
    accent: "#5B8EFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Real Estate Capital",
    category: "Asset Class",
    description:
      "Strategic acquisition and development of commercial and mixed-use assets in prime locations. Risk-adjusted returns backed by tangible value.",
    stats: { value: "140+", label: "Properties" },
    accent: "#FF6B6B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Fixed Income",
    category: "Capital Markets",
    description:
      "Structured bond portfolios, sovereign debt instruments, and credit strategies designed to preserve capital while generating consistent yield.",
    stats: { value: "8.1%", label: "Avg. Yield" },
    accent: "#2ECDA7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Venture & Growth",
    category: "Early Stage",
    description:
      "We back visionary founders disrupting industries across fintech, healthtech, and climate. From Series A to IPO, we go the distance.",
    stats: { value: "67", label: "Portfolio Co." },
    accent: "#F7A23B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
  },
  {
    id: "06",
    title: "Risk & Compliance",
    category: "Governance",
    description:
      "Comprehensive risk frameworks, regulatory advisory, and compliance infrastructure for institutions navigating complex financial landscapes.",
    stats: { value: "100%", label: "Compliance" },
    accent: "#C084FC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const products = [
  {
    id: "P1",
    name: "BIC Alpha Fund",
    type: "Hedge Fund",
    description:
      "A multi-strategy absolute return fund combining long/short equity, macro, and quantitative models. Designed for sophisticated investors seeking uncorrelated returns.",
    minInvestment: "$500K",
    horizon: "3–5 Years",
    risk: "Moderate–High",
    badge: "Flagship",
    badgeColor: "#C8F135",
    features: ["Quarterly liquidity", "Full transparency reporting", "Dedicated relationship manager"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M6 20V10M10 20V4M14 20v-8M18 20v-6"/>
      </svg>
    ),
  },
  {
    id: "P2",
    name: "BIC Horizon REIT",
    type: "Real Estate Trust",
    description:
      "A diversified real estate investment trust with exposure to premium commercial, retail, and logistics assets across West Africa and the Gulf.",
    minInvestment: "$100K",
    horizon: "5–7 Years",
    risk: "Moderate",
    badge: "Income",
    badgeColor: "#2ECDA7",
    features: ["Semi-annual distributions", "NAV-based valuation", "ESG-screened portfolio"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    id: "P3",
    name: "BIC Venture Select",
    type: "VC Fund of Funds",
    description:
      "Access to a curated basket of top-tier venture capital funds and direct co-investments. Institutional-grade exposure to the innovation economy.",
    minInvestment: "$250K",
    horizon: "7–10 Years",
    risk: "High",
    badge: "Growth",
    badgeColor: "#5B8EFF",
    features: ["Annual co-investment rights", "LP advisory committee access", "Bi-annual portfolio reviews"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
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
  }, [threshold]);
  return [ref, inView];
}

function ParallaxBg({ imageUrl, children, overlayColor = "rgba(0,0,0,0.72)" }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top * 0.35;
      const inner = el.querySelector(".parallax-img");
      if (inner) inner.style.transform = `translateY(${scrolled}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={bgRef} style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="parallax-img"
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayColor,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="service-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
        borderColor: hovered ? service.accent + "50" : "rgba(255,255,255,0.08)",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(10,10,10,0.75)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-top">
        <div
          className="card-icon"
          style={{ color: service.accent, background: service.accent + "18", border: `1px solid ${service.accent}30` }}
        >
          {service.icon}
        </div>
        <div className="card-category">{service.category}</div>
      </div>

      <div className="card-stat" style={{ color: service.accent }}>
        {service.stats.value}
        <span>{service.stats.label}</span>
      </div>

      <h3 className="card-title">{service.title}</h3>
      <p className="card-desc">{service.description}</p>

      <button
        className="read-more"
        style={{ color: service.accent, borderColor: service.accent + "35" }}
      >
        Read more
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function ProductCard({ product, index }) {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="product-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.98)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        borderColor: hovered ? product.badgeColor + "55" : "rgba(255,255,255,0.09)",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(10,10,10,0.8)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-icon-wrap" style={{ background: product.badgeColor + "18", border: `1px solid ${product.badgeColor}30` }}>
        <span style={{ color: product.badgeColor }}>{product.icon}</span>
      </div>

      <div className="product-header">
        <div>
          <div className="product-type">{product.type}</div>
          <h3 className="product-name">{product.name}</h3>
        </div>
        <span
          className="product-badge"
          style={{
            background: product.badgeColor + "18",
            color: product.badgeColor,
            border: `1px solid ${product.badgeColor}40`,
          }}
        >
          {product.badge}
        </span>
      </div>

      <p className="product-desc">{product.description}</p>

      <div className="product-meta">
        <div className="meta-item">
          <div className="meta-label">Min. Investment</div>
          <div className="meta-value" style={{ color: product.badgeColor }}>{product.minInvestment}</div>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <div className="meta-label">Time Horizon</div>
          <div className="meta-value">{product.horizon}</div>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <div className="meta-label">Risk Profile</div>
          <div className="meta-value">{product.risk}</div>
        </div>
      </div>

      <ul className="product-features">
        {product.features.map((f, i) => (
          <li key={i}>
            <span className="feat-dot" style={{ background: product.badgeColor }} />
            {f}
          </li>
        ))}
      </ul>

      <button
        className="product-cta"
        style={{ background: product.badgeColor, color: "#000" }}
      >
        Read more
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default function ServicesProducts() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .sp-wrapper {
          font-family: 'DM Sans', sans-serif;
          color: #fff;
        }

        /* ── SECTION HEADER ── */
        .section-header {
          padding: 5rem 3rem 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.1rem;
        }

        .section-eyebrow::before {
          content: '';
          width: 22px;
          height: 1px;
          background: rgba(255,255,255,0.3);
          display: inline-block;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 680px;
        }

        .section-title em {
          font-style: normal;
          color: rgba(255,255,255,0.22);
        }

        .section-subtitle {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          max-width: 460px;
          margin-top: 1.1rem;
          font-weight: 300;
        }

        .header-rule {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 2.5rem 0 0;
        }

        /* ── SERVICES ── */
        .services-body {
          padding: 0 3rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
          margin-top: 2.5rem;
        }

        .service-card {
          position: relative;
          padding: 1.75rem 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
          cursor: default;
        }

        .service-card:hover {
          transform: translateY(-3px);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-category {
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.2rem 0.55rem;
          border-radius: 100px;
        }

        .card-stat {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .card-stat span {
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-family: 'DM Sans', sans-serif;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.6rem;
        }

        .card-desc {
          font-size: 0.82rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
          font-weight: 300;
          flex: 1;
          margin-bottom: 1.4rem;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          border: 1px solid;
          padding: 0.45rem 0.95rem;
          border-radius: 100px;
          cursor: pointer;
          transition: gap 0.2s, background 0.2s;
          width: fit-content;
        }

        .read-more:hover {
          gap: 0.65rem;
          background: rgba(255,255,255,0.04);
        }

        /* ── PRODUCTS ── */
        .products-body {
          padding: 0 3rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 2.5rem;
        }

        .product-card {
          padding: 1.75rem;
          border-radius: 20px;
          border: 1px solid;
          backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
          cursor: default;
        }

        .product-card:hover {
          transform: translateY(-3px);
        }

        .product-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .product-type {
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 0.3rem;
        }

        .product-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.15;
        }

        .product-badge {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.28rem 0.65rem;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .product-desc {
          font-size: 0.82rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
          font-weight: 300;
        }

        .product-meta {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
        }

        .meta-item {
          flex: 1;
          padding: 0.75rem 0.85rem;
          text-align: center;
        }

        .meta-label {
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 0.25rem;
        }

        .meta-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: -0.02em;
          color: #fff;
        }

        .meta-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .product-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .product-features li {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.48);
          font-weight: 300;
        }

        .feat-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.85;
        }

        .product-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          width: 100%;
          padding: 0.7rem 1.5rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s, gap 0.2s;
        }

        .product-cta:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          gap: 0.6rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .services-grid, .products-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .section-header { padding: 3.5rem 1.25rem 1.75rem; }
          .services-body, .products-body { padding: 0 1.25rem 3.5rem; }
          .services-grid, .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sp-wrapper">

        {/* ── SERVICES WITH PARALLAX ── */}
        <ParallaxBg
          imageUrl="/images/bauchiCityGate.jpg"
          overlayColor="rgba(4,6,12,0.8)"
        >
          <div className="section-header">
            <div className="section-eyebrow">What we do</div>
            <h2 className="section-title">
              Institutional-grade<br />
              <em>services for every</em><br />
              investor profile.
            </h2>
            <p className="section-subtitle">
              From private wealth to institutional mandates, our advisory and investment
              services are built on decades of market experience.
            </p>
            <hr className="header-rule" />
          </div>
          <div className="services-body">
            <div className="services-grid">
              {services.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </ParallaxBg>

        {/* ── PRODUCTS WITH PARALLAX ── */}
        <ParallaxBg
          imageUrl="/images/trading_graph.jpg"
          overlayColor="rgba(2,8,4,0.82)"
        >
          <div className="section-header">
            <div className="section-eyebrow">Investment vehicles</div>
            <h2 className="section-title">
              Products engineered<br />
              <em>for performance</em><br />
              and resilience.
            </h2>
            <p className="section-subtitle">
              Each product is rigorously structured, independently audited, and designed to
              deliver risk-adjusted returns across market cycles.
            </p>
            <hr className="header-rule" />
          </div>
          <div className="products-body">
            <div className="products-grid">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </ParallaxBg>

      </div>
    </>
  );
}
