"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./Navbar.module.css";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const pathname                   = usePathname();
  const { theme, toggleTheme }     = useTheme();

  const { scrollY } = useScroll();

  // Optimized scroll tracking using Motion's internal RAF
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40 && !scrolled) setScrolled(true);
    if (latest <= 40 && scrolled) setScrolled(false);
  });

  const links = [
    { name: "Home",       path: "/" },
    { name: "About Us",   path: "/about-us" },
    { name: "Our Work",   path: "/our-work" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className={styles.inner}>

        {/* ── Brand / Logo ── */}
        <Link href="/" className={styles.brand} aria-label="Arizona Institute Home">
          {/* Use a wrapper div with fixed dimensions so Next.js Image never warns */}
          <div className={styles.logoImgWrap}>
            <Image
              src="/img/LOGO.png"
              alt="Arizona Institute of Performing Arts Logo"
              fill
              sizes="44px"
              priority
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>ARIZONA</span>
            <span className={styles.brandSub}>Institute of Performing Arts</span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className={styles.desktopNav}>
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name} className={styles.navItem}>
                <Link
                  href={link.path}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      className={styles.activePip}
                      layoutId="nav-pip"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={styles.iconBtn}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link href="/contact-us" className={styles.ctaBtn}>
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className={styles.mobileNav}>
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`${styles.mobileLink} ${pathname === link.path ? styles.mobileActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
