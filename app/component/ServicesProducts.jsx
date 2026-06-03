"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: "01",
    title: "Investment Promotion",
    category: "Economic Development",
    description:
      "We promote viable investment opportunities across key sectors of Bauchi State by creating awareness of business potentials and connecting investors with high-growth opportunities.",
    stats: { value: "FDI", label: "Attraction" },
    accent: "#C8F135",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
    features: [
      "Investment awareness campaigns",
      "Digital marketing initiatives",
      "Radio & television programs",
      "Workshops and investor seminars"
    ],
  },

  {
    id: "02",
    title: "Property Development",
    category: "Infrastructure & Real Estate",
    description:
      "We co-invest in critical infrastructure projects including housing developments, commercial facilities, and rural power initiatives that stimulate economic activity and community development.",
    stats: { value: "PPP", label: "Projects" },
    accent: "#5B8EFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
      </svg>
    ),
    features: [
      "Housing developments",
      "Commercial properties",
      "Land for investment projects",
      "Public-Private Partnerships"
    ],
  },

  {
    id: "03",
    title: "Portfolio Management",
    category: "Capital Markets",
    description:
      "Through our subsidiary, Bauchi Investment Corporation Securities Limited, we manage government equity portfolios and facilitate investor participation in Nigeria's growing capital market.",
    stats: { value: "CSCS", label: "Access" },
    accent: "#FF6B6B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 18l4-6 4 3 8-9" />
        <path d="M4 20h16" />
      </svg>
    ),
    features: [
      "Stockbroking services",
      "CSCS account opening",
      "E-dividend activation",
      "Share certificate dematerialization"
    ],
  },

  {
    id: "04",
    title: "Consultancy Services",
    category: "Investment Advisory",
    description:
      "We provide technical and commercial feasibility studies that help investors assess opportunities, structure investments, and make informed business decisions.",
    stats: { value: "IRR", label: "Analysis" },
    accent: "#2ECDA7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
    features: [
      "Feasibility studies",
      "ROI assessments",
      "Net Present Value (NPV) analysis",
      "Risk and profitability evaluation"
    ],
  },
];

const products = [
  {
    id: "O1",
    name: "Agriculture & Agro-Processing",
    type: "Priority Sector",
    description:
      "Leverage Bauchi State's vast arable land, livestock resources, and growing agricultural value chains through investments in farming, food processing, storage, and export-oriented production.",
    minInvestment: "Open Access",
    horizon: "Long-Term Growth",
    risk: "Moderate",
    badge: "Priority",
    badgeColor: "#C8F135",
    features: [
      "Large agricultural land bank",
      "Livestock and dairy opportunities",
      "Agro-processing potential"
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V12" />
        <path d="M7 7c0 3 2 5 5 5" />
        <path d="M17 7c0 3-2 5-5 5" />
        <path d="M12 12c0-5 2-8 6-10" />
      </svg>
    ),
  },

  // {
  //   id: "O2",
  //   name: "Solid Minerals Development",
  //   type: "Natural Resources",
  //   description:
  //     "Unlock the value of Bauchi State's abundant mineral deposits including limestone, gypsum, kaolin, and iron ore through responsible extraction and industrial processing projects.",
  //   minInvestment: "Strategic Projects",
  //   horizon: "5–10 Years",
  //   risk: "Moderate",
  //   badge: "High Potential",
  //   badgeColor: "#FF6B6B",
  //   features: [
  //     "Untapped mineral reserves",
  //     "Industrial processing opportunities",
  //     "Export market potential"
  //   ],
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  //       <path d="M12 2l8 6v8l-8 6-8-6V8z" />
  //       <path d="M12 2v20" />
  //     </svg>
  //   ),
  // },

  {
    id: "O3",
    name: "Tourism & Hospitality",
    type: "Destination Investment",
    description:
      "Invest in one of Nigeria's most promising tourism destinations, featuring Yankari Game Reserve, natural attractions, hospitality developments, and eco-tourism infrastructure.",
    minInvestment: "PPP Ready",
    horizon: "Long-Term Value",
    risk: "Moderate",
    badge: "Growth",
    badgeColor: "#5B8EFF",
    features: [
      "Yankari Game Reserve",
      "Hospitality development",
      "Eco-tourism opportunities"
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 20h18" />
        <path d="M7 20v-8l5-5 5 5v8" />
        <path d="M12 7V3" />
      </svg>
    ),
  },

  {
    id: "O4",
    name: "Infrastructure & Real Estate",
    type: "Development Projects",
    description:
      "Partner with Bauchi State on strategic infrastructure, housing, commercial real estate, and urban development projects that support economic expansion and modernization.",
    minInvestment: "PPP Opportunities",
    horizon: "10+ Years",
    risk: "Moderate",
    badge: "Strategic",
    badgeColor: "#2ECDA7",
    features: [
      "Urban development projects",
      "Commercial real estate",
      "Infrastructure partnerships"
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" />
        <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
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
              Driving Growth <em>Through</em><br />
              Strategic Investment<br />
              and Development.
            </h2>

            <p className="section-subtitle">
              From investment promotion and property development to portfolio management
              and investor facilitation, we provide the expertise and support needed to
              unlock opportunities across Bauchi State.
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
              Invest Where Opportunity <em>Meets</em> Potential<br />
              Across Bauchi State.
            </h2>

            <p className="section-subtitle">
              Explore high-impact sectors and development initiatives designed to attract
              investment, create jobs, and accelerate sustainable economic growth throughout
              Bauchi State.
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
