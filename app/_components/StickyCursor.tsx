"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const innerX = useSpring(x, { stiffness: 600, damping: 30 });
  const innerY = useSpring(y, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>

      <motion.div
        className="cursor-inner md:block hidden w-8 h-8  backdrop-blur-xl border border-white group
         shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]  "
        style={{
          x: innerX,
          y: innerY,
        }}
      >

        <img src="/Images/cursor.png" className="cursor-img" />
      </motion.div>
    </>
  );
}
