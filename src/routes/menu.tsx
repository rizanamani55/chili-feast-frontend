import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { menu, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Chillies Restaurant" },
      { name: "description", content: "Explore our full menu: Arabian Grill, Broast, Shawarma, Biriyani, Seafood, Vegetarian and more." },
      { property: "og:title", content: "Menu — Chillies Restaurant" },
      { property: "og:description", content: "Arabian Grill, Broast, Shawarma, Biriyani and more." },
    ],
  }),
  component: MenuPage,
});

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
                <ItemCard key={item.name} item={item} index={i} />
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
      className="card-lift bg-card border border-border rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 flex-1">
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
        <span className="bg-primary/10 text-primary font-semibold text-sm px-3 py-1 rounded-full shrink-0">
          ₹{current.price}
        </span>
      </div>

      {hasMulti && (
        <div className="mt-4 flex gap-1.5">
          {item.portions.map((p, i) => (
            <button
              key={i}
              onClick={() => setPortion(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                portion === i
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-transparent text-muted-foreground border-border hover:border-secondary/40"
              }`}
            >
              {p.label} · ₹{p.price}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
