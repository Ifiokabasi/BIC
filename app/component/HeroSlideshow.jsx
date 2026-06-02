"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";



const slides = [
  {
    id: 1,
    eyebrow: "Introducing the future",
    headline: "Build products\npeople love.",
    subheading:
      "A powerful platform that gives your team everything they need to design, ship, and scale — without the chaos.",
    cta: { primary: "Start for free", secondary: "See how it works" },
    accent: "#C8F135",
    bg: "#0A0A0A",
    textColor: "#FFFFFF",
    tag: "Platform",
    image: "/images/img_3.jpg"
  },
  {
    id: 2,
    eyebrow: "Blazing fast performance",
    headline: "Speed is a\nfeature too.",
    subheading:
      "Sub-100ms response times. Global edge delivery. Your users will never wait again — and they'll notice.",
    cta: { primary: "Explore features", secondary: "View benchmarks" },
    accent: "#5B8EFF",
    bg: "#04101F",
    textColor: "#FFFFFF",
    tag: "Performance",
    image: "/images/img_1.jpg"
  },
  {
    id: 3,
    eyebrow: "Designed for teams",
    headline: "Collaborate\nwithout limits.",
    subheading:
      "Real-time multiplayer editing, version history, and role-based access — built in from day one.",
    cta: { primary: "Invite your team", secondary: "See plans" },
    accent: "#FF6B6B",
    bg: "#120808",
    textColor: "#FFFFFF",
    tag: "Collaboration",
    image: "/images/img_2.jpg"
  },
  {
    id: 4,
    eyebrow: "Enterprise ready",
    headline: "Secure your\nfuture.",
    subheading:
      "SOC 2 Type II, SSO, audit logs, and custom data residency. Security that scales with your compliance needs.",
    cta: { primary: "Talk to sales", secondary: "Read docs" },
    accent: "#2ECDA7",
    bg: "#030F0B",
    textColor: "#FFFFFF",
    tag: "Security",
    image: "/images/img_4.jpg"
  },
];

