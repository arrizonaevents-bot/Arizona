"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import TiltCard from "../components/TiltCard";
import { Compass, Flame, Users, Quote } from "lucide-react";

export default function AboutUs() {
  const team = [
    { 
      name: "Arti Dang", 
      role: "Masters in Theatre, Punjab University",
      bio: "A visionary founder who believes in the transformative power of arts for every child."
    },
    { 
      name: "Gurmeet Singh Mitwa", 
      role: "Actor & Theatre Director, 30+ Bollywood films",
      bio: "Bringing decades of professional stage and screen experience direct to our students."
    },
    { 
      name: "Darshan Singh", 
      role: "Scriptwriter & Theatre Director, 20+ stage plays",
      bio: "Master storyteller and director crafting unforgettable stage narratives."
    },
    { 
      name: "Krishan Kant Dang", 
      role: "Celebrity Anchor, Newsreader, Zee Punjabi/PTC",
      bio: "Guiding students to discover their most confident and expressive public voice."
    }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "circOut" as const }
  };

  return (
    <main className={styles.main}>
      {/* 1. PAGE HERO */}
      <section className={styles.heroSection}>
        <div className={styles.bgOverlay}></div>
        <div className={styles.heroContent}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            The Stage Is Set
          </motion.h1>
          <motion.div className={styles.breadcrumb} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/" className={styles.crumbLink}>Home</Link> <span className={styles.crumbSep}>/</span> <span className={styles.crumbActive}>About</span>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className={styles.storySection}>
        <motion.div className={styles.storyLeft} {...fadeUp}>
          <h2 className={styles.sectionTitle}>A Script for <span className={styles.goldText}>Every Dreamer</span></h2>
          <div className={styles.storyParas}>
            <p>
              For over a decade, the Arizona Institute of Performing Arts has been the 
              premiere destination for aspiring actors, dancers, and creators. We started 
              with a simple goal: to give every child a platform to discover their innate talent.
            </p>
            <p>
              Our specialized curriculum goes beyond just memorizing lines or steps. We 
              focus on building self-esteem, enhancing communication skills, and eliminating 
              stage fright through completely stress-free, immersive learning environments.
            </p>
            <p>
              Whether it's a school partnership or individual coaching, we infuse every 
              session with joy, creativity, and the undeniable magic of the theater.
            </p>
          </div>
        </motion.div>
        <motion.div className={styles.storyRight} {...fadeUp}>
          <TiltCard className="card-3d">
            <div className={styles.quoteCard}>
              <Quote className={styles.quoteIcon} size={40} />
              <p>"To unleash the hidden artist inside every child, empowering them to conquer any stage life offers."</p>
              <div className={styles.quoteAuthor}>— Our Motivation</div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className={styles.visionMission}>
        <motion.h2 className={styles.centerTitle} {...fadeUp}>Our Guiding Lights</motion.h2>
        <motion.div 
          className={styles.pivotsContainer}
          variants={{ visible: { transition: { staggerChildren: 0.2 }}}}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.pivotCard}>
             <Compass size={40} className={styles.pivotIcon} />
             <h3>The Vision</h3>
             <p>To empower children to develop immense imagination and an unstoppable creative spirit.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.pivotCard}>
             <Flame size={40} className={styles.pivotIcon} />
             <h3>The Mission</h3>
             <p>To mould kids into confident, expressive humans through stress-free, engaging, and magical learning experiences.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. TEAM */}
      <section className={styles.teamSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
           <span className={styles.sectionLabel}>The Directors</span>
           <h2 className={styles.sectionTitle}>Meet The Visionaries</h2>
        </motion.div>
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <TiltCard className="card-3d" style={{ height: '100%' }}>
                <div className={styles.teamCard}>
                  <div className={styles.avatarPlaceholder}>
                    <Users className={styles.avatarIcon} size={40} />
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <div className={styles.rolePill}>{member.role}</div>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ACCOLADES */}
      <section className={styles.accoladesSection}>
        <motion.h2 className={styles.centerTitle} {...fadeUp}>Accolades</motion.h2>
        <div className={styles.accoladesGrid}>
          {[1,2,3,4].map((i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1, duration: 0.5 }}
               viewport={{ once: true, margin: "-50px" }}
             >
               <div className={styles.accoladePhoto}>
                 <div className={styles.photoOverlay}>
                   <p>Excellence Award 20{15+i}</p>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CTA STRIP */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaCard}>
          <motion.h2 {...fadeUp}>Is your child ready for the spotlight?</motion.h2>
          <motion.div {...fadeUp}>
            <Link href="/contact-us" className={styles.ctaBtn}>Contact Our Directors</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
