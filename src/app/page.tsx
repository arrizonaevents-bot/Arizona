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
  { src: "/awards/240.png", title: "Creative Direction Award" },
  { src: "/awards/242.png", title: "Best Theatrical Production" },
  { src: "/awards/244.png", title: "Holistic Event Execution" },
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
              Arizona is a dynamic and experienced event organizing company with over a decade of excellence in curating impactful and memorable experiences.
            </p>

            {/* Secondary elements (Interaction phase) */}
            <div
              className={`${styles.heroBtns} ${styles.secondaryGroup}`}
              data-reveal={(heroActive && stagedReveal) ? "true" : "false"}
              style={{ transitionDelay: "0.4s" }}
            >
              <Link href="/about-us" className={styles.btnPrimary}>
                Explore Our Events
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
          2. WHAT WE DELIVER (Our Offerings)
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(4rem, 10vw, 8rem) 5%", background: "var(--color-bg-alt)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
            <span className={styles.sectionLabel}>Our Offerings</span>
            <h2 className={styles.sectionTitle}>What Arizona Delivers</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Annual Days", desc: "Comprehensive production management for massive school events.", image: "/img/services/annual_days.png" },
              { title: "Sports Day", desc: "Complete event execution from creative concept to final applause.", image: "/img/services/sports_day.png" },
              { title: "Graduation Ceremony", desc: "Memorable experiences for students moving to their next chapter.", image: "/img/services/graduation.png" },
              { title: "Theatre Workshops", desc: "Performance curation and intensive training for young stars.", image: "/img/services/theatre_workshops.png" },
              { title: "Stage & Concept Design", desc: "Creative thematic development and theatrical stage setups.", image: "/img/services/stage_design.png" },
              { title: "Experiential Programs", desc: "Interactive workshops and engaging short-term programs.", image: "/img/services/experiential.png" },
              { title: "Media Collaborations", desc: "Working seamlessly with industry and media professionals.", image: "/img/services/media_collabs.png" },
              { title: "Customized Events", desc: "Tailored private events for schools, institutions & groups.", image: "/img/services/customized_events.png" }
            ].map((item, idx) => {
              const isHighlighted = ["Annual Days", "Sports Day", "Graduation Ceremony", "Theatre Workshops"].includes(item.title);
              return (
              <div key={idx} style={{ 
                background: "var(--color-bg)", 
                borderRadius: "12px", 
                overflow: "hidden",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderTop: isHighlighted ? "4px solid var(--color-gold)" : "1px solid rgba(212, 175, 55, 0.2)",
                boxShadow: isHighlighted ? "0 10px 30px rgba(212, 175, 55, 0.1)" : "0 4px 20px rgba(0,0,0,0.02)",
                transform: isHighlighted ? "translateY(-4px)" : "none",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h4 style={{ color: "var(--color-gold)", marginBottom: "0.5rem", fontSize: "1.15rem", fontWeight: isHighlighted ? "700" : "500", display: "flex", alignItems: "center", gap: "8px" }}>
                    {isHighlighted && <span>✦</span>}
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ABOUT TEASER
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser}>
        <div className={styles.aboutLeft}>
          <span className={styles.sectionLabel}>Who We Are</span>
          <h2 className={styles.sectionTitle}>Crafting Unforgettable Experiences Since 10 Years</h2>
          <div className={styles.aboutTextGroup} style={{ borderLeft: "none", paddingLeft: 0, marginTop: "2rem" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--color-text-main)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Arizona is a dynamic event organizing company with over a decade of excellence in curating impactful and memorable experiences.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ padding: "1.5rem", background: "rgba(212, 175, 55, 0.03)", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Trusted Industry Expertise</h4>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Over 10 years established as a trusted name in designing and managing events that inspire creativity, confidence, and self-expression.
                </p>
              </div>
              <div style={{ padding: "1.5rem", background: "rgba(212, 175, 55, 0.03)", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <h4 style={{ color: "var(--color-gold)", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Flawless Professional Execution</h4>
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
              <div className={styles.ethosGlassCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndicator}>01</div>
                  <h3>Expertise & Execution</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    Our <strong style={{ color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.1)", padding: "0.1em 0.3em", borderRadius: "0.2em" }}>professional choreographer team</strong> and <strong style={{ color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.1)", padding: "0.1em 0.3em", borderRadius: "0.2em" }}>theatre experts</strong> bring over 10+ years of event management excellence, handling large-scale youth events.
                  </p>
                  <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDot} />
                      <div>
                        <strong>Flawless Execution</strong>
                        <p>We provide <strong style={{ color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.1)", padding: "0.1em 0.3em", borderRadius: "0.2em" }}>customised costume and creative and showstoppers props with excellent team stage and do</strong> everything necessary to <strong style={{ color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.1)", padding: "0.1em 0.3em", borderRadius: "0.2em" }}>make the event memorable</strong>.</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDot} />
                      <div>
                        <strong>Creative & Innovative</strong>
                        <p>Impact-driven event concepts that focus on quality, creativity, and high audience engagement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Overlapping Glass */}
              <div className={`${styles.ethosGlassCard} ${styles.visionCardOffset}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIndicator}>02</div>
                  <h3>Transformative Results</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    <strong style={{ color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.1)", padding: "0.1em 0.3em", borderRadius: "0.2em", display: "inline-block", borderLeft: "3px solid var(--color-gold)" }}>Each student confident vibrate wt energy due to well trained professionals amazing transferring skills with in less span of days students show great results on stage.</strong>
                  </p>
                  <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDotGold} />
                      <div>
                        <strong>Confident Performers</strong>
                        <p>We foster self-belief, ensuring every young talent shines brightly and finds their true voice.</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <span className={styles.featureDotGold} />
                      <div>
                        <strong>Real Stage Exposure</strong>
                        <p>Providing platforms where students don’t just perform—they express, evolve, and shine.</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.premiumQuote}>
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
              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/why-choose-us/performance.png" alt="Vibrant Stage Performances" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "var(--color-gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Dynamic Performances</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>We transform students into confident performers, perfectly coordinating high-energy acts that captivate parents and audiences alike.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/why-choose-us/props.png" alt="Customised Costumes" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "var(--color-gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Customised Costumes & Props</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Every event features exclusive, customized costumes and highly creative showstopper props, bringing grand concepts to life on stage.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.15)" }}>
                <div style={{ position: "relative", height: "300px", width: "100%" }}>
                  <Image src="/img/school_team.png" alt="Professional Backstage Management" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ color: "var(--color-gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Professional Stage Management</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Our dedicated team of experts orchestrates every detail seamlessly behind the scenes, ensuring flawless execution from start to finish.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3.5 VISION & MISSION
      ══════════════════════════════════════════════════ */}
      <section className={styles.whatWeDoSection} style={{ background: "var(--color-bg-darker)", padding: "6rem 5%" }}>
        <div className={styles.whatWeDoContainer}>
          <div className={styles.modernEthosLayout} style={{ flexDirection: "column", gap: "4rem", padding: 0 }}>
            
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className={styles.sectionLabel}>The Arizona Ethos</span>
              <h2 className={styles.sectionTitle}>Vision <span className={styles.goldText}>&amp;</span> Mission</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2rem", width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ background: "var(--color-bg)", padding: "3rem", borderRadius: "16px", border: "1px solid rgba(212, 175, 55, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }}></div>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "1px solid var(--color-gold)", background: "rgba(212, 175, 55, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>V</div>
                <h3 style={{ fontSize: "2rem", color: "var(--color-text-main)", marginBottom: "1.5rem", fontFamily: "var(--font-heading)" }}>Our Vision</h3>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", margin: 0 }}>
                  Arizona envisions a world where every child is empowered to explore their imagination and express their creativity with confidence. By integrating the power of performance and storytelling, Arizona strives to nurture young minds, helping them discover their unique voice and build the self-belief needed to shine both on and off the stage.
                </p>
              </div>

              <div style={{ background: "var(--color-bg)", padding: "3rem", borderRadius: "16px", border: "1px solid rgba(212, 175, 55, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }}></div>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "1px solid var(--color-gold)", background: "rgba(212, 175, 55, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>M</div>
                <h3 style={{ fontSize: "2rem", color: "var(--color-text-main)", marginBottom: "1.5rem", fontFamily: "var(--font-heading)" }}>Our Mission</h3>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", margin: 0 }}>
                  Arizona&apos;s mission is to cultivate confident, expressive, and thoughtful individuals through the transformative experience of performance. The company is dedicated to providing a stress-free and engaging learning environment where children can develop essential life skills. By blending elements of wordplay, spontaneity, body movement, and theatrical techniques, Arizona fosters creativity while instilling confidence, communication skills, and excellence in every participant.
                </p>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3.7 EXPERTISE
      ══════════════════════════════════════════════════ */}
      <section className={styles.aboutTeaser} style={{ padding: "clamp(4rem, 10vw, 8rem) 5%", background: "var(--color-bg)" }}>
        <div className={styles.aboutLeft}>
          <span className={styles.sectionLabel}>Driven by Expertise</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}>Crafting Performers, Creating Experiences</h2>
          <div className={styles.aboutTextGroup}>
            <p>
              At Arizona, we go beyond event management—we create transformative performance experiences for young talent. With a strong foundation in event production, we design and deliver engaging programs for children of every age group, seamlessly integrating learning with live event execution. Our structured sessions are carefully curated to develop essential performance skills such as acting, improvisation, dialogue delivery, and stage presence.
            </p>
            <div style={{ padding: "1.5rem", borderLeft: "4px solid var(--color-gold)", background: "rgba(212, 175, 55, 0.05)", borderRadius: "0 8px 8px 0", margin: "1.5rem 0" }}>
              <p style={{ margin: 0, fontStyle: "italic", color: "var(--color-gold-adaptive)", fontSize: "1rem", lineHeight: 1.6 }}>
                &quot;Within a short span of one month, participants undergo intensive, hands-on training that prepares them to confidently perform live in front of an audience.&quot;
              </p>
            </div>
            <p>
              Our strength lies in our people—a team of highly experienced, energetic, and dedicated professionals who bring creativity and direction to every event we execute. Our faculty and mentors are deeply committed to inspiring young talent, working tirelessly to nurture skills, build confidence, and deliver exceptional performance outcomes.
            </p>
          </div>
        </div>
        
        <div className={styles.aboutRight}>
          <TiltCard className="card-3d" disabled style={{ width: "100%" }}>
            <div className={styles.photoFrame} style={{ height: "min(600px, 70vh)", width: "100%", position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
              <Image
                src="/img/school_team.png"
                alt="Professional Event Team Backstage"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3rem 1.5rem 1.5rem", background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)" }}>
                <h3 style={{ color: "white", margin: 0, fontSize: "1.5rem" }}>Expert Mentorship</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>Guiding young talent to the spotlight.</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

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
