import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingMenuCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="md:hidden fixed left-1/2 -translate-x-1/2 z-40"
          style={{
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
          }}
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-white font-semibold rounded-full px-6 py-3 shadow-lg"
            style={{ background: "#C0392B" }}
          >
            View Menu 🍽
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
