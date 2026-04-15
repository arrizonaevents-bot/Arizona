"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import sceneStyles from "./components/Hero3DScene.module.css";
import confetti from "canvas-confetti";
import TiltCard from "./components/TiltCard";
import { Play, Sparkles, Star, Target } from "lucide-react";
import Lenis from "lenis";

const Hero3DScene = dynamic(() => import("./components/Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className={sceneStyles.sceneWrapper} aria-hidden="true" style={{ zIndex: 0 }}>
      <div className={sceneStyles.loadOverlay}>
        <div className={sceneStyles.loader}>
          <span className={sceneStyles.loaderDot} />
          <span className={sceneStyles.loaderDot} />
          <span className={sceneStyles.loaderDot} />
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  // Force page to start at the absolute top on reload and init smooth scroll
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Initialize Lenis for premium smooth scrolling globally
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Track how far we've scrolled through the hero section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Use the raw MotionValue directly to avoid React re-renders every frame when scrolling
  // We eliminated scrollProgress state!

  // Parallax: nudge hero text upward as the user scrolls
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // sceneScale was removed to optimize scroll performance

  // ── Confetti ─────────────────────────────────────────────────────
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFF", "#8C7323", "#C0C0C0"],
    });
  };

  const fadeUp = {
    initial:     { opacity: 0, y: 70 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-100px" },
    transition:  { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <main className={styles.main}>

      {/* ══════════════════════════════════════════════════
          1. HERO  — full-bleed 3D + theatrical text
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className={styles.heroSection}>

        {/* Curtains that part on load */}
        <motion.div
          className={styles.curtainLeft}
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />
        <motion.div
          className={styles.curtainRight}
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />

        {/* ── 3D Spline scene sits behind everything ── */}
        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <Hero3DScene scrollYProgress={scrollYProgress} />
        </div>

        {/* Subtle spotlight cone on top of the 3D scene */}
        <div className={styles.spotlightWrapper} aria-hidden="true">
          <div className={styles.spotlightMain} />
        </div>

        {/* Gradient vignette so text stays legible */}
        <div className={styles.heroVignette} aria-hidden="true" />

        {/* ── Hero copy — layered above the 3D scene ── */}
        <motion.div
          className={styles.heroContent}
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.div
            className={styles.heroCenter}
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
          >
            <motion.span
              className={styles.heroBadge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              ✦ Arizona Institute of Performing Arts and Event Management ✦
            </motion.span>

            <h1 className={styles.heroTitle}>
              We Bring Out <br />
              <span className={styles.goldText}>The Actor In You.</span>
            </h1>

            <p className={styles.subtitle}>
              Discover your talent, build confidence, and shine on the grand stage with absolute brilliance.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/about-us" className={styles.btnPrimary}>
                Explore The Stage
              </Link>
              <button
                onClick={() => {
                  triggerConfetti();
                  setTimeout(() => (window.location.href = "/contact-us"), 600);
                }}
                className={styles.btnSecondary}
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div className={styles.statLine}><h3>100+</h3><span>Schools</span></div>
          <div className={styles.statLine}><h3>14</h3><span>Skills</span></div>
          <div className={styles.statLine}><h3>5+</h3><span>Years</span></div>
          <div className={styles.statLine}><h3>1000+</h3><span>Students</span></div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. VIDEO SECTION
      ══════════════════════════════════════════════════ */}
      <section className={styles.videoSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <span className={styles.sectionLabel}>The Experience</span>
          <h2>See The Magic Live</h2>
        </motion.div>

        <motion.div {...fadeUp}>
          <TiltCard className={styles.videoEmbedWrapper}>
            <div className={styles.videoEmbed}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                title="Welcome"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className={styles.iframeArea}
              />
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          className={styles.featureChips}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
            <Sparkles size={18} className={styles.goldIcon} /> Fun Learning
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
            <Star size={18} className={styles.goldIcon} /> Stage Performance
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
            <Target size={18} className={styles.goldIcon} /> Expert Mentors
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ABOUT TEASER
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser}>
        <motion.div className={styles.aboutLeft} {...fadeUp}>
          <span className={styles.sectionLabel}>About Us</span>
          <h2>Where Talent Meets The Stage</h2>
          <div className={styles.aboutTextGroup}>
            <p>
              The Arizona Institute of Performing Arts and Event Management is dedicated to nurturing raw talent
              and turning it into spectacular stage performances across Theatre, Choreography, Music, and Annual Day School Functions.
            </p>
            <p>
              From professional mentors to grand recital events, our students experience
              the best of theater and arts education in an elegant, stress-free environment.
            </p>
          </div>
          <Link href="/about-us" className={styles.btnOutlineGold}>Discover Our Story</Link>
        </motion.div>
        <motion.div className={styles.aboutRight} {...fadeUp}>
          <TiltCard className="card-3d">
            <div className={styles.abstractArt}>
              <div className={styles.glowOrb} />
              <div className={styles.glassFrame}>
                <Sparkles size={80} strokeWidth={1} color="var(--color-gold)" />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. OUR WORK / PARTNERS
      ══════════════════════════════════════════════════ */}
      <section className={styles.workPreview}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Our Proud Partners</h2>
        </motion.div>
        <motion.div className={styles.carouselWrapper} {...fadeUp}>
          <div className={styles.carouselTrack}>
            {[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].map((n, i) => (
              <div key={i} className={styles.logoCard}>
                <span>School {n}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/our-work" className={styles.btnOutlineGold}>View All Partners</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. ACHIEVEMENTS
      ══════════════════════════════════════════════════ */}
      <section className={styles.achievements}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Accolades &amp; Recognition</h2>
        </motion.div>
        <div className={styles.masonryGrid}>
          {[1,2,3,4,5,6].map((i) => (
            <motion.div
              key={i}
              className={styles.masonryItem}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TiltCard className="card-3d" style={{ width: "100%", height: "100%" }}>
                <div className={styles.photoFrame}>
                  <div className={styles.photoOverlay}>
                    <p>Excellence Award 20{15 + i}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CTA
      ══════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ambientGlow} />
        <div className={styles.ctaCard}>
          <motion.h2 {...fadeUp}>Ready To Shine?</motion.h2>
          <motion.p {...fadeUp}>Book a free consultation and let's discuss your journey.</motion.p>
          <motion.button
            {...fadeUp}
            className={styles.btnPrimaryLg}
            onClick={() => {
              triggerConfetti();
              setTimeout(() => (window.location.href = "/contact-us"), 600);
            }}
          >
            Unlock The Stage
          </motion.button>
        </div>
      </section>
    </main>
  );
}
