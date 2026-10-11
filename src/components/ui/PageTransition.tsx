import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.24 }}
      className="page-content"
    >
      {children}
    </motion.div>
  );
}
