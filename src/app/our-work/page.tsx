"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { X, Play, Briefcase, Zap } from "lucide-react";
import Image from "next/image";
import TiltCard from "../components/TiltCard";

export default function OurWork() {
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);

  const schoolData = [
    { name: "Sacred Heart Sen Sec School", area: "Sarabha Nagar", city: "Ludhiana", state: "Punjab", logo: "/schllogos/1.png" },
    { name: "Vardhman International School", area: "Chhd. Road", city: "Ludhiana", state: "Punjab", logo: "/schllogos/2.png" },
    { name: "Ryan International School", area: "Dugri", city: "Ludhiana", state: "Punjab", logo: "/schllogos/3.png" },
    { name: "Satyug Darshan Vidyalaya", area: "Faridabad", city: "Faridabad", state: "Haryana", logo: "/schllogos/4.png" },
    { name: "Adarsh Public High School", area: "Civil Lines", city: "Ludhiana", state: "Punjab", logo: "/schllogos/5.png" },
    { name: "DAV Public School", area: "Pakhowal Road", city: "Ludhiana", state: "Punjab", logo: "/schllogos/6.png" },
    { name: "Max Arthur Macauliffe Public School", area: "Samrala", city: "Ludhiana", state: "Punjab", logo: "/schllogos/7.png" },
    { name: "JMK International School", area: "Pathankot", city: "Pathankot", state: "Punjab", logo: "/schllogos/9.png" },
    { name: "Pratap World School", area: "Pathankot", city: "Pathankot", state: "Punjab", logo: "/schllogos/10.png" },
    { name: "Modern Sandeepni Public School", area: "Pathankot", city: "Pathankot", state: "Punjab", logo: "/schllogos/11.png" },
    { name: "St. Joseph Convent School", area: "Bathinda", city: "Bathinda", state: "Punjab", logo: "/schllogos/12.png" },
    { name: "Guru Nanak Public School", area: "Model Town", city: "Ludhiana", state: "Punjab", logo: "/schllogos/13.png" },
    { name: "Sacred Soul Convent School", area: "Ludhiana", city: "Ludhiana", state: "Punjab", logo: "/schllogos/14.png" },
    { name: "St Thomas Sen Sec School", area: "Ludhiana", city: "Ludhiana", state: "Punjab", logo: "/schllogos/15.png" },
    { name: "Gurunanak Public School KG Wing", area: "Model Town", city: "Ludhiana", state: "Punjab", logo: "/schllogos/16.png" },
    { name: "Mount International Public School", area: "Doraha", city: "Ludhiana", state: "Punjab", logo: "/schllogos/17.png" },
    { name: "BCM Cambridge Model Town", area: "Ludhiana", city: "Ludhiana", state: "Punjab", logo: "/schllogos/18.png" },
    { name: "Gurukul Sandeepni School", area: "Pathankot", city: "Pathankot", state: "Punjab", logo: "/schllogos/19.png" },
    { name: "CFC Public Sen Sec School", area: "BRS Nagar", city: "Ludhiana", state: "Punjab", logo: "/schllogos/20.png" },
  ];

  const schools = schoolData.map((s, i) => ({
    id: i,
    name: s.name,
    logo: s.logo,
    city: `${s.area}, ${s.city}, ${s.state}`,
    description: `We delivered massive annual productions at ${s.name}, coordinating comprehensive event execution and talent grooming for ${120 + i * 15} students.`,
    impact: ["End-to-End Execution", "Stage Management", "Talent Grooming"]
  }));

  const skills = [
    "Event Planning", "Stage & Concept Design", "School Annual Days", "Sports Day", "Graduation Ceremony", "Theatre Workshops",
    "Talent Grooming", "Production Management", "Thematic Costumes", "Choreography",
    "Showstopper Props", "Sound & Lighting",
    "Backstage Coordination", "Experiential Programs", "Media Collaborations"
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={styles.heroContent}
        >
          <div className={styles.label}>The Portfolio</div>
          <h1>Stages We&apos;ve <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Transformed</span></h1>
          <p>Collaborating with 100+ premier institutions.</p>
        </motion.div>
      </section>

      {/* 2. STATS BAR */}
      <section className={styles.statsBar}>
        <motion.div
          className={styles.statsContainer}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.statBlock}>
            <h3>100+</h3><p>Schools</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.statBlock}>
            <h3>14</h3><p>Skills</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.statBlock}>
            <h3>10+</h3><p>Years</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.statBlock}>
            <h3>10,000+</h3><p>Students</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. SCHOOLS GRID */}
      <section className={styles.schoolsSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Our Work With Schools</h2>
        </motion.div>
        <div className={styles.schoolsGrid}>
          {schools.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <TiltCard className="card-3d" style={{ height: '100%' }}>
                <div
                  className={styles.schoolCard}
                >
                  <div className={styles.logoWrapper}>
                    <Image
                      src={school.logo}
                      alt={school.name}
                      fill
                      sizes="100px"
                      className={styles.logoImage}
                    />
                  </div>
                  <h3>{school.name}</h3>
                  <p>{school.city}</p>
                  <div className={styles.cardGlow}></div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DELIVERY MODULES */}
      <section className={styles.deliverySection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Our Methodology</h2>
        </motion.div>
        <div className={styles.stepContainer}>
          {[
            { num: "01", title: 'Creative Ideation', desc: 'Developing bespoke thematic concepts.', icon: <Briefcase size={30} className={styles.stepIcon} /> },
            { num: "02", title: 'Talent Grooming', desc: 'Intensive performance preparation for students.', icon: <Play size={30} className={styles.stepIcon} /> },
            { num: "03", title: 'Stage & Tech Setup', desc: 'Handling all stage, sound, and lighting needs.', icon: <Zap size={30} className={styles.stepIcon} /> },
            { num: "04", title: 'Grand Execution', desc: 'Directing full-scale flawless Annual Day Events.', icon: <Zap size={30} className={styles.stepIcon} /> }
          ].map((mode, i) => (
            <motion.div
              key={mode.num}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ flex: 1 }}
            >
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{mode.num}</span>
                  {mode.icon}
                </div>
                <h3>{mode.title}</h3>
                <p>{mode.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SKILLS OFFERED */}
      <section className={styles.skillsSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <h2>Our Expertise</h2>
        </motion.div>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => {
            const isHighlighted = ["School Annual Days", "Sports Day", "Graduation Ceremony", "Theatre Workshops"].some(kw => skill.toLowerCase().includes(kw.toLowerCase()));
            return (
              <motion.div
                key={skill}
                className={styles.skillPill}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                animate={isHighlighted ? { 
                  boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 15px rgba(212,175,55,0.6)", "0 0 0px rgba(212,175,55,0)"],
                  borderColor: ["rgba(212,175,55,0.2)", "rgba(212,175,55,1)", "rgba(212,175,55,0.2)"],
                  color: ["var(--color-text-secondary)", "var(--color-gold)", "var(--color-text-secondary)"]
                } : {}}
                {...(isHighlighted ? { transition: { duration: 2, repeat: Infinity } } : {})}
              >
                {skill}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. CTA */}
      <section className={styles.ctaStrip}>
        <motion.h2 {...fadeUp}>Ready to transform your stage?</motion.h2>
        <motion.div {...fadeUp}>
          <a href="/contact-us" className={styles.btnPrimaryLg}>Initiate Dialogue</a>
        </motion.div>
      </section>
    </main>
  );
}
