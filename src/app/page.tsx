"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Hero3DScene from "./components/Hero3DScene";
import TiltCard from "./components/TiltCard";
import TheaterMasksBackground from "./components/TheaterMasksBackground";
import { motion } from "framer-motion";

const SCHOOL_LOGOS = [
  "/schllogos/1.png",
  "/schllogos/2.png",
  "/schllogos/3.png",
  "/schllogos/4.png",
  "/schllogos/5.png",
  "/schllogos/6.png",
  "/schllogos/7.png",
  "/schllogos/9.png",
  "/schllogos/10.png",
  "/schllogos/11.png",
  "/schllogos/12.png",
  "/schllogos/13.png",
  "/schllogos/14.png",
  "/schllogos/15.png",
  "/schllogos/16.png",
  "/schllogos/17.png",
  "/schllogos/18.png",
  "/schllogos/19.png",
  "/schllogos/20.png",
];

const AWARD_IMAGES = [
  { src: "/awards/236.png", title: "Excellence in Choreography" },
  { src: "/awards/238.png", title: "Outstanding Stage Presence" },
  { src: "/awards/236.png", title: "Creative Direction Award" },
  { src: "/awards/242.png", title: "Best Theatrical Production" },
  { src: "/awards/244.png", title: "Holistic Event Execution" },
  { src: "/awards/246.png", title: "Community Impact Recognition" },
];

