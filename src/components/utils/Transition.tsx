'use client';

import { motion } from "framer-motion";

export default function Transition({
  children,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      {...props}
    >
      { children }
    </motion.main>
  )
}