import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, ChevronUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { menu, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Full Menu with Prices — Chillies Restaurant Kerala" },
      { name: "description", content: "Browse the complete Chillies Restaurant menu: Arabian Grill, Broast, Seafood, Beef, Chicken, Vegetarian, Noodles, Biriyani and more with prices in ₹." },
      { property: "og:title", content: "Full Menu with Prices — Chillies Restaurant Kerala" },
      { property: "og:description", content: "Arabian Grill, Broast, Shawarma, Biriyani, Seafood & more — full menu with ₹ prices." },
    ],
  }),
  component: MenuPage,
});

const PORTION_FULL: Record<string, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  Q: "Quarter",
};

function fullPortion(label: string) {
  if (!label) return "";
  return PORTION_FULL[label] ?? label;
}

const gridVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function MenuPage() {
  const [active, setActive] = useState(menu[0].id);
  const [query, setQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = useMemo(() => menu.find((c) => c.id === active)!, [active]);

  const filtered = useMemo(() => {
    if (!query.trim()) return current.items;
    const q = query.toLowerCase();
    return current.items.filter((i) => i.name.toLowerCase().includes(q));
  }, [current, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold">
            Our Menu
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3 text-cream">
            A Feast of Flavours
          </h1>
          <p className="mt-4 text-secondary-foreground/70 max-w-xl mx-auto leading-relaxed">
            From sizzling Arabian grills to comforting Kerala classics — pick your craving.
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-foreground/50"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-accent transition text-cream"
            />
          </div>
        </div>
      </section>

      {/* Pill-shaped Category filter tabs with sliding layout animation */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3.5">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none py-1">
            {menu.map((cat) => {
              const isActive = cat.id === active;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-visible cursor-pointer
                    ${isActive ? "text-white" : "text-muted-foreground hover:text-foreground bg-transparent border border-muted-foreground/20"}
                  `}
                >
                  {/* Sliding active tab background */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#C0392B] rounded-full z-0 shadow-lg shadow-[#C0392B]/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Menu Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-foreground">
            {current.name}
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            {filtered.length} delicious dish{filtered.length === 1 ? "" : "es"} available
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + query}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={current.id + item.name + i}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-16">
                  <p className="text-lg font-medium">No dishes match your search.</p>
                  <p className="text-sm mt-1">Try typing something else or check another category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {scrollY > 200 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 z-40 w-12 h-12 rounded-full bg-[#C0392B] text-white flex items-center justify-center shadow-2xl hover:bg-[#C0392B]/90 transition cursor-pointer animate-pulse-load"
            aria-label="Scroll to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function ItemCard({ item }: { item: MenuItem }) {
  const [portion, setPortion] = useState(0);
  const hasMulti = item.portions.length > 1;
  const current = item.portions[portion];
  const portionLabel = fullPortion(current.label);

  const waText = `Hi! I'd like to order ${item.name}${
    portionLabel ? ` (${portionLabel})` : ""
  } from Chillies Restaurant.`;
  const waUrl = `https://wa.me/919446447755?text=${encodeURIComponent(waText)}`;

  return (
    <div className="h-full bg-white border border-border/10 rounded-xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer flex flex-col justify-between relative overflow-hidden group">
      {/* Saffron absolute Price Badge in top-right pill */}
      <span
        className="absolute top-3.5 right-3.5 text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm z-10"
        style={{
          background: "#F39C12",
        }}
      >
        ₹{current.price}
      </span>

      <div className="flex items-start gap-3">
        {/* Strict 4x4px Veg/Non-veg filled indicator left of the item name */}
        <div className="mt-2 shrink-0">
          <div
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: item.veg ? "#27AE60" : "#C0392B",
            }}
            className="rounded-sm shadow-sm"
          />
        </div>

        <div className="flex-1 pr-14">
          <h3 className="font-display font-semibold text-[15px] text-foreground leading-snug">
            {item.name}
          </h3>

          {/* Portion selections (retained business rule) */}
          {hasMulti && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {item.portions.map((p, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card-click
                    setPortion(i);
                  }}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer font-medium
                    ${portion === i
                      ? "bg-[#C0392B] text-white border-[#C0392B] shadow-sm shadow-[#C0392B]/20"
                      : "bg-transparent text-muted-foreground border-muted-foreground/20 hover:bg-muted/10 hover:text-foreground"
                    }
                  `}
                >
                  {p.label || "Regular"} · ₹{p.price}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order button (retained WhatsApp feature) */}
      <div className="mt-5 pt-3 border-t border-border/5">
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // prevent card click
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C0392B] hover:bg-[#a63024] text-white text-xs font-semibold shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
        >
          <MessageCircle size={13} fill="white" strokeWidth={0} />
          Order on WhatsApp
        </motion.a>
      </div>
    </div>
  );
}
