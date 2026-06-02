"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const formRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Animation variants
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const contactCardVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formContainerVariants = {
    hidden: { opacity: 0, x: 50, rotateY: 10 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const detailItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const socialLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  const blobVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -20 },
    visible: {
      opacity: 0.12,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const blob2Variants = {
    hidden: { opacity: 0, scale: 0.6, rotate: 20 },
    visible: {
      opacity: 0.06,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap");

        .contact-container {
          position: relative;
          min-height: 100vh;
          background: #0a0a0a;
          font-family: "DM Sans", sans-serif;
          overflow-x: hidden;
        }

        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          z-index: 1;
        }

        .accent-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          pointer-events: none;
          z-index: 1;
        }

        .content {
          position: relative;
          z-index: 10;
          max-width: 1440px;
          margin: 0 auto;
          padding: 8rem 4rem 6rem;
        }

        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8f135;
        }

        .headline {
          font-family: "Syne", sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .headline em {
          font-style: normal;
          color: #c8f135;
        }

        .subheading {
          font-size: 1.125rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Two Column Grid Layout */
        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }

        /* Contact Info Card */
        .contact-info-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .contact-info-title {
          font-family: "Syne", sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .contact-info-subtitle {
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 0.9375rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .detail-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
          color: #ffffff;
        }

        .detail-item:hover .detail-icon {
          background: rgba(200, 241, 53, 0.15);
          transform: scale(1.05);
        }

        .detail-content h4 {
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .detail-content p,
        .detail-content a {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.5;
        }

        .detail-content a:hover {
          color: #c8f135;
        }

        .social-links {
          display: flex;
          gap: 0.875rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
        }

        .social-link:hover {
          border-color: #c8f135;
          color: #c8f135;
          transform: translateY(-3px);
          background: rgba(200, 241, 53, 0.05);
        }

        /* Form Section */
        .form-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .form-title {
          font-family: "Syne", sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.9375rem;
          color: #ffffff;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #c8f135;
          background: rgba(200, 241, 53, 0.05);
          box-shadow: 0 0 0 4px rgba(200, 241, 53, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .error-message {
          font-size: 0.75rem;
          color: #ff6b6b;
          margin-top: 0.5rem;
          margin-left: 0.5rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #c8f135;
          border: none;
          border-radius: 100px;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          font-size: 0.9375rem;
          color: #000000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #c8f135;
          color: #000000;
          padding: 1rem 1.75rem;
          border-radius: 100px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 100;
          font-size: 0.875rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .content {
            padding: 6rem 2rem 4rem;
          }
          .two-column-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .content {
            padding: 5rem 1.25rem 3rem;
          }
          .header-section {
            margin-bottom: 3rem;
          }
          .contact-info-card,
          .form-card {
            padding: 1.75rem;
          }
          .detail-item {
            gap: 1rem;
          }
          .detail-icon {
            width: 42px;
            height: 42px;
            border-radius: 14px;
          }
          .social-link {
            width: 38px;
            height: 38px;
          }
          .success-message {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            justify-content: center;
          }
        }
      `}</style>

      <div className="contact-container" ref={sectionRef}>
        <div className="noise" />
        <div className="grid-lines" />
        
        {/* Animated Blobs */}
        <motion.div
          className="accent-blob"
          style={{
            background: "#C8F135",
            width: "50vw",
            height: "50vw",
            top: "-20%",
            right: "-20%",
          }}
          variants={blobVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.div
          className="accent-blob"
          style={{
            background: "#5B8EFF",
            width: "40vw",
            height: "40vw",
            bottom: "-15%",
            left: "-15%",
            opacity: 0.06,
          }}
          variants={blob2Variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />

        <div className="content">
          {/* Header Section */}
          <motion.div
            ref={headerRef}
            className="header-section"
            variants={headerContainerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <motion.div className="eyebrow" variants={headerItemVariants}>
              <span className="eyebrow-dot" />
              GET IN TOUCH
            </motion.div>
            <motion.h1 className="headline" variants={headerItemVariants}>
              Let's build <em>something great</em> together.
            </motion.h1>
            <motion.p className="subheading" variants={headerItemVariants}>
              Have a project in mind? We'd love to hear about it. Fill out the
              form and our team will get back to you within 24 hours.
            </motion.p>
          </motion.div>

          {/* Two Column Grid - Contact Info & Form */}
          <motion.div
            ref={gridRef}
            className="two-column-grid"
            variants={gridContainerVariants}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
          >
            {/* Contact Information Column */}
            <motion.div
              className="contact-info-card"
              variants={contactCardVariants}
            >
              <h3 className="contact-info-title">Reach out directly</h3>
              <p className="contact-info-subtitle">
                Whether you have a question about our services, need a demo, or
                just want to say hello — we're all ears.
              </p>

              <div className="contact-details">
                <motion.div
                  className="detail-item"
                  custom={0}
                  variants={detailItemVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="detail-content">
                    <h4>Phone</h4>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </div>
                </motion.div>

                <motion.div
                  className="detail-item"
                  custom={1}
                  variants={detailItemVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 7L2 7" />
                    </svg>
                  </div>
                  <div className="detail-content">
                    <h4>Email</h4>
                    <a href="mailto:hello@bic.com">hello@bic.com</a>
                  </div>
                </motion.div>

                <motion.div
                  className="detail-item"
                  custom={2}
                  variants={detailItemVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="detail-content">
                    <h4>Office</h4>
                    <p>123 Design Street, San Francisco, CA 94103</p>
                  </div>
                </motion.div>
              </div>

              <div className="social-links">
                {[
                  { href: "#", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  { href: "#", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                  { href: "#", icon: "M9 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M16 12v4a2 2 0 0 1-2 2" },
                  { href: "#", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    className="social-link"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={idx}
                    variants={socialLinkVariants}
                    initial="hidden"
                    animate={isGridInView ? "visible" : "hidden"}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={social.icon} />
                      {idx === 2 && (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="2.5" />
                          <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
                        </>
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              ref={formRef}
              className="form-card"
              variants={formContainerVariants}
            >
              <h3 className="form-title">Send us a message</h3>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit}>
                <motion.div
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  className="form-group"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formState.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  className="form-group"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formState.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  className="form-group"
                >
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.div
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.subject}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  className="form-group"
                >
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.div
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  initial="hidden"
                  animate={isGridInView ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isSubmitting ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, x: 100, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, x: 100, scale: 0.9, rotateX: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Message sent successfully! We'll be in touch.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}