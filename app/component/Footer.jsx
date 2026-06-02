"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    product: {
      title: "Product",
      links: ["Features", "Pricing", "Integrations", "Roadmap", "Changelog"],
    },
    company: {
      title: "Company",
      links: ["About Us", "Blog", "Careers", "Press", "Contact"],
    },
    resources: {
      title: "Resources",
      links: ["Documentation", "API Reference", "Guides", "Support", "Status"],
    },
    legal: {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Security", "GDPR", "Cookies"],
    },
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "GitHub",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "Discord",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 9c-.5 1-1 2-2 3 2 0 4 1 5 3-1 2-3 3-5 4-1-1-2-2-3-4-1 2-2 3-3 4-2-1-4-2-5-4 1-2 3-3 5-3-1-1-1.5-2-2-3 1 0 2 1 3 1 1 0 2-1 3-1s2 1 3 1c1 0 2-1 3-1z" />
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap");

        .footer {
          position: relative;
          background: #050505;
          font-family: "DM Sans", sans-serif;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 80px 80px;
          z-index: 1;
        }

        .accent-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.06;
          pointer-events: none;
          z-index: 1;
        }

        .footer-content {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 3rem 2rem;
        }

        /* Newsletter Section */
        .newsletter-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          padding-bottom: 4rem;
          margin-bottom: 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .newsletter-left h3 {
          font-family: "Syne", sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .newsletter-left p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .newsletter-input {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 0.25rem 0.25rem 0.25rem 1.5rem;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus-within {
          border-color: #c8f135;
          background: rgba(200, 241, 53, 0.05);
        }

        .newsletter-input input {
          background: transparent;
          border: none;
          padding: 0.75rem 0;
          font-size: 0.875rem;
          color: #ffffff;
          outline: none;
          width: 240px;
        }

        .newsletter-input input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .newsletter-input button {
          background: #c8f135;
          border: none;
          border-radius: 100px;
          padding: 0.65rem 1.25rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #000000;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          font-family: "DM Sans", sans-serif;
        }

        .newsletter-input button:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        /* Links Grid */
        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .link-column h4 {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .link-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .link-column li {
          margin-bottom: 0.75rem;
        }

        .link-column a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .link-column a:hover {
          color: #c8f135;
          transform: translateX(4px);
          display: inline-block;
        }

        /* Bottom Bar */
        .bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-text {
          font-family: "Syne", sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: #ffffff;
          letter-spacing: -0.03em;
        }

        .logo-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c8f135;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.75rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .social-link:hover {
          background: rgba(200, 241, 53, 0.15);
          color: #c8f135;
          transform: translateY(-2px);
        }

        .subscribe-success {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #c8f135;
          color: #000000;
          padding: 0.75rem 1.25rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 100;
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 3rem 1.5rem 1.5rem;
          }

          .newsletter-section {
            flex-direction: column;
            text-align: center;
          }

          .newsletter-left h3 {
            font-size: 1.25rem;
          }

          .newsletter-input input {
            width: 180px;
          }

          .links-grid {
            gap: 2rem;
          }

          .bottom-bar {
            flex-direction: column;
            text-align: center;
          }

          .subscribe-success {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            justify-content: center;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="noise" />
        <div className="grid-lines" />
        <div
          className="accent-blob"
          style={{
            background: "#C8F135",
            width: "40vw",
            height: "40vw",
            bottom: "-10%",
            right: "-10%",
          }}
        />
        <div
          className="accent-blob"
          style={{
            background: "#5B8EFF",
            width: "30vw",
            height: "30vw",
            top: "20%",
            left: "-15%",
            opacity: 0.04,
          }}
        />

        <div className="footer-content">
          {/* Newsletter Section */}
          <div className="newsletter-section">
            <div className="newsletter-left">
              <h3>Stay in the loop</h3>
              <p>Get the latest updates and insights delivered straight to your inbox.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  Subscribe
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Links Grid */}
          <div className="links-grid">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title} className="link-column">
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="bottom-bar">
            <div className="logo">
              <span className="logo-text">BIC</span>
              <span className="logo-dot" />
            </div>
            <div className="copyright">
              © {currentYear} BIC. All rights reserved.
            </div>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {isSubscribed && (
        <div className="subscribe-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Thanks for subscribing!
        </div>
      )}
    </>
  );
}