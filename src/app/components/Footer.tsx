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
          <p>📞 +91 90566 20545</p>
          <p>📍 All-India Bookings Accepted</p>
          <p>✉️ arrizonaevents@gmail.com</p>
          <p>🌐 www.arrizona.in</p>
          
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <div className={styles.iconBox}>
                <Image src="/socials/insta.png" alt="Instagram" width={24} height={24} />
              </div>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <div className={styles.iconBox}>
                <Image src="/socials/facebook.png" alt="Facebook" width={24} height={24} />
              </div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              <div className={styles.iconBox}>
                <Image src="/socials/images.png" alt="Twitter" width={20} height={20} />
              </div>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
              <div className={styles.iconBox}>
                <Image src="/socials/youtube.jpeg" alt="YouTube" width={28} height={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Arizona Institute of Performing Arts and Event Management</p>
      </div>
    </footer>
  );
}
