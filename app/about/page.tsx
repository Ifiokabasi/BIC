"use client";

// app/about/page.tsx (or pages/about.tsx for Pages Router)
// Place this file at: app/about/page.tsx

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";

// ── Types ───────────────────────────────────────────────────────────────

type Stat = {
  value: string | number;
  label: string;
  accent: string;
};

type Value = {
  icon: ReactNode;
  title: string;
  body: string;
  accent: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: string;
};

type Milestone = {
  year: string | number;
  title: string;
  body: string;
};

// ── useInView ───────────────────────────────────────────────────────────────
function useInView(threshold = 0.08): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
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

// ── Data ────────────────────────────────────────────────────────────────────
const stats = [
  {
    value: "49+",
    label: "Years of Impact",
    description:
      "Nearly five decades of driving investment and economic development across Bauchi State.",
  },
  {
    value: "₦500M",
    label: "Growth Capital",
    description:
      "A strengthened capital base supporting strategic investments and development projects.",
  },
  {
    value: "1",
    label: "Investment Gateway",
    description:
      "Providing a one-stop platform for investors seeking opportunities in Bauchi State.",
  },
  {
    value: "∞",
    label: "Opportunities",
    description:
      "Unlocking potential across agriculture, infrastructure, mining, tourism, and commerce.",
  },
];

const values: Value[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Integrity & Public Trust",
    body: "We operate with transparency, accountability, and professionalism in managing public investment interests on behalf of Bauchi State Government.",
    accent: "#C8F135",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z" />
      </svg>
    ),
    title: "Economic Development Focus",
    body: "We are committed to stimulating economic growth through trade, commerce, industrialization, and strategic investment across Bauchi State.",
    accent: "#5B8EFF",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Sustainable Growth",
    body: "We prioritize long-term, sustainable expansion of investment portfolios to strengthen the state's financial capacity and development impact.",
    accent: "#FF6B6B",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    title: "People-Centered Impact",
    body: "Every initiative is designed to improve livelihoods, create opportunities, and support entrepreneurship within Bauchi State.",
    accent: "#2ECDA7",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 16h14" />
      </svg>
    ),
    title: "Strategic Investment Promotion",
    body: "We actively promote and facilitate investment opportunities by providing reliable, up-to-date information and one-stop services for investors.",
    accent: "#F7A23B",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" />
        <path d="M7 12h10" />
        <path d="M12 7v10" />
      </svg>
    ),
    title: "Professional Service Delivery",
    body: "We provide consultancy, property development, and portfolio management services with a commitment to excellence and efficiency.",
    accent: "#C084FC",
  },
];

const team: TeamMember[] = [
  {
    name: "Idris Daniel Danladi ",
    role: "Assistant Manager Corporate Services ",
    bio: "Idris Danladi is the Assistant Manager, Corporate Services at Bauchi Investment Corporation Limited (BIC), with experience in corporate communications, administration, stakeholder engagement, and digital media management. He supports BIC’s operations and public image through strategic communication and organizational coordination. He is passionate about investment promotion, business development, and corporate innovation.",
    accent: "#C8F135",
  },
  {
    name: "Chidinma Eze",
    role: "Chief Investment Officer",
    bio: "Former portfolio manager at Blackrock EM. Oversees all asset allocation strategy and risk frameworks.",
    accent: "#5B8EFF",
  },
  {
    name: "Emeka Nwosu",
    role: "MD, Private Equity",
    bio: "Built and exited three portfolio companies in fintech and logistics. Certified FRM with deep VC expertise.",
    accent: "#FF6B6B",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head of Real Assets",
    bio: "Structured REIT vehicles across West Africa and the Gulf. $800M in real estate capital deployed.",
    accent: "#2ECDA7",
  },
  {
    name: "Oluwaseun Adeyemi",
    role: "Chief Risk Officer",
    bio: "Regulatory compliance architect with FCA, SEC Nigeria, and DFSA experience across three continents.",
    accent: "#F7A23B",
  },
  {
    name: "Ngozi Obi",
    role: "Head of Investor Relations",
    bio: "Former investment banker turned IR lead. Manages relationships with 200+ institutional LPs globally.",
    accent: "#C084FC",
  },
];

