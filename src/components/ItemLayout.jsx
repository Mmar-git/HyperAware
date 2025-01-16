"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

const ItemLayout = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Use opacity and translate for lightweight animation
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth easing for better performance
      viewport={{ once: true, margin: "-50px" }} // Trigger earlier to prevent sudden animation
      className={clsx(
        "glass p-6 sm:p-8 rounded-xl flex flex-col items-start justify-start space-y-4 w-auto h-auto min-w-[150px] min-h-[100px] box-border",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default ItemLayout;
