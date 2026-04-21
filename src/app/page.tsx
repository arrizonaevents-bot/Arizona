"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Hero3DScene from "./components/Hero3DScene";
import TiltCard from "./components/TiltCard";
import { Sparkles } from "lucide-react";

const SCHOOL_LOGOS = [
  "/schllogos/1.png",
  "/schllogos/2.png",
  "/schllogos/3.png",
  "/schllogos/4.png",
  "/schllogos/5.jpg",
  "/schllogos/6.png",
  "/schllogos/7.png",
  "/schllogos/9.jpg",
  "/schllogos/10.jpg",
  "/schllogos/11.png",
  "/schllogos/12.png",
  "/schllogos/13.png",
  "/schllogos/14.jpg",
  "/schllogos/15.png",
  "/schllogos/16.jpg",
  "/schllogos/17.png",
  "/schllogos/18.png",
  "/schllogos/19.png",
  "/schllogos/20.jpg",
];

export default function Home() {
  const router  = useRouter();
  const [heroActive, setHeroActive] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [stagedReveal, setStagedReveal] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal primary text instantly for maximum impact
    const timer = setTimeout(() => setContentVisible(true), 100);
    
    // Stage 2: Trigger the theatrical opening after a reading delay (1200ms)
    const stage2Timer = setTimeout(() => setStagedReveal(true), 1400);

    return () => {
      clearTimeout(timer);
      clearTimeout(stage2Timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerConfetti = async () => {
    const { default: confetti } = await import("canvas-confetti");
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFF", "#8C7323", "#C0C0C0"],
    });
  };

  return (
    <main className={styles.main}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className={styles.heroSection}>

        {/* Optimized 3D hero background */}
        <div className={styles.heroSceneFrame} aria-hidden="true">
          <Hero3DScene onReady={() => setHeroActive(true)} />
        </div>

        {/* Spotlight */}
        <div className={styles.spotlightWrapper} aria-hidden="true">
          <div className={styles.spotlightMain} />
        </div>

        {/* Theatrical Curtains — Reveal the 3D background */}
        <div className={styles.curtainLeft} data-active={(heroActive && stagedReveal) ? "true" : "false"} />
        <div className={styles.curtainRight} data-active={(heroActive && stagedReveal) ? "true" : "false"} />
        <div className={styles.curtainValance} />

        {/* Vignette */}
        <div className={styles.heroVignette} aria-hidden="true" />

        {/* Hero copy — Two-Stage Reveal for Speed & Focus */}
        <div 
          className={styles.heroContent} 
          data-active={contentVisible ? "true" : "false"}
        >
          <div className={styles.heroCenter}>
            {/* Secondary elements (Fade in after curtain) */}
            <div 
              className={styles.secondaryGroup}
              data-reveal={(heroActive && stagedReveal) ? "true" : "false"}
              style={{ transitionDelay: "0.2s" }}
            >
              <span className={styles.heroBadge}>
                ✦ Arizona Institute of Performing Arts and Event Management ✦
              </span>

              <div className={styles.verticals}>
                CHOREOGRAPHY <span className={styles.divider}>|</span> THEATRE <span className={styles.divider}>|</span> MUSIC <span className={styles.divider}>|</span> ANNUAL SCHOOL FUNCTIONS
              </div>
            </div>

            {/* Primary elements (Instant arrival) */}
            <h1 className={styles.heroTitle}>
              We Bring Out <br />
              <span className={styles.goldText}>The Actor In You.</span>
            </h1>

            <p className={styles.subtitle}>
              Discover your talent, build confidence, and shine on the grand stage with absolute brilliance.
            </p>

            {/* Secondary elements (Interaction phase) */}
            <div 
              className={`${styles.heroBtns} ${styles.secondaryGroup}`}
              data-reveal={(heroActive && stagedReveal) ? "true" : "false"}
              style={{ transitionDelay: "0.4s" }}
            >
              <Link href="/about-us" className={styles.btnPrimary}>
                Explore The Stage
              </Link>
              <button
                onClick={() => {
                  void triggerConfetti();
                  setTimeout(() => router.push("/contact-us"), 600);
                }}
                className={styles.btnSecondary}
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar — Reveals with background */}
        <div 
          className={styles.statsRow} 
          data-active={(heroActive && stagedReveal) ? "true" : "false"}
        >
          <div className={styles.statLine}><h3>100+</h3><span>Schools</span></div>
          <div className={styles.statLine}><h3>14</h3><span>Skills</span></div>
          <div className={styles.statLine}><h3>5+</h3><span>Years</span></div>
          <div className={styles.statLine}><h3>1000+</h3><span>Students</span></div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ABOUT TEASER
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser}>
        <div className={styles.aboutLeft}>
          <span className={styles.sectionLabel}>About Us</span>
          <h2 className={styles.sectionTitle}>Where Academy Meets The Stage</h2>
          <div className={styles.aboutTextGroup}>
            <p>
              Arizona Institute is a leading event management partner for schools. We provide 
              comprehensive support for major school events, taking care of everything from 
              concept development to final stage execution. Our focus is on delivering 
              professional, well-coordinated programs that reflect the school's standards.
            </p>
            <p>
              By combining our theatrical expertise with practical project management, we 
              help students find their confidence and voice. Our team of experienced 
              choreographers and directors ensures that every annual day, sports event, 
              or graduation is handled with precision and care.
            </p>
          </div>
          <Link href="/about-us" className={styles.btnOutlineGold}>Discover Our Story</Link>
        </div>
        <div className={styles.aboutRight}>
          <TiltCard className="card-3d" disabled>
            <div className={styles.abstractArt}>
              <div className={styles.glowOrb} />
              <div className={styles.glassFrame}>
                <Sparkles size={80} strokeWidth={1} color="var(--color-gold)" />
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. ACHIEVEMENTS
      ══════════════════════════════════════════════════ */}
      <section className={styles.achievements}>
        <div className={styles.sectionHeader}>
          <h2>Accolades &amp; Recognition</h2>
        </div>
        <div className={styles.masonryGrid}>
          {[1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className={styles.masonryItem}
            >
              <TiltCard className="card-3d" style={{ width: "100%", height: "100%" }} disabled>
                <div className={styles.photoFrame}>
                  <div className={styles.photoOverlay}>
                    <p>Excellence Award 20{15 + i}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. PARTNERS
      ══════════════════════════════════════════════════ */}
      <section className={styles.workPreview}>
        <div className={styles.sectionHeader}>
          <h2>Our Proud Partners</h2>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {[...SCHOOL_LOGOS, ...SCHOOL_LOGOS].map((logo, i) => (
              <div key={i} className={styles.logoCard}>
                <div className={styles.logoWrapper}>
                  <Image 
                    src={logo} 
                    alt={`Partner School Logo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className={styles.logoImage}
                    priority={i < 8}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/our-work" className={styles.btnOutlineGold}>View All Partners</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CTA
      ══════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ambientGlow} />
        <div className={styles.ctaCard}>
          <h2>Ready To Shine?</h2>
          <p>Book a free consultation and let&apos;s discuss your journey.</p>
          <button
            className={styles.btnPrimaryLg}
            onClick={() => {
              void triggerConfetti();
              setTimeout(() => router.push("/contact-us"), 600);
            }}
          >
            Unlock The Stage
          </button>
        </div>
      </section>
    </main>
  );
}