const milestones: Milestone[] = [
  {
    year: "1977",
    title: "Establishment of BIC",
    body: "Bauchi Investment Corporation Limited (BIC) was established in June 1977 as a development finance institution created to stimulate economic growth and development through trade, commerce, and industrialization in Bauchi State."
  },
  {
    year: "1986",
    title: "First Capital Increase",
    body: "The Corporation’s initial paid-up share capital of N3M was increased to N10M in February 1986 to strengthen its operational capacity and expand its activities."
  },
  {
    year: "2006",
    title: "Major Expansion & Rebranding",
    body: "BIC’s share capital was raised to N500M in 2006 to widen its scope and scale of operations. In the same year, the company was renamed from Bauchi State Investment and Property Development Company Ltd (BSIPDC) to Bauchi Investment Corporation (BIC)."
  }
];

// ── Section components ──────────────────────────────────────────────────────

interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .6s ease ${index * 0.1}s, transform .6s ease ${index * 0.1}s`,
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div className="stat-value" style={{ color: stat.accent }}>{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

interface ValueCardProps {
  v: Value;
  index: number;
}

function ValueCard({ v, index }: ValueCardProps) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="value-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .55s ease ${(index % 3) * 0.08}s, transform .55s ease ${(index % 3) * 0.08}s`,
        borderColor: hovered ? v.accent + "44" : "rgba(255,255,255,0.07)",
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(10,10,10,0.6)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="value-icon" style={{ color: v.accent, background: v.accent + "18", border: `1px solid ${v.accent}2E` }}>
        {v.icon}
      </div>
      <h3 className="value-title">{v.title}</h3>
      <p className="value-body">{v.body}</p>
    </div>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  // Initials avatar
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      ref={ref}
      className="team-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${(index % 3) * 0.1}s, transform .6s ease ${(index % 3) * 0.1}s`,
        borderColor: hovered ? member.accent + "44" : "rgba(255,255,255,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="team-avatar" style={{ background: member.accent + "18", border: `1px solid ${member.accent}30`, color: member.accent }}>
        {initials}
      </div>
      <div className="team-info">
        <h3 className="team-name">{member.name}</h3>
        <span className="team-role" style={{ color: member.accent }}>{member.role}</span>
        <p className="team-bio">{member.bio}</p>
      </div>
    </div>
  );
}

interface MilestoneItemProps {
  m: Milestone;
  index: number;
  total: number;
}

