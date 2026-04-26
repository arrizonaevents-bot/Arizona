"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Hero3DScene from "./components/Hero3DScene";
import TiltCard from "./components/TiltCard";
import TheaterMasksBackground from "./components/TheaterMasksBackground";
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

const AWARD_IMAGES = [
  { src: "/awards/236.png", title: "Excellence in Choreography" },
  { src: "/awards/238.png", title: "Outstanding Stage Presence" },
  { src: "/awards/240.png", title: "Creative Direction Award" },
  { src: "/awards/242.png", title: "Best Theatrical Production" },
  { src: "/awards/244.png", title: "Holistic Arts Education" },
  { src: "/awards/246.png", title: "Community Impact Recognition" },
];

export default function Home() {
  const router = useRouter();
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
                ✦ Every Style. Every Emotion. One Grand Stage. ✦
              </span>

              <div className={styles.verticals}>
                CHOREOGRAPHY <span className={styles.divider}>|</span> THEATRE <span className={styles.divider}>|</span> MUSIC <span className={styles.divider}>|</span> ANNUAL SCHOOL FUNCTIONS
              </div>
            </div>

            {/* Primary elements (Instant arrival) */}
            <h1 className={styles.heroTitle}>
              Where Every Student <br />
              <span className={styles.goldText}>Finds Their Stage.</span>
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
          <div className={styles.statLine}><h3>10+</h3><span>Years</span></div>
          <div className={styles.statLine}><h3>10,000+</h3><span>Students</span></div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ABOUT TEASER
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser}>
        <div className={styles.aboutLeft}>
          <span className={styles.sectionLabel}>Who We Are</span>
          <h2 className={styles.sectionTitle}>Redefining the art of school performance across India</h2>
          <div className={styles.aboutTextGroup}>
            <p>
              Arizona Arts is a premier artist-driven choreography and performing arts institute 
              dedicated to transforming school events into extraordinary cultural experiences. 
              From the mountains of Kashmir to the shores of Kanyakumari, we bring disciplined 
              artistry, cinematic storytelling, and boundless creativity to Annual Days, Sports Meets, 
              and Academic Seminars.
            </p>
            <p>
              "We do not merely choreograph performances — we architect moments that students carry for a lifetime." 
              Our methodology seamlessly integrates technical precision with emotional intelligence, nurturing 
              not only skilled performers but also confident young individuals.
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
        <TheaterMasksBackground position="right" opacity={0.18} offsetX="-10vw" />
        <div className={styles.sectionHeader}>
          <h2>Accolades &amp; Recognition</h2>
        </div>
        <div className={styles.masonryGrid}>
          {AWARD_IMAGES.map((award, i) => (
            <div
              key={i}
              className={styles.masonryItem}
            >
              <TiltCard className="card-3d" style={{ width: "100%", height: "100%" }} disabled>
                <div className={styles.photoFrame}>
                  <Image
                    src={award.src}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.awardImage}
                    loading="lazy"
                  />
                  <div className={styles.photoOverlay}>
                    <p>{award.title}</p>
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
        <TheaterMasksBackground position="left" opacity={0.15} offsetX="5vw" offsetY="-10px" scale={0.9} />
        <div className={styles.sectionHeader}>
          <h2>Our Work With Schools</h2>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {[...SCHOOL_LOGOS, ...SCHOOL_LOGOS].map((logo, i) => (
              <div key={i} className={styles.logoCard}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={logo}
                    alt={`School Logo ${i + 1}`}
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
          <Link href="/our-work" className={styles.btnOutlineGold}>View All Schools</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CTA
      ══════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <TheaterMasksBackground position="right" opacity={0.15} offsetX="-5vw" offsetY="10px" scale={0.8} />
        <div className={styles.ambientGlow} />
        <div className={styles.ctaCard}>
          <h2>Ready To Shine?</h2>
          <p>School bookings for 2026 are now open. Dates fill quickly — we encourage early enquiries.</p>
          <button
            className={styles.btnPrimaryLg}
            onClick={() => {
              void triggerConfetti();
              setTimeout(() => router.push("/contact-us"), 600);
            }}
          >
            Reserve Your 2026 Slot
          </button>
        </div>
      </section>
    </main>
  );
}
