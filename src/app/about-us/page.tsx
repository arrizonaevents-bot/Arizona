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
      bio: "A visionary founder bringing a refined creative vision where professionalism meets passion."
    },
    { 
      name: "Gurmeet Singh Mitwa", 
      role: "Actor & Theatre Director, 30+ Bollywood films",
      bio: "An industry veteran enriching every project with real-world exposure to television, film, and stage."
    },
    { 
      name: "Darshan Singh", 
      role: "Scriptwriter & Theatre Director, 20+ stage plays",
      bio: "Expert in stage dynamics and storytelling, turning potential challenges into perfectly executed moments."
    },
    { 
      name: "Krishan Kant Dang", 
      role: "Celebrity Anchor, Newsreader, Zee Punjabi/PTC",
      bio: "Guided by strong media expertise to help students connect with audiences and embrace storytelling."
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
            Crafting Experiences. <br /><span className={styles.goldText}>Building Confidence.</span>
          </motion.h1>
          <motion.div className={styles.breadcrumb} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/" className={styles.crumbLink}>Home</Link> <span className={styles.crumbSep}>/</span> <span className={styles.crumbActive}>About</span>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className={styles.storySection}>
        <motion.div className={styles.storyLeft} {...fadeUp}>
          <h2 className={styles.sectionTitle}>Where <span className={styles.goldText}>Talent</span> Meets The Stage</h2>
          <div className={styles.storyParas}>
            <p>
              At Arizona Institute of Performing Arts & Event Management, we believe that 
              every stage is more than just a platform—it is a space where confidence is built, 
              creativity finds its voice, and stories come alive. Led by a visionary Director with a 
              deep-rooted passion for the performing arts, Arizona reflects a unique blend of 
              artistic excellence, discipline, and imaginative expression.
            </p>
            <p>
              From Sports Days and Annual Functions to Graduation Ceremonies, we take complete 
              ownership—from ideation to execution—ensuring every moment is meaningful and 
              flawlessly delivered. Our approach is not transactional; it is transformational. 
              We believe every school event is an opportunity to inspire, engage, and elevate.
            </p>
            <p>
              Our strength lies in our exceptional team of professional choreographers, theatre 
              practitioners, and music experts who bring global standards to every project. Together, 
              we create performances that are not only visually compelling but emotionally resonant.
            </p>
          </div>
        </motion.div>
        <motion.div className={styles.storyRight} {...fadeUp}>
          <TiltCard className="card-3d">
            <div className={styles.quoteCard}>
              <Quote className={styles.quoteIcon} size={40} />
              <p>"Every stage is a canvas, every student is a storyteller, and every event is an opportunity to create something extraordinary."</p>
              <div className={styles.quoteAuthor}>— Our Creative Philosophy</div>
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
             <h3>Learning Through Expression</h3>
             <p>Our programs help children discover hidden talents and unlock their potential through acting, voice modulation, and movement.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className={styles.pivotCard}>
             <Flame size={40} className={styles.pivotIcon} />
             <h3>Transformational Impact</h3>
             <p>Preparing students to think, lead, and shine as self-assured individuals through stress-free, magical learning experiences.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. OFFERINGS & REACH */}
      <section className={styles.offeringsSection}>
        <motion.div className={styles.offeringsHeader} {...fadeUp}>
           <span className={styles.sectionLabel}>Our Reach</span>
           <h2 className={styles.sectionTitle}>More Than <span className={styles.goldText}>Just Events</span></h2>
        </motion.div>
        
        <div className={styles.offeringsGrid}>
          <motion.div className={styles.offeringsText} {...fadeUp}>
            <p>
              Arizona’s influence extends far beyond event management. We conduct structured 
              theatre and performing arts programs integrated directly within **school timetables**, 
              **after-school clubs**, **studio sessions**, and specialized **workshops**.
            </p>
            <p>
              Each session is meticulously designed to ensure holistic development in a 
              stress-free environment, integrating:
            </p>
            <ul className={styles.offeringsList}>
              <li>Actively engaging Dialogue Delivery & Voice Modulation</li>
              <li>Imaginative Creative Writing & Improvisation</li>
              <li>Body Movement & Strategic Stage Presence</li>
            </ul>
            <p>
              Through our **play-production-oriented approach**, even our youngest learners 
              gain the confidence to perform live, connect with audiences, and embrace 
              the timeless art of storytelling.
            </p>
          </motion.div>
          <motion.div className={styles.offeringsVisual} {...fadeUp}>
            <TiltCard className="card-3d">
              <div className={styles.highlightsCard}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightNumber}>50+</div>
                  <div className={styles.highlightLabel}>Original Themes</div>
                </div>
                <hr className={styles.highlightDivider} />
                <div className={styles.highlightItem}>
                  <div className={styles.highlightNumber}>Artistry</div>
                  <div className={styles.highlightLabel}>Beyond Performance</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* 5. TEAM */}
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
