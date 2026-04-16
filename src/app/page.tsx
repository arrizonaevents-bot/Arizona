"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./page.module.css";
import sceneStyles from "./components/Hero3DScene.module.css";
import confetti from "canvas-confetti";
import TiltCard from "./components/TiltCard";
import { Sparkles, Star, Target } from "lucide-react";

// Removed: Lenis (conflicts with Framer Motion scroll tracking),
// Play icon (unused)

const Hero3DScene = dynamic(() => import("./components/Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className={sceneStyles.sceneWrapper} aria-hidden="true" style={{ zIndex: 0 }}>
      <div className={sceneStyles.loadOverlay}>
        <div className={sceneStyles.spotlightShimmer} />
      </div>
    </div>
  ),
});

const SCHOOL_LOGOS = [
  "/school/DL-ns-5d81688b-3139-445c-a97f-39139f9312d9_GnpsLogo.jpeg",
  "/school/app_icon.png",
  "/school/channels4_profile.jpg",
  "/school/images (1).jpg",
  "/school/images (1).png",
  "/school/images (2).jpg",
  "/school/images (2).png",
  "/school/images (3).png",
  "/school/images (4).png",
  "/school/images (5).png",
  "/school/images (6).png",
  "/school/images (7).png",
  "/school/images.jpg",
  "/school/images.png",
  "/school/logo_head.png",
  "/school/main-logo.png",
  "/school/unnamed (1).png",
  "/school/unnamed.png",
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const router  = useRouter();
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    setSessionKey(Date.now());
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    // Removed Lenis: it fights with Framer Motion's useScroll and causes jank.
    // Native scroll is already smooth on modern browsers with CSS scroll-behavior.
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Use MotionValues — never causes re-renders, runs entirely on compositor thread
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFF", "#8C7323", "#C0C0C0"],
    });
  };

  // Simpler fadeUp — no scale/blur on scroll, just opacity+Y on viewport enter
  const fadeUp = {
    initial:     { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-80px" },
    transition:  { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <main className={styles.main}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className={styles.heroSection} style={{ position: "relative" }}>

        {/* Curtains removed for performance optimization 
        <motion.div
          className={styles.curtainValance}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`curtain-left-${sessionKey}`}
            className={styles.curtainLeft}
            initial={{ scaleX: 1, x: 0, opacity: 1 }}
            animate={{ 
              scaleX: 0.2, 
              x: "-40%",
              opacity: 0
            }}
            transition={{
              duration: 3,
              ease: [0.45, 0, 0.55, 1],
              delay: 0.5,
              opacity: { delay: 2.8, duration: 0.2 }
            }}
            style={{ transformOrigin: "left center", willChange: "transform" }}
            aria-hidden="true"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`curtain-right-${sessionKey}`}
            className={styles.curtainRight}
            initial={{ scaleX: 1, x: 0, opacity: 1 }}
            animate={{ 
              scaleX: 0.2, 
              x: "40%",
              opacity: 0
            }}
            transition={{
              duration: 3,
              ease: [0.45, 0, 0.55, 1],
              delay: 0.5,
              opacity: { delay: 2.8, duration: 0.2 }
            }}
            style={{ transformOrigin: "right center", willChange: "transform" }}
            aria-hidden="true"
          />
        </AnimatePresence>
        */}

        {/* 3D Spline scene — pointer-events blocked, no scale effect */}
        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 1 }}>
          <Hero3DScene scrollYProgress={scrollYProgress} />
        </div>

        {/* Spotlight */}
        <div className={styles.spotlightWrapper} aria-hidden="true">
          <div className={styles.spotlightMain} />
        </div>

        {/* Vignette */}
        <div className={styles.heroVignette} aria-hidden="true" />

        {/* Hero copy — GP-Ucomposited transform, no blur animation */}
        <motion.div
          className={styles.heroContent}
          style={{ 
            y: textY, 
            opacity: textOpacity, 
            willChange: "transform, opacity",
            paddingTop: "280px" // Further increased offset for better framing
          }}
        >
          <motion.div
            className={styles.heroCenter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span
              className={styles.heroBadge}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              ✦ Arizona Institute of Performing Arts and Event Management ✦
            </motion.span>

            <motion.div
              className={styles.verticals}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              CHOREOGRAPHY <span className={styles.divider}>|</span> THEATRE <span className={styles.divider}>|</span> MUSIC <span className={styles.divider}>|</span> ANNUAL SCHOOL FUNCTIONS
            </motion.div>

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
                  setTimeout(() => router.push("/contact-us"), 600);
                }}
                className={styles.btnSecondary}
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
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
                title="Welcome to Arizona Institute"
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
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
            <Sparkles size={18} className={styles.goldIcon} /> Fun Learning
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
            <Star size={18} className={styles.goldIcon} /> Stage Performance
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={styles.chip}>
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
          4. PARTNERS
      ══════════════════════════════════════════════════ */}
      <section className={styles.workPreview}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Our Proud Partners</h2>
        </motion.div>
        <motion.div className={styles.carouselWrapper} {...fadeUp}>
          <div className={styles.carouselTrack}>
            {[...SCHOOL_LOGOS, ...SCHOOL_LOGOS].map((logo, i) => (
              <div key={i} className={styles.logoCard}>
                <div className={styles.logoWrapper}>
                  <Image 
                    src={logo} 
                    alt={`Partner School ${i + 1}`}
                    fill
                    sizes="200px"
                    className={styles.logoImage}
                  />
                </div>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
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
          <motion.p {...fadeUp}>Book a free consultation and let&apos;s discuss your journey.</motion.p>
          <motion.button
            {...fadeUp}
            className={styles.btnPrimaryLg}
            onClick={() => {
              triggerConfetti();
              setTimeout(() => router.push("/contact-us"), 600);
            }}
          >
            Unlock The Stage
          </motion.button>
        </div>
      </section>
    </main>
  );
}
