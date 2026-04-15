"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import confetti from "canvas-confetti";
import TiltCard from "./components/TiltCard";
import { Play, Sparkles, Star, Target } from "lucide-react";

export default function Home() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF', '#8C7323', '#C0C0C0'] // Luxury Gold/Silver
    });
  };

  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "circOut" as const }
  };

  return (
    <main className={styles.main}>
      {/* 1. HERO */}
      <section className={styles.heroSection}>
        <motion.div 
          className={styles.curtainLeft}
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} 
        ></motion.div>
        
        <motion.div 
          className={styles.curtainRight}
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        ></motion.div>
        
        <div className={styles.spotlightWrapper}>
           <div className={styles.spotlightMain}></div>
        </div>

        <div className={styles.heroContent}>
          <motion.div className={styles.heroCenter}
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          >
            <h1 className={styles.heroTitle}>
              We Bring Out <br/><span className={styles.goldText}>The Actor In You.</span>
            </h1>
            <p className={styles.subtitle}>
              Discover your talent, build confidence, and shine on the grand stage with absolute brilliance.
            </p>
            <div className={styles.heroBtns}>
              <Link href="/about-us" className={styles.btnPrimary}>Explore The Stage</Link>
              <button 
                onClick={(e) => { triggerConfetti(); setTimeout(() => window.location.href = '/contact-us', 600); }} 
                className={styles.btnSecondary}
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.statsRow}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className={styles.statLine}>
            <h3>100+</h3><span>Schools</span>
          </div>
          <div className={styles.statLine}>
            <h3>14</h3><span>Skills</span>
          </div>
          <div className={styles.statLine}>
            <h3>5+</h3><span>Years</span>
          </div>
          <div className={styles.statLine}>
            <h3>1000+</h3><span>Students</span>
          </div>
        </motion.div>
      </section>

      {/* 2. VIDEO SECTION */}
      <section className={styles.videoSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
           <span className={styles.sectionLabel}>The Experience</span>
           <h2>See The Magic Live</h2>
        </motion.div>
        
        <motion.div {...fadeUp}>
          <TiltCard className={styles.videoEmbedWrapper}>
            <div className={styles.videoEmbed}>
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Welcome"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
                className={styles.iframeArea}
              ></iframe>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div className={styles.featureChips} variants={{ visible: { transition: { staggerChildren: 0.2 }}}} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.chip}><Sparkles size={18} className={styles.goldIcon}/> Fun Learning</motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.chip}><Star size={18} className={styles.goldIcon}/> Stage Performance</motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.chip}><Target size={18} className={styles.goldIcon}/> Expert Mentors</motion.div>
        </motion.div>
      </section>

      {/* 3. ABOUT US TEASER */}
      <section className={styles.aboutTeaser}>
        <motion.div className={styles.aboutLeft} {...fadeUp}>
          <span className={styles.sectionLabel}>About Us</span>
          <h2>Where Talent Meets The Stage</h2>
          <div className={styles.aboutTextGroup}>
            <p>
              The Arizona Institute of Performing Arts is dedicated to nurturing raw talent 
              and turning it into spectacular stage performances. We believe every child has a unique spark. 
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
              <div className={styles.glowOrb}></div>
              <div className={styles.glassFrame}>
                <Sparkles size={80} strokeWidth={1} color="var(--color-gold)"/>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* 4. OUR WORK PREVIEW */}
      <section className={styles.workPreview}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
           <h2>Our Proud Partners</h2>
        </motion.div>
        <motion.div className={styles.carouselWrapper} {...fadeUp}>
          <div className={styles.carouselTrack}>
            {[1,2,3,4,5,6,7,8, 1,2,3,4,5,6,7,8].map((n, i) => (
              <div key={i} className={styles.logoCard}>
                <span>School {n}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{textAlign: 'center', marginTop: '3rem'}}>
           <Link href="/our-work" className={styles.btnOutlineGold}>View All Partners</Link>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS */}
      <section className={styles.achievements}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
           <h2>Accolades & Recognition</h2>
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
              <TiltCard className="card-3d" style={{ width: '100%', height: '100%' }}>
                <div className={styles.photoFrame}>
                   <div className={styles.photoOverlay}>
                     <p>Excellence Award 20{15+i}</p>
                   </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ambientGlow}></div>
        <div className={styles.ctaCard}>
          <motion.h2 {...fadeUp}>Ready To Shine?</motion.h2>
          <motion.p {...fadeUp}>Book a free consultation and let's discuss your journey.</motion.p>
          
          <motion.button 
            {...fadeUp}
            className={styles.btnPrimaryLg} 
            onClick={(e) => {
              triggerConfetti();
              setTimeout(() => window.location.href = '/contact-us', 600);
            }}
          >
            Unlock The Stage
          </motion.button>
        </div>
      </section>
    </main>
  );
}
