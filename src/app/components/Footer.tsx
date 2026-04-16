import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.curtainBorder}></div>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h2>ARIZONA INSTITUTE</h2>
          <p style={{fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "1rem"}}>
            Choreography | Theatre | Music | Annual School Functions
          </p>
          <p>Every stage is a canvas. Every student is a storyteller.</p>
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
          <p>📍 Chandigarh, Punjab, INDIA</p>
          <p>✉️ hello@arizonainstitute.art</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Arizona Institute of Performing Arts & Event Management</p>
      </div>
    </footer>
  );
}
