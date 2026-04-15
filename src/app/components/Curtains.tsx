"use client";

import { motion } from "framer-motion";
import styles from "./Curtains.module.css";
import { useEffect, useState } from "react";

export default function Curtains({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open curtains shortly after mount
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.stage}>
      {children}
      
      {/* Left Curtain */}
      <motion.div
        className={`${styles.curtain} ${styles.left}`}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "-100%" : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Right Curtain */}
      <motion.div
        className={`${styles.curtain} ${styles.right}`}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "100%" : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
}
