"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

const ContentLayout = ({ children, className }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={clsx(
        "shadow-lg rounded-xl w-auto h-auto will-transform",
        className
      )}
      
      
    >
      {children}
    </motion.div>
  );
};

export default ContentLayout;
