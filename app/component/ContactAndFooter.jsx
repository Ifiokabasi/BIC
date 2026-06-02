"use client";

import { useState, useRef, useEffect } from "react";

// ── useInView hook ──────────────────────────────────────────────────────────
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

// ── Contact offices data ────────────────────────────────────────────────────
const offices = [
  {
    city: "Abuja",
    country: "Nigeria",
    address: "Plot 1234, Adeola Odeku Street,\nVictoria Island, Lagos",
    phone: "+234 1 463 0000",
    email: "lagos@biccorp.com",
    accent: "#C8F135",
    badge: "HQ",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "1 Canada Square, Canary Wharf,\nLondon E14 5AB",
    phone: "+44 20 7946 0000",
    email: "london@biccorp.com",
    accent: "#5B8EFF",
    badge: null,
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Gate Building, Level 15,\nDIFC, Dubai",
    phone: "+971 4 000 0000",
    email: "dubai@biccorp.com",
    accent: "#2ECDA7",
    badge: null,
  },
];

// ── Inquiry types ───────────────────────────────────────────────────────────
const inquiryTypes = [
  "Wealth Management",
  "Private Equity",
  "Real Estate Capital",
  "Fixed Income",
  "Venture & Growth",
  "General Inquiry",
];

// ── Footer links ────────────────────────────────────────────────────────────
const footerLinks = {
  Company: ["About Us", "Leadership", "Careers", "Press", "ESG"],
  Services: ["Wealth Management", "Private Equity", "Real Estate", "Fixed Income", "Venture & Growth"],
  Resources: ["The BIC Journal", "Market Reports", "Investor Portal", "Events", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Use", "Regulatory Info", "Cookie Policy"],
};

const socials = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Bloomberg",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M7 8h4a2 2 0 010 4H7v4M7 8v8"/>
      </svg>
    ),
  },
];

// ── Input component ─────────────────────────────────────────────────────────
function Field({ label, type = "text", name, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="field-wrap">
      <label className="field-label">{label}{required && <span className="field-req">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="field-input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderColor: focused ? "#C8F135" : "rgba(255,255,255,0.1)",
          boxShadow: focused ? "0 0 0 3px rgba(200,241,53,0.08)" : "none",
        }}
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="field-wrap">
      <label className="field-label">{label}{required && <span className="field-req">*</span>}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="field-input field-textarea"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderColor: focused ? "#C8F135" : "rgba(255,255,255,0.1)",
          boxShadow: focused ? "0 0 0 3px rgba(200,241,53,0.08)" : "none",
        }}
      />
    </div>
  );
}

