import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle } from "lucide-react";
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

function MenuPage() {
  const [active, setActive] = useState(menu[0].id);
  const [query, setQuery] = useState("");

  const current = useMemo(() => menu.find((c) => c.id === active)!, [active]);

  const filtered = useMemo(() => {
    if (!query.trim()) return current.items;
    const q = query.toLowerCase();
    return current.items.filter((i) => i.name.toLowerCase().includes(q));
  }, [current, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-accent uppercase tracking-widest text-xs font-medium">
            Our Menu
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold mt-3">
            A Feast of Flavours
          </h1>
          <p className="mt-4 text-secondary-foreground/70 max-w-xl mx-auto">
            From sizzling Arabian grills to comforting Kerala classics — pick
            your craving.
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
              className="w-full bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-accent transition"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max py-1">
            {menu.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`relative px-4 py-4 text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <motion.span
                      layoutId="menu-underline"
                      className="absolute left-2 right-2 -bottom-px h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-2">{current.name}</h2>
          <p className="text-muted-foreground text-sm mb-8">
            {filtered.length} dish{filtered.length === 1 ? "" : "es"}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + query}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((item, i) => (
                <ItemCard key={current.id + item.name} item={item} index={i} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No dishes found.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [portion, setPortion] = useState(0);
  const hasMulti = item.portions.length > 1;
  const current = item.portions[portion];
  const portionLabel = fullPortion(current.label);

  const waText = `Hi! I'd like to order ${item.name}${
    portionLabel ? ` (${portionLabel})` : ""
  } from Chillies Restaurant.`;
  const waUrl = `https://wa.me/919446447755?text=${encodeURIComponent(waText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
      className="card-lift relative bg-card border border-border rounded-2xl p-5 pt-6 flex flex-col"
    >
      {/* Saffron price badge */}
      <span
        className="absolute top-3 right-3 text-white font-bold"
        style={{
          background: "#F39C12",
          fontSize: "13px",
          borderRadius: "999px",
          padding: "3px 10px",
        }}
      >
        ₹{current.price}
      </span>

      <div className="flex items-start gap-2.5 pr-16">
        <span
          className={`mt-1.5 w-3.5 h-3.5 border-2 grid place-items-center shrink-0 ${
            item.veg ? "border-veg" : "border-nonveg"
          }`}
          aria-label={item.veg ? "vegetarian" : "non-vegetarian"}
        >
          <span
            className={`w-1.5 h-1.5 ${item.veg ? "bg-veg" : "bg-nonveg"}`}
          />
        </span>
        <h3 className="font-display font-semibold text-lg leading-tight">
          {item.name}
        </h3>
      </div>

      {hasMulti && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.portions.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPortion(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                portion === i
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-transparent text-muted-foreground border-border hover:border-secondary/40"
              }`}
            >
              {p.label || "Regular"} · ₹{p.price}
            </button>
          ))}
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-lg py-2.5 font-semibold text-white transition hover:opacity-90"
        style={{ background: "#25D366", fontSize: "13px" }}
      >
        <MessageCircle size={15} fill="white" strokeWidth={0} />
        Order on WhatsApp
      </a>
    </motion.div>
  );
}
