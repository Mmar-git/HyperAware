import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  // Simulate progress (you can replace this with real logic)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2; // Increment progress by 2% every 100ms
        }
        clearInterval(interval); // Stop once 100% is reached
        return 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loader}>
      <div className={styles.logo}>
        <Image src="/Logo.png" alt="Logo" width={700} height={700} />
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }} // Update width based on progress
        />
      </div>
    </div>
  );
};

export default Loader;