// ── Contact Section ─────────────────────────────────────────────────────────
function ContactSection() {
  const [headerRef, headerInView] = useInView(0.05);
  const [formRef, formInView] = useInView(0.05);
  const [officesRef, officesInView] = useInView(0.05);

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", inquiry: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Replace with your actual form submission logic (e.g. Resend, EmailJS, API route)
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="contact-section">
      {/* Background */}
      <div className="contact-bg">
        <div className="contact-blob" style={{ background: "#C8F135", top: "-10%", right: "-5%", width: "40vw", height: "40vw" }} />
        <div className="contact-blob" style={{ background: "#5B8EFF", bottom: "10%", left: "-8%", width: "28vw", height: "28vw" }} />
        <div className="contact-grid" />
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="contact-header reveal"
        style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}
      >
        <div className="section-eyebrow">Get in touch</div>
        <h2 className="contact-title">
          Let's build your<br />
          <em>financial legacy.</em>
        </h2>
        <p className="contact-subtitle">
          Whether you're exploring investment opportunities or looking to partner with BIC,
          our team is ready to have the conversation.
        </p>
      </div>

      {/* Two-column: form + sidebar */}
      <div className="contact-body">

        {/* Form */}
        <div
          ref={formRef}
          className="contact-form-wrap reveal"
          style={{ opacity: formInView ? 1 : 0, transform: formInView ? "none" : "translateX(-24px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}
        >
          {submitted ? (
            <div className="form-success">
              <div className="success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="success-title">Message received.</h3>
              <p className="success-body">
                A member of our team will be in touch within one business day.
                We look forward to speaking with you.
              </p>
              <button className="success-reset" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", inquiry: "", message: "" }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid-2">
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Mensah" required />
                <Field label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
              </div>
              <div className="form-grid-2">
                <Field label="Company / Organisation" name="company" value={form.company} onChange={handleChange} placeholder="Acme Holdings" />
                <Field label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" />
              </div>

              {/* Inquiry type pills */}
              <div className="field-wrap">
                <label className="field-label">Area of Interest<span className="field-req">*</span></label>
                <div className="inquiry-pills">
                  {inquiryTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="inquiry-pill"
                      onClick={() => setForm((f) => ({ ...f, inquiry: t }))}
                      style={{
                        background: form.inquiry === t ? "#C8F135" : "transparent",
                        color: form.inquiry === t ? "#000" : "rgba(255,255,255,0.55)",
                        borderColor: form.inquiry === t ? "#C8F135" : "rgba(255,255,255,0.12)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <TextArea label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your investment goals or how we can help…" required />

              <button
                type="submit"
                className="form-submit"
                disabled={submitting || !form.inquiry}
                style={{ opacity: submitting || !form.inquiry ? 0.6 : 1 }}
              >
                {submitting ? (
                  <>
                    <span className="spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <p className="form-note">
                By submitting this form you agree to our{" "}
                <a href="#" className="form-note-link">Privacy Policy</a>.
                We never share your data.
              </p>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div
          ref={officesRef}
          className="contact-sidebar reveal"
          style={{ opacity: officesInView ? 1 : 0, transform: officesInView ? "none" : "translateX(24px)", transition: "opacity .7s ease .2s, transform .7s ease .2s" }}
        >
          {/* Direct contact */}
          <div className="sidebar-block">
            <div className="sidebar-label">Direct Contact</div>
            <a href="mailto:invest@biccorp.com" className="sidebar-email">
              invest@biccorp.com
            </a>
            <div className="sidebar-divider" />
            <div className="sidebar-stat-row">
              <div className="sidebar-stat">
                <span className="sidebar-stat-val" style={{ color: "#C8F135" }}>{"<"} 24h</span>
                <span className="sidebar-stat-lbl">Response time</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-val" style={{ color: "#5B8EFF" }}>3</span>
                <span className="sidebar-stat-lbl">Global offices</span>
              </div>
              <div className="sidebar-stat">
                <span className="sidebar-stat-val" style={{ color: "#2ECDA7" }}>15+</span>
                <span className="sidebar-stat-lbl">Yrs in markets</span>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div className="sidebar-label" style={{ marginBottom: "1rem" }}>Our Offices</div>
          <div className="offices-list">
            {offices.map((o) => (
              <div key={o.city} className="office-card">
                <div className="office-top">
                  <div className="office-city-wrap">
                    <span className="office-dot" style={{ background: o.accent }} />
                    <span className="office-city">{o.city}</span>
                    <span className="office-country">{o.country}</span>
                  </div>
                  {o.badge && (
                    <span className="office-badge" style={{ color: o.accent, background: o.accent + "18", border: `1px solid ${o.accent}33` }}>
                      {o.badge}
                    </span>
                  )}
                </div>
                <p className="office-address">{o.address}</p>
                <div className="office-contacts">
                  <a href={`tel:${o.phone}`} className="office-link">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                    {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="office-link">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {o.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const [ref, inView] = useInView(0.05);
  const year = new Date().getFullYear();

  return (
    <footer className="footer" ref={ref} style={{ opacity: inView ? 1 : 0, transition: "opacity .8s ease" }}>
      {/* Top CTA strip */}
      <div className="footer-cta-strip">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3 className="footer-cta-title">Ready to invest with confidence?</h3>
            <p className="footer-cta-sub">Speak with a BIC advisor today. No obligation, no pressure.</p>
          </div>
          <div className="footer-cta-actions">
            <a href="#contact" className="footer-cta-btn-primary">
              Schedule a Call
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/blog" className="footer-cta-btn-secondary">Read the Journal</a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="footer-main">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo">
            BIC<span className="footer-logo-dot" />
          </div>
          <p className="footer-tagline">
            Building institutional-grade investment platforms for the next generation of African and global wealth.
          </p>
          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.name} href={s.href} className="social-btn" aria-label={s.name} title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
          <div className="footer-reg">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Regulated by the SEC Nigeria & FCA UK
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="footer-col">
            <div className="footer-col-heading">{group}</div>
            <ul className="footer-links">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="footer-link">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {year} BIC Investment Corporation. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            Investment involves risk. Past performance is not indicative of future results.
            This website does not constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Combined export ─────────────────────────────────────────────────────────
export default function ContactAndFooter() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══════════════════════════════════════════
           CONTACT SECTION
        ══════════════════════════════════════════ */

        .contact-section {
          position: relative;
          background: #060608;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .contact-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .contact-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.07;
        }

        .contact-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .contact-header {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 3rem 3.5rem;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-bottom: 1.1rem;
        }

        .section-eyebrow::before {
          content: '';
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,.25);
          display: inline-block;
        }

        .contact-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.0;
          letter-spacing: -.04em;
          color: #fff;
        }

        .contact-title em {
          font-style: normal;
          color: #C8F135;
        }

        .contact-subtitle {
          font-size: .98rem;
          line-height: 1.7;
          color: rgba(255,255,255,.42);
          max-width: 500px;
          margin-top: 1.1rem;
          font-weight: 300;
        }

        /* ── Two-column layout ── */
        .contact-body {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem 6rem;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* ── Form ── */
        .contact-form-wrap {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(10px);
        }

        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
        }

        .field-wrap { display: flex; flex-direction: column; gap: .45rem; }

        .field-label {
          font-size: .7rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.4);
        }

        .field-req { color: #C8F135; margin-left: 2px; }

        .field-input {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px;
          padding: .75rem 1rem;
          font-size: .9rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          width: 100%;
        }

        .field-input::placeholder { color: rgba(255,255,255,.2); }
        .field-textarea { resize: vertical; min-height: 120px; }

        .inquiry-pills {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
          margin-top: .2rem;
        }

        .inquiry-pill {
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .04em;
          padding: .42rem 1rem;
          border-radius: 100px;
          border: 1px solid;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all .2s ease;
        }

        .inquiry-pill:hover {
          border-color: rgba(255,255,255,.35) !important;
          color: #fff !important;
        }

        .form-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          width: 100%;
          padding: .9rem 2rem;
          border-radius: 100px;
          background: #C8F135;
          color: #000;
          font-size: .9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: filter .2s, transform .15s, gap .2s;
          margin-top: .25rem;
        }

        .form-submit:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
          gap: .75rem;
        }

        .form-submit:disabled { cursor: not-allowed; }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0,0,0,.25);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .form-note {
          font-size: .72rem;
          color: rgba(255,255,255,.25);
          text-align: center;
          line-height: 1.5;
        }

        .form-note-link {
          color: rgba(200,241,53,.6);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* ── Success state ── */
        .form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 2rem;
          gap: 1rem;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(200,241,53,.1);
          border: 1px solid rgba(200,241,53,.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          letter-spacing: -.03em;
          color: #fff;
        }

        .success-body {
          font-size: .9rem;
          color: rgba(255,255,255,.45);
          line-height: 1.65;
          max-width: 340px;
          font-weight: 300;
        }

        .success-reset {
          font-size: .8rem;
          color: rgba(200,241,53,.7);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: underline;
          text-underline-offset: 3px;
          margin-top: .5rem;
        }

        /* ── Sidebar ── */
        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-block {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px;
          padding: 1.75rem;
        }

        .sidebar-label {
          font-size: .62rem;
          font-weight: 500;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
          margin-bottom: .75rem;
        }

        .sidebar-email {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -.02em;
          color: #C8F135;
          text-decoration: none;
          transition: opacity .2s;
        }
        .sidebar-email:hover { opacity: .75; }

        .sidebar-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,.07);
          margin: 1.25rem 0;
        }

        .sidebar-stat-row {
          display: flex;
          gap: 0;
        }

        .sidebar-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: .2rem;
          padding: 0 1rem 0 0;
        }

        .sidebar-stat:first-child { padding-left: 0; }

        .sidebar-stat-val {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -.04em;
          line-height: 1;
        }

        .sidebar-stat-lbl {
          font-size: .65rem;
          color: rgba(255,255,255,.3);
          letter-spacing: .04em;
        }

        /* ── Offices ── */
        .offices-list {
          display: flex;
          flex-direction: column;
          gap: .85rem;
        }

        .office-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px;
          padding: 1.25rem 1.35rem;
          transition: border-color .25s;
        }

        .office-card:hover { border-color: rgba(255,255,255,.15); }

        .office-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: .65rem;
        }

        .office-city-wrap {
          display: flex;
          align-items: center;
          gap: .5rem;
        }

        .office-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .office-city {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: .95rem;
          letter-spacing: -.02em;
          color: #fff;
        }

        .office-country {
          font-size: .7rem;
          color: rgba(255,255,255,.3);
        }

        .office-badge {
          font-size: .58rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: .2rem .55rem;
          border-radius: 100px;
        }

        .office-address {
          font-size: .78rem;
          color: rgba(255,255,255,.38);
          line-height: 1.55;
          white-space: pre-line;
          margin-bottom: .85rem;
        }

        .office-contacts {
          display: flex;
          flex-direction: column;
          gap: .35rem;
        }

        .office-link {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          font-size: .76rem;
          color: rgba(255,255,255,.42);
          text-decoration: none;
          transition: color .2s;
        }
        .office-link:hover { color: #fff; }

        /* ══════════════════════════════════════════
           FOOTER
        ══════════════════════════════════════════ */

        .footer {
          background: #030303;
          border-top: 1px solid rgba(255,255,255,.06);
          font-family: 'DM Sans', sans-serif;
          color: #fff;
        }

        /* ── CTA strip ── */
        .footer-cta-strip {
          border-bottom: 1px solid rgba(255,255,255,.06);
          padding: 3rem;
        }

        .footer-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -.03em;
          color: #fff;
          margin-bottom: .3rem;
        }

        .footer-cta-sub {
          font-size: .85rem;
          color: rgba(255,255,255,.4);
          font-weight: 300;
        }

        .footer-cta-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .footer-cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .75rem 1.75rem;
          border-radius: 100px;
          background: #C8F135;
          color: #000;
          font-size: .85rem;
          font-weight: 600;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: filter .2s, transform .15s;
        }
        .footer-cta-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }

        .footer-cta-btn-secondary {
          font-size: .85rem;
          color: rgba(255,255,255,.5);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: color .2s;
          border: 1px solid rgba(255,255,255,.15);
          padding: .75rem 1.5rem;
          border-radius: 100px;
        }
        .footer-cta-btn-secondary:hover { color: #fff; border-color: rgba(255,255,255,.35); }

        /* ── Main grid ── */
        .footer-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3.5rem 3rem 2.5rem;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
          gap: 2.5rem;
        }

        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.75rem;
          letter-spacing: -.04em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 3px;
          margin-bottom: 1rem;
        }

        .footer-logo-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C8F135;
          margin-bottom: 6px;
        }

        .footer-tagline {
          font-size: .82rem;
          line-height: 1.65;
          color: rgba(255,255,255,.35);
          font-weight: 300;
          max-width: 280px;
          margin-bottom: 1.5rem;
        }

        .footer-socials {
          display: flex;
          gap: .6rem;
          margin-bottom: 1.25rem;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,.45);
          text-decoration: none;
          transition: border-color .2s, color .2s, background .2s;
        }
        .social-btn:hover {
          border-color: rgba(255,255,255,.25);
          color: #fff;
          background: rgba(255,255,255,.08);
        }

        .footer-reg {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          font-size: .65rem;
          color: rgba(255,255,255,.25);
          letter-spacing: .04em;
        }

        .footer-col-heading {
          font-size: .65rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          margin-bottom: 1.1rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: .6rem;
        }

        .footer-link {
          font-size: .82rem;
          color: rgba(255,255,255,.4);
          text-decoration: none;
          transition: color .2s;
        }
        .footer-link:hover { color: #fff; }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,.05);
          padding: 1.5rem 3rem;
        }

        .footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: .75rem;
          color: rgba(255,255,255,.25);
        }

        .footer-disclaimer {
          font-size: .7rem;
          color: rgba(255,255,255,.18);
          max-width: 500px;
          text-align: right;
          line-height: 1.5;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */

        @media (max-width: 1024px) {
          .footer-main { grid-template-columns: 1fr 1fr 1fr; }
          .footer-brand { grid-column: span 3; }
        }

        @media (max-width: 768px) {
          .contact-body { grid-template-columns: 1fr; gap: 2rem; }
          .contact-header, .contact-body { padding-left: 1.25rem; padding-right: 1.25rem; }
          .contact-header { padding-top: 5rem; }
          .form-grid-2 { grid-template-columns: 1fr; }
          .footer-cta-strip, .footer-main, .footer-bottom { padding-left: 1.5rem; padding-right: 1.5rem; }
          .footer-cta-inner { flex-direction: column; align-items: flex-start; }
          .footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-brand { grid-column: span 2; }
          .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
          .footer-disclaimer { text-align: left; }
        }

        @media (max-width: 480px) {
          .footer-main { grid-template-columns: 1fr 1fr; }
          .footer-cta-actions { flex-direction: column; width: 100%; }
          .footer-cta-btn-primary, .footer-cta-btn-secondary { text-align: center; justify-content: center; }
        }
      `}</style>

      <ContactSection />
      <Footer />
    </>
  );
}
