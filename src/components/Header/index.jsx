// Page where the menu is controlled
"use client"
import React, { useState} from 'react';
import Button from '@/components/Button';
import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from '@/components/Nav';

const menu = {
  open: {
    width: "99vw",
    height: "100vh",
    top: "-25px",
    right: "-10px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "3rem",
    height: "2rem",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }
}

export default function Index() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        style={{ borderRadius: isActive ? "0px" : "25px" }} // Apply border-radius only when closed
      >
        <AnimatePresence>
          {isActive && <Nav closeMenu={() => setIsActive(false)} />} {/* Pass toggleMenu as closeMenu */}
        </AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
}
