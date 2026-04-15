"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Our Work", path: "/our-work" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <Image src="/img/LOGO.png" alt="AIPA Logo" width={50} height={50} priority />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className={styles.desktopNav}>
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link href={link.path} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>

        {/* Mobile Nav Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Menu">
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNav}>
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link href={link.path} className={`${styles.mobileNavLink} ${isActive ? styles.active : ""}`} onClick={toggleMenu}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
