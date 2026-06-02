import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function Typewriter({
  phrases,
  delayBetween = 3000,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, delayBetween);
    return () => clearInterval(timer);
  }, [phrases, delayBetween]);

  return (
    <span className="inline-grid relative overflow-hidden align-bottom py-1 -my-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "120%", opacity: 0, filter: "blur(10px)", rotateX: -30 }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0 }}
          exit={{ y: "-120%", opacity: 0, filter: "blur(10px)", rotateX: 30 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 15,
            mass: 1 
          }}
          className="col-start-1 row-start-1 bg-gradient-to-r from-green-600 via-[#25D366] to-teal-600 bg-clip-text text-transparent pb-1 pr-2"
          style={{ transformOrigin: "center" }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
