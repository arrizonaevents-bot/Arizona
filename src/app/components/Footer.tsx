import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.curtainBorder}></div>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.brandMain}>
            <div className={styles.logoWrap}>
              <Image 
                src="/img/LOGO.png" 
                alt="Arizona Institute Logo" 
                width={70} 
                height={70} 
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.brandText}>
              <h2 className={styles.footerBrandName}>ARIZONA</h2>
              <p className={styles.fullName}>Institute of Performing Arts and Event Management</p>
            </div>
          </div>
          <p className={styles.services}>
            Choreography | Theatre | Music | Annual School Functions
          </p>
          <p className={styles.tagline}>Every stage is a canvas. Every student is a storyteller.</p>
        </div>
        
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/our-work">Our Work</Link></li>
            <li><Link href="/contact-us">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.contact}>
          <h3>Contact Info</h3>
          <p>📞 +91 99158 48400</p>
          <p>📍 All-India Bookings Accepted</p>
          <p>✉️ arti@arizonaarts.in</p>
          <p>📸 @arizonaarts.official</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Arizona Institute of Performing Arts & Event Management</p>
      </div>
    </footer>
  );
}