const MAIN_AWARD = { src: "/awards/award.jpeg", title: "Achievement Award" };

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
      colors: ["#4f46e5", "#0ea5e9", "#f43f5e", "#f59e0b", "#10b981"],
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
          <div className={styles.spotlightSecondary} />
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
                ✦ A Decade of Excellence in Event Innovation ✦
              </span>

              <div className={styles.verticals}>
                EVENT PLANNING <span className={styles.divider}>|</span> SCHOOL EVENTS <span className={styles.divider}>|</span> CREATIVE CONCEPTS <span className={styles.divider}>|</span> ANNUAL PRODUCTIONS
              </div>
            </div>

            {/* Primary elements (Instant arrival) */}
            <h1 className={styles.heroTitle}>
              Unleashing Talent, <br />
              <span className={styles.goldText}>Creating Stars.</span>
            </h1>

            <p className={styles.subtitle}>
              Arizona is a dynamic event organizing company with over a decade <br /> 
              of excellence in curating impactful and memorable experiences <br /> 
              for educational institutions.
            </p>

            {/* Secondary elements (Interaction phase) */}
            <div
              className={`${styles.heroBtns} ${styles.secondaryGroup}`}
              data-reveal={(heroActive && stagedReveal) ? "true" : "false"}
              style={{ transitionDelay: "0.4s" }}
            >
              <Link href="/about-us" className={styles.btnPrimary}>
                About Arizona
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
      
      <div className="ambient-glow glow-indigo" style={{ top: "120vh", left: "-10vw", opacity: 0.08 }} />
      <div className="ambient-glow glow-rose" style={{ top: "160vh", right: "-10vw", opacity: 0.08 }} />


      {/* ══════════════════════════════════════════════════
          2. WHAT WE DELIVER (Our Offerings)
      ══════════════════════════════════════════════════ */}
      <section style={{ 
        padding: "clamp(4rem, 10vw, 8rem) 5%", 
        background: "var(--color-bg-main)",
        position: "relative"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
            <span className={styles.sectionLabel}>Our Offerings</span>
            <h2 className={styles.sectionTitle}>What Arizona Delivers</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Annual Days", desc: "Comprehensive production management for massive school events.", image: "/img/services/annual_days.png", color: "var(--color-vibrant-rose)" },
              { title: "Sports Days", desc: "Complete event execution from creative concept to final applause.", image: "/img/services/sports_day.png", color: "var(--color-vibrant-indigo)" },
              { title: "Graduation Ceremony", desc: "Memorable experiences for students moving to their next chapter.", image: "/img/services/graduation.png", color: "var(--color-vibrant-teal)" },
              { title: "Theatre Workshops", desc: "Performance curation and intensive training for young stars.", image: "/img/services/theatre_workshops.png", color: "var(--color-vibrant-amber)" },
              { title: "Stage & Concept Design", desc: "Creative thematic development and theatrical stage setups.", image: "/img/services/stage_design.png", color: "var(--color-vibrant-violet)" },
              { title: "Experiential Programs", desc: "Interactive activities featuring arts, crafts, and culinary experiences.", image: "/img/services/experiential.png", color: "var(--color-vibrant-emerald)" },
              { title: "Media Collaborations", desc: "Professional event videography and strategic press coverage.", image: "/img/services/media_collabs.png", color: "var(--color-vibrant-rose)" },
              { title: "Customized Events", desc: "Bespoke choreography and management for weddings and private gatherings.", image: "/img/services/customized_events.png", color: "var(--color-vibrant-teal)" }
            ].map((item, idx) => {
              const isHighlighted = ["Annual Days", "Sports Days", "Graduation Ceremony", "Theatre Workshops"].includes(item.title);
              return (
              <div key={idx} style={{ 
                background: "var(--color-bg-main)", 
                borderRadius: "24px", 
                overflow: "hidden",
                border: `1px solid ${item.color}22`,
                boxShadow: `0 20px 40px ${item.color}15`,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                <div style={{ position: "relative", width: "100%", height: "220px" }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${item.color}88 100%)`, mixBlendMode: "overlay" }} />
                </div>
                <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h4 style={{ 
                    color: item.color, 
                    marginBottom: "1rem", 
                    fontSize: "1.25rem", 
                    fontWeight: "700", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px"
                  }}>
                    <span style={{ fontSize: "0.9em", opacity: 0.8 }}>✦</span>
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0, opacity: 0.9 }}>{item.desc}</p>
                  
                  <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                    <div style={{ width: "30px", height: "3px", background: item.color, borderRadius: "2px", opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="ambient-glow glow-teal" style={{ top: "220vh", left: "20vw", opacity: 0.1 }} />
      <div className="ambient-glow glow-amber" style={{ top: "280vh", right: "10vw", opacity: 0.1 }} />

      {/* ══════════════════════════════════════════════════
          3. ABOUT TEASER
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser}>
        <div className={styles.aboutTeaserContainer}>
        <div className={styles.aboutLeft}>
          <span className={styles.sectionLabel}>Who We Are</span>
          <h2 className={styles.sectionTitle}>Crafting Unforgettable Experiences</h2>
          <div className={styles.aboutTextGroup} style={{ borderLeft: "none", paddingLeft: 0, marginTop: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ padding: "1.5rem", background: "rgba(212, 175, 55, 0.03)", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Trusted Industry Expertise</h4>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Over 10 years established as a trusted name in designing and managing events that inspire creativity, confidence, and self-expression.
                </p>
              </div>
              <div style={{ padding: "1.5rem", background: "rgba(212, 175, 55, 0.03)", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Creative Professional Execution</h4>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Every event is thoughtfully planned, seamlessly managed, and emotionally engaging, creating dynamic platforms for young performers to shine.
                </p>
              </div>
            </div>
          </div>
          <Link href="/about-us" className={styles.btnOutlineGold} style={{ border: "1px solid var(--color-gold)", padding: "1rem 2.5rem", borderRadius: "30px", fontSize: "1rem", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", display: "inline-block", background: "linear-gradient(90deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%)" }}>
            Discover Our Story
          </Link>
        </div>
        <div className={styles.aboutRight} style={{ position: "relative" }}>
          <TiltCard className="card-3d" disabled style={{ width: "100%" }}>
            <div className={styles.photoFrame} style={{ height: "550px", width: "100%", position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
              <Image
                src="/img/event_vertical.png"
                alt="Grand Event Production"
                fill
                style={{ objectFit: "cover" }}
              />
              {/* Gradient Overlay & Text */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "4rem 2rem 2rem", background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)" }}>
                <h3 style={{ color: "white", margin: 0, fontSize: "1.5rem" }}>A Decade of Excellence</h3>
                <p style={{ color: "var(--color-gold)", margin: "0.5rem 0 0 0", fontSize: "1rem", letterSpacing: "1px" }}>Curating Memorable Experiences</p>
              </div>
            </div>
          </TiltCard>

          {/* Floating Stats Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={styles.floatingBadge}
          >
            <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-gold)", lineHeight: 1 }}>150+</span>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-main)", marginTop: "0.5rem", fontWeight: 600 }}>Large-Scale<br/>School Events</span>
          </motion.div>
        </div>
      </div>
      </section>


      {/* ══════════════════════════════════════════════════
          1.5 EXPERTISE (New Highlight)
      ══════════════════════════════════════════════════ */}
      <section className={styles.expertiseSection}>
        <motion.div 
          style={{ textAlign: "center", marginBottom: "5rem", maxWidth: "1100px", margin: "0 auto 5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.sectionLabel} style={{ marginBottom: "1.5rem", display: "inline-block" }}>Our Expertise</span>
          <h2 className={styles.goldText} style={{ 
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)", 
            lineHeight: 1.1, 
            textTransform: "none", 
            letterSpacing: "-0.02em",
            fontWeight: 900,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))"
          }}>
            Transforming Craft into <br/> Powerful Stage Spectacles
          </h2>
          <div style={{ width: "80px", height: "4px", background: "var(--gradient-gold-text)", margin: "2rem auto 0", borderRadius: "2px" }} />
        </motion.div>
        <div className={styles.expertiseGrid}>
          {/* Card 1: Dance Forms */}
          <motion.div 
            className={`${styles.expertiseCard} ${styles.danceCard}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.cardGlow} />
            <div className={styles.cardIcon}>💃</div>
            <h2 className={styles.cardTitle}>Dance Forms</h2>
            <div className={styles.cardSubtitle}>
              Traditional • Folk • Semi-Classical • <span>Hip-Hop</span> • Contemporary
            </div>
            <p className={styles.cardContent}>
              At Arizona, every performance is a spectacle of <strong>creativity, precision, and grandeur</strong>. 
              Known for weaving <strong>powerful themes</strong> with diverse dance styles, we craft 
              <strong>visually stunning productions</strong> featuring <strong>dynamic choreography</strong> and 
              <strong>100+ mesmerizing stage formations</strong> that leave audiences spellbound.
            </p>
          </motion.div>

          {/* Card 2: Theatre Excellence */}
          <motion.div 
            className={`${styles.expertiseCard} ${styles.theatreCard}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.cardGlow} />
            <div className={styles.cardIcon}>🎭</div>
            <h2 className={styles.cardTitle}>Theatre Excellence</h2>
            <div className={styles.cardSubtitle}>
              Drama • Storytelling • <span>Workshops</span> • Production
            </div>
            <p className={styles.cardContent}>
              From <strong>Dance Ballets</strong> and <strong>Mythological Acts</strong> to enchanting 
              <strong>Disney Productions</strong>, Arizona creates <strong>powerful theatrical experiences</strong> 
              in any language a school envisions. With expertise in <strong>large-scale theatre productions</strong> 
              and our unique <strong>Theatre in Education</strong> workshops conducted across India, we blend 
              <strong>creativity, learning, and performance</strong> into <strong>unforgettable stage journeys</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section className={styles.whatWeDoSection}>
        <div className={styles.whatWeDoContainer}>
          <div className={styles.whatWeDoHeader}>
            <span className={styles.sectionLabel}>Why Choose Arizona</span>
            <h2 className={styles.sectionTitle}>Where Talent Meets <span className={styles.goldText}>Opportunity</span></h2>
            <p className={styles.sectionSubtitle}>
              &quot;Delivering Memorable Experiences that Inspire &amp; Impress&quot;
            </p>
          </div>

          <div className={styles.modernEthosLayout}>
            {/* Background Accent — Cinematic Light */}
            <div className={styles.ethosLightBlur} aria-hidden="true" />
            
            <div className={styles.ethosCardWrapper}>
              {/* Card 1 — Elevated Glass */}
              <div className={styles.ethosGlassCard} style={{ background: "#4c1d95", borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "0 20px 50px rgba(76, 29, 149, 0.2)" }}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndicator} style={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff", borderColor: "rgba(255, 255, 255, 0.4)" }}>01</div>
                  <h3 style={{ color: "#fff" }}>Expertise & Execution</h3>
                </div>
                <div className={styles.cardBody}>
                  <p style={{ color: "#fff" }}>
                    Our <strong style={{ color: "#fff" }}>professional choreographer team</strong> and <strong style={{ color: "#fff" }}>theatre experts</strong> bring over 10+ years of event management excellence, handling large-scale events. We cater to students of all ages — from kindergarten to adults.
                  </p>
                  <div className={styles.featureList} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDot} style={{ background: "#fff" }} />
                      <div>
                        <strong style={{ color: "#fff" }}>Impactful Execution</strong>
                        <p style={{ color: "#fff" }}>We provide <strong style={{ color: "#fff" }}>customised costumes, creative showstopper props, professional makeup artists, photography & videography, and complete stage setup with expert team coordination</strong> — delivering everything necessary to <strong style={{ color: "#fff" }}>make every event impactful</strong>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Overlapping Glass */}
              <div className={`${styles.ethosGlassCard} ${styles.visionCardOffset}`} style={{ background: "#0d9488", borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "0 20px 50px rgba(13, 148, 136, 0.2)" }}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndicator} style={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff", borderColor: "rgba(255, 255, 255, 0.4)" }}>02</div>
                  <h3 style={{ color: "#fff" }}>Transformative Results</h3>
                </div>
                <div className={styles.cardBody}>
                  <p style={{ color: "#fff" }}>
                    <strong style={{ color: "#fff" }}>Each student vibrates with confident energy, thanks to the amazing skill-transfer by our well-trained professionals. Within a short span of days, students show great results on stage.</strong>
                  </p>
                  <div className={styles.featureList} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDot} style={{ background: "#fff" }} />
                      <div>
                        <strong style={{ color: "#fff" }}>Confident Performers</strong>
                        <p style={{ color: "#fff" }}>We foster self-belief, ensuring every young talent shines brightly and finds their true voice.</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDot} style={{ background: "#fff" }} />
                      <div>
                        <strong style={{ color: "#fff" }}>Real Stage Exposure</strong>
                        <p style={{ color: "#fff" }}>Providing platforms where students don’t just perform—they express, evolve, and shine.</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.premiumQuote} style={{ borderLeftColor: "#fff", color: "#fff" }}>
                    &quot;With Arizona, every session leads to a stage, and every stage creates a star.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Backstage & Performance Gallery */}
          <div className={styles.featureChips} style={{ marginTop: "6rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", width: "100%" }}>
              
              {/* Card 1 */}
              <div style={{ background: "var(--color-bg-main)", borderRadius: "24px", overflow: "hidden", border: "1px solid var(--color-border-glass)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", transition: "all 0.4s ease" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/why-choose-us/performance.png" alt="Vibrant Stage Performances" fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "#312e81", marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "700" }}>Dynamic Performances</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>We transform students into confident performers, perfectly coordinating high-energy acts that captivate parents and audiences alike.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div style={{ background: "var(--color-bg-main)", borderRadius: "24px", overflow: "hidden", border: "1px solid var(--color-border-glass)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", transition: "all 0.4s ease" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/why-choose-us/props.png" alt="Customised Costumes" fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "#0d9488", marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "700" }}>Customised Costumes & Props</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Every event features exclusive, customized costumes and highly creative showstopper props, bringing grand concepts to life on stage.</p>
                </div>
              </div>
 
              {/* Card 3 */}
              <div style={{ background: "var(--color-bg-main)", borderRadius: "24px", overflow: "hidden", border: "1px solid var(--color-border-glass)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", transition: "all 0.4s ease" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/img/school_team.png" alt="Professional Backstage Management" fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "var(--color-vibrant-teal)", marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "700" }}>Professional Stage Management</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Our dedicated team of experts orchestrates every detail seamlessly behind the scenes, ensuring flawless execution from start to finish.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <div className="ambient-glow glow-indigo" style={{ top: "100vh", left: "-50vw" }} />
      <div className="ambient-glow glow-rose" style={{ top: "400vh", right: "-50vw" }} />
      <div className="ambient-glow glow-teal" style={{ top: "700vh", left: "-50vw" }} />

      {/* ══════════════════════════════════════════════════
          3.5 VISION & MISSION
      ══════════════════════════════════════════════════ */}
      <section className={styles.whatWeDoSection} style={{ background: "var(--color-bg-main)", padding: "6rem 5%" }}>
        <div className={styles.whatWeDoContainer}>
          <div className={styles.modernEthosLayout} style={{ flexDirection: "column", gap: "4rem", padding: 0 }}>
            
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className={styles.sectionLabel}>The Arizona Ethos</span>
              <h2 className={styles.sectionTitle}>Vision <span className={styles.goldText}>&amp;</span> Mission</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2.5rem", width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ background: "var(--color-vibrant-teal)", padding: "3.5rem 3rem", borderRadius: "4px", clipPath: "polygon(0 0, 100% 3%, 100% 100%, 3% 97%)", boxShadow: "0 20px 50px rgba(13, 148, 136, 0.2)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", border: "2px solid rgba(255, 255, 255, 0.4)" }}>V</div>
                <h3 style={{ fontSize: "2.2rem", color: "#fff", marginBottom: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: "800" }}>Our Vision</h3>
                <p style={{ color: "#fff", lineHeight: 1.8, fontSize: "1.05rem", margin: 0, fontWeight: "500" }}>
                  Arizona envisions a world where every child is empowered to explore their imagination and express their creativity with confidence. By integrating the power of performance and storytelling, Arizona strives to nurture young minds, helping them discover their unique voice and build the self-belief needed to shine both on and off the stage.
                </p>
              </div>

              <div style={{ background: "var(--color-vibrant-amber)", padding: "3.5rem 3rem", borderRadius: "4px", clipPath: "polygon(3% 3%, 100% 0, 97% 100%, 0 97%)", boxShadow: "0 20px 50px rgba(245, 158, 11, 0.2)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem", border: "2px solid rgba(255, 255, 255, 0.4)" }}>M</div>
                <h3 style={{ fontSize: "2.2rem", color: "#fff", marginBottom: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: "800" }}>Our Mission</h3>
                <p style={{ color: "#fff", lineHeight: 1.8, fontSize: "1.05rem", margin: 0, fontWeight: "500" }}>
                  Arizona&apos;s mission is to cultivate confident, expressive, and thoughtful individuals through the transformative experience of performance and events. The company is dedicated to providing a stress-free and engaging learning environment where children can develop essential life skills in a fun way. By blending theatrical techniques and spontaneity, Arizona fosters excellence in every participant.
                </p>
              </div>
            </div>
            

          </div>
        </div>
      </section>



      <section className={styles.achievements}>
        <TheaterMasksBackground position="right" opacity={0.18} offsetX="-10vw" />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Industry Accolades</span>
          <h2>Accolades &amp; Recognition</h2>
          <div style={{ width: "60px", height: "4px", background: "var(--gradient-gold-text)", margin: "1.5rem auto", borderRadius: "2px" }} />
        </div>

        <div className={styles.awardsGridContainer}>
          <div className={styles.symmetricAwardsGrid}>
            {/* We'll place the MAIN_AWARD in the center of a 3x3 grid (position 5) */}
            {[
              AWARD_IMAGES[0], AWARD_IMAGES[1], AWARD_IMAGES[2],
              AWARD_IMAGES[3], "MAIN", AWARD_IMAGES[4],
              AWARD_IMAGES[5], AWARD_IMAGES[0], AWARD_IMAGES[1] // Filling extras for symmetry
            ].map((award, i) => {
              if (award === "MAIN") {
                return (
                  <motion.div 
                    key="main-award"
                    className={styles.centerAwardItem}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <TiltCard className="card-3d" disabled>
                      <div className={styles.mainAwardCenterFrame}>
                        <Image
                          src={MAIN_AWARD.src}
                          alt={MAIN_AWARD.title}
                          fill
                          style={{ objectFit: "contain", padding: "10px" }}
                          priority
                        />
                        {/* No Text Overlay as requested */}
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={i}
                  className={styles.gridAwardItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <div className={styles.gridAwardFrame}>
                    <Image
                      src={(award as any).src}
                      alt={(award as any).title}
                      fill
                      sizes="(max-width: 600px) 100vw, 300px"
                      style={{ padding: "8px" }}
                      className={styles.awardImgMobileFit}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          4. PARTNERS
      ══════════════════════════════════════════════════ */}
      <section className={styles.workPreview}>
        <TheaterMasksBackground position="left" opacity={0.15} offsetX="5vw" offsetY="-10px" scale={0.9} />
        <div className={styles.sectionHeader}>
          <h2>Partnering with schools</h2>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {[...SCHOOL_LOGOS, ...SCHOOL_LOGOS].map((logo, i) => (
              <div key={i} className={styles.logoCard}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={logo}
                    alt={`School Logo ${(i % SCHOOL_LOGOS.length) + 1}`}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className={styles.logoImage}
                    priority={i < SCHOOL_LOGOS.length}
                  />
                </div>
              </div>
            ))}
          </div>
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
