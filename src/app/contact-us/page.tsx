"use client";

import styles from "./page.module.css";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { MapPin, Presentation, Briefcase, Zap, Play } from "lucide-react";
import TiltCard from "../components/TiltCard";
import TheaterMasksBackground from "../components/TheaterMasksBackground";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "Parent",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string | null }>({
    type: null,
    message: null
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: null }), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        showNotification("success", "Success! Your message has been sent to Arizona Arts. We will get back to you shortly.");
        
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF', '#8C7323', '#C0C0C0'] 
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiry: "Parent",
          message: ""
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      showNotification("error", "Oops! Something went wrong. Please try again or contact us via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "circOut" as const }
  };

  return (
    <main className={styles.main}>
      {/* Custom Notification Toast */}
      <AnimatePresence>
        {status.type && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
            className={`${styles.notification} ${styles[status.type]}`}
          >
            {status.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 1. PAGE HERO */}
      <section className={styles.heroSection}>
        <TheaterMasksBackground opacity={0.18} position="left" offsetX="15vw" />
        <div className={styles.ambientGlow}></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <div className={styles.label}>Connect</div>
          <h1>Let's Create <span className={styles.goldText}>Together</span></h1>
          <p>School bookings for 2026 are now open. Reserve your slot for Annual Days, Sports Meets, and Cultural Programs.</p>
        </motion.div>
      </section>

      {/* 2. CONTACT SPLIT */}
      <section className={styles.contactSplit}>
        <div className={styles.splitContainer}>
          
          {/* Left: Form */}
          <motion.div className={styles.formCol} {...fadeUp}>
            <div className={styles.formBorderLayer}>
              <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    className={styles.inputField} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com" 
                    className={styles.inputField} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" 
                    className={styles.inputField} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Inquiry Type</label>
                  <select 
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className={styles.inputField}
                  >
                    <option value="School Principal" className={styles.opt}>School Principal</option>
                    <option value="School Coordinator" className={styles.opt}>School Coordinator</option>
                    <option value="Parent" className={styles.opt}>Parent</option>
                    <option value="Individual" className={styles.opt}>Individual</option>
                    <option value="Other" className={styles.opt}>Other</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    placeholder="Detail your specific requirement..." 
                    className={styles.inputField} 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={styles.submitBtn} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Transmitting..." : "Send Transmission"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Info Card */}
          <motion.div className={styles.infoCol} {...fadeUp}>
            <TiltCard className="card-3d">
              <div className={styles.infoCard}>
                <h3>Direct Lines</h3>
                <ul>
                  <li>📧 arti@arizonaarts.in</li>
                  <li>📸 @arizonaarts.official</li>
                  <li>📍 All-India Bookings Accepted</li>
                  <li>👤 Director: Arti Arizona</li>
                </ul>
                <div className={styles.note}>
                  * High-priority responses reserved for direct school inquiries.
                </div>
              </div>
            </TiltCard>

            <div className={styles.socialRow}>
              <a href="#" className={styles.socialCircle}>IG</a>
              <a href="#" className={styles.socialCircle}>FB</a>
              <a href="#" className={styles.socialCircle}>YT</a>
              <a href="#" className={styles.socialCircle}>WA</a>
            </div>

            <div className={styles.contactLogoWrap}>
              <Image 
                src="/img/LOGO.png" 
                alt="Arizona Institute Logo" 
                width={300} 
                height={300} 
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DELIVERY MODES REMINDER */}
      <section className={styles.modesReminder}>
        <motion.div 
          className={styles.cardsRow}
          variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {[ 
            { icon: <Briefcase size={30} className={styles.rIcon} />, title: "Curriculum" },
            { icon: <Play size={30} className={styles.rIcon} />, title: "After-School" },
            { icon: <Presentation size={30} className={styles.rIcon} />, title: "Studios" },
            { icon: <Zap size={30} className={styles.rIcon} />, title: "Workshops" }
          ].map((mode, i) => (
             <motion.div key={i} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }}}>
               <TiltCard className="card-3d" style={{ height: '100%' }}>
                 <div className={styles.reminderCard}>
                   {mode.icon}
                   <h4>{mode.title}</h4>
                 </div>
               </TiltCard>
             </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. MAP SECTION */}
      <section className={styles.mapSection}>
        <motion.h2 className={styles.sectionTitleCenter} {...fadeUp}>The Headquarters</motion.h2>
        <motion.div className={styles.mapEmbed} {...fadeUp}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02912912445!2d75.76073748232204!3d30.90047395027585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837461643975%3A0x1338d15197825442!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1714154400000!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(1.2)" }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
        <motion.div className={styles.addressCard} {...fadeUp}>
          <MapPin size={30} className={styles.pinIcon} />
          <div>
            <strong>Base of Operations</strong>
            <p>Ludhiana, Punjab, INDIA</p>
          </div>
        </motion.div>
      </section>

      {/* 5. FINAL CTA */}
      <section className={styles.finalCta}>
        <motion.div className={styles.ctaContent} {...fadeUp}>
          <h2 className={styles.quote}>"Every child is a star waiting for their spotlight."</h2>
          <div className={styles.actionBtns}>
            <a href="#" className={styles.btnOutlineGold}>Message on WhatsApp</a>
            <a href="#" className={styles.btnPrimaryLg}>Direct Dial</a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