const SLIDE_DURATION = 5000;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const goTo = useCallback(
    (index, fromAuto = false) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setPrev(current);
      setCurrent(index);
      setProgress(0);
      startTimeRef.current = Date.now();
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 700);
    },
    [current, transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, true);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    startTimeRef.current = Date.now();

    const tick = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      next();
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, [current, paused, next]);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slide-bg.active { opacity: 1; }
        .slide-bg.exiting { opacity: 0; }

        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .accent-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.18;
          transition: background 0.7s ease, transform 0.7s ease;
          pointer-events: none;
        }

        .nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem;
        }

        .logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #fff;
          letter-spacing: -0.03em;
        }

        .logo span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: 3px;
          vertical-align: middle;
          transition: background 0.5s ease;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #fff; }

        .nav-action {
          font-size: 0.875rem;
          padding: 0.6rem 1.4rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-action:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.06);
        }

        .content {
          position: relative;
          z-index: 10;
          display: flex;
          // flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 6rem 3rem 3rem;
          gap: 3rem;
          text-align: center;
        }


       .slide-image {
          position: relative;
          width: 100%;
          max-width: 1000px;
          aspect-ratio: 4/3;
          border-radius: 16px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }

        .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes fadeSlideIn {
          to { opacity: 1; transform: translateY(0); }
        }





        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.5s ease;
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #ffffff;
          white-space: pre-line;
          margin-bottom: 1.75rem;
        }

        .headline em {
          font-style: normal;
          transition: color 0.5s ease;
        }

        .subheading {
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          margin-bottom: 3rem;
          font-weight: 300;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 100px;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.15s ease, filter 0.15s ease;
          letter-spacing: -0.01em;
        }
        .btn-primary:hover { transform: translateY(-1px); filter: brightness(1.08); }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.875rem 1.5rem;
          border-radius: 100px;
          font-size: 0.9375rem;
          font-weight: 400;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.18);
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
        }

        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        .btn-primary:hover .arrow-icon { transform: translate(2px, -2px); }
        .btn-secondary:hover .arrow-icon { transform: translateX(3px); }

        .slide-counter {
          position: absolute;
          right: 3rem;
          bottom: 3rem;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2rem;
        }

        .counter-num {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.35);
        }

        .counter-num strong {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.03em;
        }

        .dots {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dot-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .dot-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          transition: color 0.3s;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.3s, transform 0.3s, color 0.3s;
        }

        .dot-btn:hover .dot-label,
        .dot-btn.active .dot-label {
          opacity: 1;
          transform: translateX(0);
          color: rgba(255,255,255,0.6);
        }

        .dot-track {
          position: relative;
          width: 3px;
          height: 36px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
          overflow: hidden;
        }

        .dot-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 2px;
          transition: height 0.1s linear, background 0.5s ease;
        }

        .dot-btn.active .dot-track {
          background: rgba(255,255,255,0.2);
        }

        .slide-tag {
          position: absolute;
          left: 3rem;
          bottom: 3.5rem;
          z-index: 20;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .pause-btn {
          position: absolute;
          left: 3rem;
          bottom: 2.75rem;
          z-index: 20;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, background 0.2s;
          color: rgba(255,255,255,0.5);
        }
        .pause-btn:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .content-inner > * {
          animation: fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .content-inner .eyebrow    { animation-delay: 0.05s; }
        .content-inner .headline   { animation-delay: 0.15s; }
        .content-inner .subheading { animation-delay: 0.25s; }
        .content-inner .cta-group  { animation-delay: 0.35s; }

        .content-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .nav { padding: 1.5rem; }
          .nav-links { display: none; }
          .content { padding: 0 1.5rem; }
          .slide-counter { right: 1.5rem; bottom: 2rem; }
          .pause-btn { left: 1.5rem; bottom: 1.75rem; }
          .content{flex-direction: column}
        }
      `}</style>

      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Hero slideshow"
      >
        {/* Slide backgrounds */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`slide-bg ${i === current ? "active" : i === prev ? "exiting" : ""}`}
            style={{
              background: s.bg,
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          >
            <div className="grid-lines" />
            <div className="noise" />
            <div
              className="accent-blob"
              style={{
                background: s.accent,
                width: "60vw",
                height: "60vw",
                top: "-15%",
                right: "-10%",
              }}
            />
            <div
              className="accent-blob"
              style={{
                background: s.accent,
                width: "30vw",
                height: "30vw",
                bottom: "5%",
                left: "20%",
                opacity: 0.07,
              }}
            />
          </div>
        ))}

        {/* Navigation */}
        <nav className="nav">
          <div className="logo">
            BIC
            <span style={{ background: slide.accent }} />
          </div>
        
          <ul className="nav-links">

            {/* {["About Us", "Services", "Blog", "Contact Us"].map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))} */}
            
            {["About Us", "Services", "Blog", "Contact Us"].map((l) => (
              <li key={l}>
                <Link href={l === "About Us" ? "/about" : l === "Blog" ? "/blog" : l === "Contact Us" ? "/contact" : "/"}>
                  {l}
                </Link>
              </li>
            ))}



          </ul>
          <button className="nav-action">Sign in →</button>
        </nav>

        {/* Main content */}
        <div className="content">
          <div className="content-inner" key={current}>
            <div className="eyebrow">
              <span
                className="eyebrow-dot"
                style={{ background: slide.accent }}
              />
              {slide.eyebrow}
            </div>

            <h1 className="headline">
              {slide.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <em style={{ color: slide.accent }}>{line}</em>
                  ) : (
                    line
                  )}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>

            <p className="subheading">{slide.subheading}</p>

            <div className="cta-group">
              <button
                className="btn-primary"
                style={{
                  background: slide.accent,
                  color: "#000",
                }}
              >
                {slide.cta.primary}
                <svg
                  className="arrow-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn-secondary">
                {slide.cta.secondary}
                <svg
                  className="arrow-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="slide-image" key={"img-" + current}>
            <img src={slide.image} alt={slide.eyebrow} />
          </div>




        </div>

        {/* Slide tag */}
        <div className="slide-tag">{slide.tag}</div>

        {/* Pause button */}
        <button
          className="pause-btn"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
        >
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 2l8 4-8 4V2z" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="2" width="3" height="8" rx="1" />
              <rect x="7" y="2" width="3" height="8" rx="1" />
            </svg>
          )}
        </button>

        {/* Slide counter + dots */}
        <div className="slide-counter">
          <div className="counter-num">
            <strong>0{current + 1}</strong> / 0{slides.length}
          </div>
          <div className="dots">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`dot-btn ${i === current ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className="dot-label">{s.tag}</span>
                <div className="dot-track">
                  <div
                    className="dot-fill"
                    style={{
                      height:
                        i === current
                          ? `${progress}%`
                          : i < current
                          ? "100%"
                          : "0%",
                      background: i === current ? slide.accent : "rgba(255,255,255,0.4)",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
