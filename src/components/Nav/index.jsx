import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { links, footerLinks } from "./data";
import { perspective, slideIn } from "./anim";
import Link from "next/link";

export default function Index({ closeMenu }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href, isDropdown, subLinks } = link;
          
          return (
            <React.Fragment key={`b_${i}`}>
              <div className={styles.linkContainer}>
                <motion.div
                  custom={i}
                  variants={perspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  {isDropdown ? (
                    <div className={styles.dropdownTrigger}>
                      <button 
                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                        className={styles.link}
                      >
                        {title}
                      </button>
                      
                      <AnimatePresence>
                        {openDropdown === i && (
                          <motion.div
                            className={styles.dropdown}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { opacity: 1, height: "auto" },
                              collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            {subLinks.map((subLink, j) => (
                              <motion.a
                                key={`s_${j}`}
                                href={subLink.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: j * 0.1 }}
                                onClick={closeMenu}  
                              >
                                {subLink.title}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a href={href} className={styles.link} onClick={closeMenu}> {/* Close menu on main link click */}
                      {title}
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Add button after Contact link */}
              {title === "Contact" && (
                <div className={styles.linkContainer}>
                  <motion.div
                    custom={i + 1}
                    variants={perspective}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className={styles.buttonWrapper}
                  >
                    <Link href="/contact">
                      <button
                        className="px-6 py-3 text-white"
                        onClick={closeMenu}  
                      >
                        Start Your Project
                      </button>
                    </Link>
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        <motion.div className={styles.footer}>
          {footerLinks.map((link, i) => (
            <motion.a
              key={`f_${i}`}
              href={link.href}
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {link.title}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
