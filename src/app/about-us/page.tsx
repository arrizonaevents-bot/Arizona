"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import TiltCard from "../components/TiltCard";
import TheaterMasksBackground from "../components/TheaterMasksBackground";
import { Compass, Flame, Users, Quote } from "lucide-react";

export default function AboutUs() {
  const team = [
    {
      name: "Gurmeet Singh Mitwa",
      role: "Actor & Theatre Director",
      bio: "Acted in more than 30 Bollywood films",
    },
    {
      name: "Darshan Singh",
      role: "Scriptwriter & Theatre Director",
      bio: "Directed more than 20 stage plays, worked with various TV channels and Production Houses",
    }
  ];

  const AWARD_IMAGES = [
    { src: "/awards/236.png", title: "Excellence in Choreography" },
    { src: "/awards/238.png", title: "Outstanding Stage Presence" },
    { src: "/awards/240.png", title: "Creative Direction Award" },
    { src: "/awards/242.png", title: "Best Theatrical Production" },
    { src: "/awards/244.png", title: "Holistic Event Execution" },
    { src: "/awards/246.png", title: "Community Impact Recognition" },
  ];

  const founder = {
    name: "Arti Dang",
    role: "Founder & Director",
    bio: [
      "Arti is the creative force and Founding Director of Arizona Institute of Performing Arts and Event Management—redefining the scope of school productions. Backed by a Master’s in Theatre from Punjab University, along with a B.Ed and a Master’s in English Literature from the University of Jammu, she brings a strong blend of academic rigor and artistic vision.",
      "With over a decade of experience across classical Indian dance, contemporary performance, and cinematic storytelling, she has conceptualized and directed 150+ large-scale school productions across North India—each balancing artistic excellence with meaningful student impact.",
      "With a strong foundation in event production, Arti uses choreography and performance as tools for self-expression, enabling students to explore their inner worlds and move beyond performance into self-discovery.",
      "A committed educator and mentor, she is known for building confidence, discipline, and creativity in young performers. Under her leadership, the institute has become synonymous with productions that are not just impressive, but transformative."
    ],
    quote: "A great performance is not measured by the applause at the end—it is measured by the confidence a student carries for the rest of their life."
  };

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
        <TheaterMasksBackground opacity={0.15} position="left" offsetX="15vw" offsetY="20px" />
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
              At Arizona Institute of Performing Arts and Event Management, we believe that
              every stage is more than just a platform—it is a space where confidence is built,
              creativity finds its voice, and stories come alive. Led by a visionary Director with a
              deep-rooted passion for premium event production, Arizona reflects a unique blend of
              excellence, discipline, and imaginative expression.
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
              <p>"{founder.quote}"</p>
              <div className={styles.quoteAuthor}>— Arti, Founder & Director</div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className={styles.visionMission}>
        <motion.h2 className={styles.centerTitle} {...fadeUp}>Our Guiding Lights</motion.h2>
        <motion.div
          className={styles.pivotsContainer}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.pivotCard}>
            <Compass size={40} className={styles.pivotIcon} />
            <h3>Learning Through Expression</h3>
            <p>Our programs help children discover hidden talents and unlock their potential through acting, voice modulation, and movement.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className={styles.pivotCard}>
            <Flame size={40} className={styles.pivotIcon} />
            <h3>Transformational Impact</h3>
            <p>Preparing students to think, lead, and shine as self-assured individuals through stress-free, magical learning experiences.</p>
          </motion.div>
        </motion.div>
      </section>


      {/* 5. TEAM */}
      <section className={styles.teamSection}>
        <motion.div className={styles.sectionHeader} {...fadeUp}>
          <span className={styles.sectionLabel}>The Leadership</span>
          <h2 className={styles.sectionTitle}>Meet The Visionaries</h2>
        </motion.div>

        {/* Founder Section */}
        <motion.div className={styles.founderSection} {...fadeUp}>
          <div className={styles.founderContent}>
            <div className={styles.founderText}>
              <div className={styles.rolePill}>{founder.role}</div>
              <h3 className={styles.founderName}>{founder.name}</h3>
              <div className={styles.founderBio}>
                {founder.bio.map((para, i) => (
                  <p key={i} className={styles.bioPara}>{para}</p>
                ))}
              </div>
            </div>
            <div className={styles.founderVisual} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <TiltCard className="card-3d" style={{ width: "100%", maxWidth: "380px" }}>
                <div style={{ position: "relative", width: "100%", minWidth: "min(100%, 280px)", aspectRatio: "3/4", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.3)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                  <Image src="/AartiDang.jpeg" alt="Arti Dang" fill style={{ objectFit: "cover", objectPosition: "center bottom", transform: "scale(1.55)", transformOrigin: "center 85%", transition: "transform 0.5s ease" }} />
                </div>
              </TiltCard>
              <div className={styles.quoteAuthor} style={{ marginTop: "1.5rem" }}>— Arti, Founder &amp; Director</div>
            </div>
          </div>
        </motion.div>

        {/* Additional Leadership */}
        <motion.div className={styles.teamGrid} {...fadeUp}>
          {team.map((member, i) => (
            <TiltCard key={i} className="card-3d" style={{ height: "100%" }}>
              <div className={styles.teamCard}>
                <div className={styles.avatarPlaceholder}>
                  <Users size={32} className={styles.avatarIcon} />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <div className={styles.rolePill}>{member.role}</div>
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            </TiltCard>
          ))}
        </motion.div>      </section>

      {/* 6. ACCOLADES */}
      <section className={styles.accoladesSection}>
        <motion.h2 className={styles.centerTitle} {...fadeUp}>Accolades</motion.h2>
        <div className={styles.accoladesGrid}>
          {AWARD_IMAGES.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <TiltCard className="card-3d" style={{ width: "100%", height: "100%" }} disabled>
                <div className={styles.accoladePhoto}>
                  <Image
                    src={award.src}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={styles.awardImage}
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.photoOverlay}>
                    <p>{award.title}</p>
                  </div>
                </div>
              </TiltCard>
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