function MilestoneItem({ m, index }: MilestoneItemProps) {
  const [ref, inView] = useInView();
  const isLeft = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`milestone-item ${isLeft ? "left" : "right"}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s`,
      }}
    >
      <div className="milestone-content">
        <div className="milestone-year">{m.year}</div>
        <h4 className="milestone-title">{m.title}</h4>
        <p className="milestone-body">{m.body}</p>
      </div>
      <div className="milestone-dot" />
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const [missionRef, missionInView] = useInView(0.05);
  const [valuesRef, valuesInView] = useInView(0.05);
  const [teamRef, teamInView] = useInView(0.05);
  const [timelineRef, timelineInView] = useInView(0.05);
  const [ctaRef, ctaInView] = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-page {
          background: #070709;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .about-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 3rem 5rem;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: .1;
          pointer-events: none;
        }

        .hero-rule {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,241,53,.4), transparent);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-bottom: 1.5rem;
        }

        .hero-eyebrow::before {
          content: '';
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,.25);
          display: inline-block;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 7vw, 7rem);
          line-height: .95;
          letter-spacing: -.05em;
          color: #fff;
          max-width: 900px;
          margin-bottom: 2rem;
        }

        .hero-title em {
          font-style: normal;
          color: #C8F135;
          display: block;
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255,255,255,.48);
          max-width: 560px;
          font-weight: 300;
          margin-bottom: 2.5rem;
        }

        .hero-ctas {
          display: flex;
          gap: .85rem;
          align-items: center;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .85rem 2rem;
          border-radius: 100px;
          background: #C8F135;
          color: #000;
          font-size: .9rem;
          font-weight: 600;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: filter .2s, transform .15s;
          border: none;
        }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .85rem 1.75rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.18);
          color: rgba(255,255,255,.65);
          font-size: .9rem;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, color .2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,.4); color: #fff; }

        /* ── STATS ── */
        .stats-band {
          border-top: 1px solid rgba(255,255,255,.06);
          border-bottom: 1px solid rgba(255,255,255,.06);
          padding: 3rem;
          background: rgba(255,255,255,.015);
        }

        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 16px;
          overflow: hidden;
        }

        .stat-card {
          padding: 2rem 1.75rem;
          background: #0a0a0c;
          display: flex;
          flex-direction: column;
          gap: .4rem;
          transition: background .25s;
        }

        .stat-card:hover { background: #111; }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          letter-spacing: -.05em;
          line-height: 1;
        }

        .stat-label {
          font-size: .78rem;
          color: rgba(255,255,255,.38);
          font-weight: 300;
          line-height: 1.4;
        }

        /* ── SECTION SHARED ── */
        .section-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5.5rem 3rem 2.5rem;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.32);
          margin-bottom: 1rem;
        }

        .section-eyebrow::before {
          content: '';
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,.22);
          display: inline-block;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.0;
          letter-spacing: -.04em;
          color: #fff;
          max-width: 680px;
        }

        .section-title em {
          font-style: normal;
          color: rgba(255,255,255,.2);
        }

        .section-sub {
          font-size: .95rem;
          line-height: 1.7;
          color: rgba(255,255,255,.4);
          max-width: 500px;
          margin-top: 1rem;
          font-weight: 300;
        }

        .section-rule {
          border: none;
          border-top: 1px solid rgba(255,255,255,.07);
          margin: 2rem 0 0;
        }

        /* ── MISSION ── */
        .mission-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem 5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .mission-text h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          letter-spacing: -.04em;
          line-height: 1.0;
          color: #fff;
          margin-bottom: 1.5rem;
        }

        .mission-text h2 em {
          font-style: normal;
          color: #C8F135;
        }

        .mission-text p {
          font-size: .98rem;
          line-height: 1.8;
          color: rgba(255,255,255,.48);
          font-weight: 300;
          margin-bottom: 1.25rem;
        }

        .mission-visual {
          position: relative;
          aspect-ratio: 1;
          max-width: 480px;
        }

        .mission-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          animation: spin-slow linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .mission-ring-1 {
          inset: 0;
          border-color: rgba(200,241,53,.12);
          animation-duration: 40s;
        }

        .mission-ring-2 {
          inset: 12%;
          border-color: rgba(91,142,255,.1);
          animation-duration: 28s;
          animation-direction: reverse;
        }

        .mission-ring-3 {
          inset: 25%;
          border-color: rgba(46,205,167,.1);
          animation-duration: 18s;
        }

        .mission-centre {
          position: absolute;
          inset: 35%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,241,53,.15) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: .2rem;
        }

        .mission-centre-val {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: -.05em;
          color: #C8F135;
          line-height: 1;
        }

        .mission-centre-lbl {
          font-size: .6rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
        }

        .mission-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* ── VALUES ── */
        .values-section {
          padding: 0 3rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
          margin-top: 2.5rem;
        }

        .value-card {
          padding: 1.75rem 1.5rem;
          border-radius: 16px;
          border: 1px solid;
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: .9rem;
          transition: border-color .3s, background .3s, transform .2s;
          cursor: default;
        }

        .value-card:hover { transform: translateY(-3px); }

        .value-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -.02em;
          color: #fff;
        }

        .value-body {
          font-size: .82rem;
          line-height: 1.65;
          color: rgba(255,255,255,.42);
          font-weight: 300;
        }

        /* ── TEAM ── */
        .team-section {
          padding: 0 3rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 2.5rem;
        }

        .team-card {
          padding: 1.75rem;
          border-radius: 18px;
          border: 1px solid;
          background: rgba(10,10,12,.7);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color .3s, transform .2s;
          cursor: default;
        }

        .team-card:hover { transform: translateY(-3px); }

        .team-avatar {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -.02em;
          flex-shrink: 0;
        }

        .team-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: -.02em;
          color: #fff;
          margin-bottom: .2rem;
        }

        .team-role {
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .06em;
          display: block;
          margin-bottom: .65rem;
        }

        .team-bio {
          font-size: .8rem;
          line-height: 1.6;
          color: rgba(255,255,255,.4);
          font-weight: 300;
        }

        /* ── TIMELINE ── */
        .timeline-section {
          padding: 0 3rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          margin-top: 3rem;
          padding: 0 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255,255,255,.08);
          transform: translateX(-50%);
        }

        .milestone-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 2.5rem;
        }

        .milestone-item.left .milestone-content { grid-column: 1; padding-right: 3rem; text-align: right; }
        .milestone-item.right .milestone-content { grid-column: 2; padding-left: 3rem; }

        .milestone-item.left .milestone-dot { position: absolute; left: 50%; top: 1rem; transform: translateX(-50%); }
        .milestone-item.right .milestone-dot { position: absolute; left: 50%; top: 1rem; transform: translateX(-50%); }

        .milestone-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #C8F135;
          border: 2px solid #070709;
          box-shadow: 0 0 0 3px rgba(200,241,53,.2);
          z-index: 1;
        }

        .milestone-year {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: .75rem;
          letter-spacing: .12em;
          color: #C8F135;
          margin-bottom: .4rem;
        }

        .milestone-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: -.02em;
          color: #fff;
          margin-bottom: .4rem;
        }

        .milestone-body {
          font-size: .8rem;
          line-height: 1.6;
          color: rgba(255,255,255,.4);
          font-weight: 300;
        }

        /* ── CTA ── */
        .about-cta {
          margin: 0 3rem 5rem;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #0d0f0a;
          border: 1px solid rgba(200,241,53,.15);
        }

        .cta-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 50%, rgba(200,241,53,.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .cta-text {}

        .cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.75rem, 3.5vw, 3rem);
          letter-spacing: -.04em;
          color: #fff;
          line-height: 1.05;
          margin-bottom: .75rem;
        }

        .cta-title em {
          font-style: normal;
          color: #C8F135;
        }

        .cta-sub {
          font-size: .95rem;
          color: rgba(255,255,255,.42);
          font-weight: 300;
          max-width: 440px;
          line-height: 1.65;
        }

        .cta-actions {
          display: flex;
          gap: .85rem;
          flex-shrink: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .values-grid, .team-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .about-hero { padding: 0 1.5rem 4rem; min-height: 80vh; }
          .mission-section { grid-template-columns: 1fr; gap: 2.5rem; padding: 0 1.5rem 4rem; }
          .mission-visual { display: none; }
          .section-header, .values-section, .team-section, .timeline-section { padding-left: 1.5rem; padding-right: 1.5rem; }
          .about-cta { margin: 0 1.5rem 4rem; }
          .cta-inner { padding: 2.5rem 1.75rem; flex-direction: column; }
          .timeline { padding: 0; }
          .timeline::before { left: 12px; transform: none; }
          .milestone-item { grid-template-columns: 1fr; padding-left: 2.5rem; }
          .milestone-item.left .milestone-content,
          .milestone-item.right .milestone-content { grid-column: 1; padding: 0; text-align: left; }
          .milestone-item.left .milestone-dot,
          .milestone-item.right .milestone-dot { left: 8px; top: .75rem; transform: none; }
          .stats-band { padding: 1.5rem; }
        }

        @media (max-width: 580px) {
          .values-grid, .team-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: 1fr 1fr; }
          .hero-ctas { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="about-page">

        {/* ── HERO ── */}
        <div className="about-hero">
          <div className="hero-bg">
            <div className="hero-grid" />
            <div className="hero-rule" />
            <div className="hero-blob" style={{ background: "#C8F135", width: "50vw", height: "50vw", top: "-20%", right: "-10%" }} />
            <div className="hero-blob" style={{ background: "#5B8EFF", width: "30vw", height: "30vw", bottom: "0", left: "-5%" }} />
          </div>
          <div className="hero-content"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "opacity .8s ease, transform .8s ease" }}
          >
            <div className="hero-eyebrow">Our story</div>
            <h1 className="hero-title">
              Capital with
              <em>purpose.</em>
            </h1>
            <p className="hero-desc">
              Bauchi Investment Corporation Limited (BIC) was established in June 1977 as a development finance institution to provide avenue for stimulating economic growth and development via trade, commerce and industrialization in the state. 

              BIC commenced operation with an initial paid up share capital of N3M which was raised to N10M in February 1986 and N500M in 2006 to enable it increase its size and widen the scope of its activities. It is wholly owned by the Bauchi State Government.
            </p>

            <p className="hero-desc">
              The company was formerly known as Bauchi State Investment and Property Development Company Ltd (BSIPDC). The name was changed to Bauchi Investment Corporation (BIC) in 2006.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn-primary">
                Work with us
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/blog" className="btn-ghost">
                Read the Journal
              </Link>
            </div>
          </div>
        </div>

        {/* ── STATS BAND ── */}
        <div className="stats-band">
          <div className="stats-inner">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>

        {/* ── MISSION ── */}
        <div
          ref={missionRef}
          style={{ opacity: missionInView ? 1 : 0, transform: missionInView ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
        >
          <div className="section-header">
            <div className="section-eyebrow">Why we exist</div>
            <hr className="section-rule" />
          </div>
          <div className="mission-section">
            <div className="mission-text">
               <h2>
                Closing the gap between<br />
                <em>ambition and development.</em>
              </h2>

              <p>
                For decades, access to structured investment and development finance has been a key driver
                of economic growth. BIC was established to bridge that gap in Bauchi State — supporting
                trade, commerce, industrialization, and sustainable economic development.
              </p>

              <p>
                We are not a commercial bank. We are not a private broker. We are a development finance
                institution and strategic partner — facilitating investment, managing state assets, and
                providing services that strengthen the economic foundation of Bauchi State with transparency
                and professionalism.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-ring mission-ring-1" />
              <div className="mission-ring mission-ring-2" />
              <div className="mission-ring mission-ring-3" />
              {/* Dots on rings */}
              <div className="mission-dot" style={{ background: "#C8F135", top: "0%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div className="mission-dot" style={{ background: "#5B8EFF", top: "12%", right: "12%", width: "6px", height: "6px" }} />
              <div className="mission-dot" style={{ background: "#2ECDA7", bottom: "12%", left: "12%", width: "6px", height: "6px" }} />
              <div className="mission-centre">
                <span className="mission-centre-val">49+</span>
                <span className="mission-centre-lbl">Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <div
          ref={valuesRef}
          style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
        >
          <div className="section-header">
            <div className="section-eyebrow">What guides us</div>
            <h2 className="section-title">
              The principles<br /><em>behind every decision.</em>
            </h2>
            <hr className="section-rule" />
          </div>
          <div className="values-section">
            <div className="values-grid">
              {values.map((v, i) => <ValueCard key={v.title} v={v} index={i} />)}
            </div>
          </div>
        </div>

        {/* ── TEAM ── */}
        <div
          ref={teamRef}
          style={{ opacity: teamInView ? 1 : 0, transform: teamInView ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
        >
          <div className="section-header">
            <div className="section-eyebrow">The team</div>
            <h2 className="section-title">
              Decades of experience,<br /><em>one shared conviction.</em>
            </h2>
            <p className="section-sub">
              Our leadership team combines senior experience from the world's top financial institutions
              with deep local market knowledge.
            </p>
            <hr className="section-rule" />
          </div>
          <div className="team-section">
            <div className="team-grid">
              {team.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
            </div>
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div
          ref={timelineRef}
          style={{ opacity: timelineInView ? 1 : 0, transform: timelineInView ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
        >
          <div className="section-header">
            <div className="section-eyebrow">Our history</div>
            <h2 className="section-title">
              49 years of<br /><em>building something real.</em>
            </h2>
            <hr className="section-rule" />
          </div>
          <div className="timeline-section">
            <div className="timeline">
              {milestones.map((m, i) => (
                <MilestoneItem key={m.year} m={m} index={i} total={milestones.length} />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="about-cta"
          style={{ opacity: ctaInView ? 1 : 0, transform: ctaInView ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
        >
          <div className="cta-bg-glow" />
          <div className="cta-inner">
            <div className="cta-text">
              <h2 className="cta-title">
                Ready to grow<br /><em>your wealth?</em>
              </h2>
              <p className="cta-sub">
                Speak with a BIC investment advisor. We'll understand your goals
                and design a strategy around them.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn-primary">
                Schedule a Call
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/" className="btn-ghost">View Services</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
