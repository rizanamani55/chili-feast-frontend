import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg group-hover:rotate-12 transition">
            <Flame size={18} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Chillies
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={l.to}
                className="text-foreground/80 hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="tel:+917025222260"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20"
          >
            Order Now
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+917025222260"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium text-center"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
