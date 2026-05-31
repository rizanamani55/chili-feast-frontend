import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/#branches", label: "Branches" },
    { to: "/#about", label: "About" },
    { to: "/#gallery", label: "Gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(20,8,5,0.92)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg group-hover:rotate-12 transition">
            <Flame size={18} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-cream">
            Chillies
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <li key={l.to}>
              {l.to.startsWith("/#") ? (
                <a href={l.to} className="nav-link text-cream/90 hover:text-primary py-1 block">
                  {l.label}
                </a>
              ) : (
                <Link to={l.to} className="nav-link text-cream/90 hover:text-primary py-1 block">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="tel:+917025222260"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20 animate-pulse-load"
          >
            Order Now <span className="wiggle-emoji">🌶</span>
          </a>
        </div>

        {/* Hamburger trigger */}
        <button
          className="md:hidden p-2 rounded-md text-cream hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Slide-in drawer from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed right-0 top-0 bottom-0 h-full w-[80vw] max-w-[300px] bg-[#1a0a05] text-cream z-50 flex flex-col shadow-2xl border-l border-white/5"
            >
              {/* Header inside drawer */}
              <div className="px-6 py-5 flex justify-between items-center border-b border-white/10">
                <span className="font-display text-xl font-bold tracking-tight text-primary">
                  Chillies
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-cream transition"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="px-6 py-8 flex flex-col gap-6 flex-1 overflow-y-auto">
                {links.map((l) => (
                  <a
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-cream/80 hover:text-primary transition py-2 border-b border-white/5"
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href="tel:+917025222260"
                  className="group mt-6 inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition animate-pulse-load"
                >
                  Order Now <span className="wiggle-emoji">🌶</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
