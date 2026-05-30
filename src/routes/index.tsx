import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone, UtensilsCrossed, Users, Store } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingMenuCta } from "@/components/FloatingMenuCta";

const RESTAURANT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Chillies Restaurant",
  url: "https://www.chiliesgroup.com",
  servesCuisine: ["Kerala", "Arabian", "Chinese"],
  priceRange: "₹₹",
  location: [
    { "@type": "Place", name: "Pulikkalodi", telephone: "+917025222260" },
    { "@type": "Place", name: "Anchachavidi", telephone: "+918943608000" },
    { "@type": "Place", name: "Wandoor", telephone: "+918606186666" },
    { "@type": "Place", name: "Thiruvali", telephone: "+916239100600" },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chillies Restaurant Kerala — Arabian Grill, Broast & Biriyani" },
      { name: "description", content: "Kerala's favourite restaurant chain. 4 branches in Malappuram — Pulikkalodi, Anchachavidi, Wandoor, Thiruvali. Known for Al Faham, Broast, Biriyani & Shawarma." },
      { property: "og:title", content: "Chillies Restaurant Kerala — Arabian Grill, Broast & Biriyani" },
      { property: "og:description", content: "Kerala's favourite restaurant chain serving Al Faham, Broast, Biriyani & Shawarma across 4 Malappuram branches." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(RESTAURANT_JSONLD),
      },
    ],
  }),
  component: HomePage,
});

const branches = [
  { name: "Pulikkalodi", phone: "702 522 2260", tel: "+917025222260" },
  { name: "Anchachavidi", phone: "894 360 8000", tel: "+918943608000" },
  { name: "Wandoor", phone: "860 618 6666", tel: "+918606186666" },
  { name: "Thiruvali", phone: "6239 100 600", tel: "+916239100600" },
];

const gallery = [
  { id: "1", src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800", h: "tall" },
  { id: "2", src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", h: "short" },
  { id: "3", src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800", h: "tall" },
  { id: "4", src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", h: "short" },
  { id: "5", src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800", h: "short" },
  { id: "6", src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800", h: "tall" },
  { id: "7", src: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800", h: "short" },
  { id: "8", src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800", h: "tall" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Branches />
      <Gallery />
      <Footer />
      <FloatingMenuCta />
    </div>
  );
}

function Hero() {
  const title = "Deliciously Yours";
  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 via-secondary/70 to-secondary/95" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="uppercase tracking-[0.4em] text-accent text-xs sm:text-sm mb-6 font-medium"
        >
          Chillies Restaurant · Kerala
        </motion.p>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] text-balance">
          {title.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block mr-4 overflow-hidden">
              {word.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.4 + wi * 0.15 + i * 0.04,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 text-cream/80 text-lg max-w-xl mx-auto"
        >
          Sizzling Arabian Grill, golden Broast, smoky Biriyani — crafted with
          fire, served with love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/menu"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 transition shadow-xl shadow-primary/30"
          >
            Explore Menu
          </Link>
          <a
            href="#branches"
            className="border border-cream/40 text-cream px-8 py-3.5 rounded-full font-medium hover:bg-cream/10 transition"
          >
            Book a Table
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80 z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}

function About() {
  const stats = [
    { icon: Store, label: "Branches", value: "4" },
    { icon: UtensilsCrossed, label: "Menu Items", value: "100+" },
    { icon: Users, label: "Happy Guests", value: "Thousands" },
  ];
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-medium uppercase tracking-widest text-xs">
              Our Story
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 text-balance leading-tight">
              From a humble cloud kitchen to Kerala's favourite table.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Chillies began with a single wok, a passion for fire-grilled
              Arabian flavours, and an obsession with the smoky soul of Malabar
              cooking. Today, four bustling branches later, we still cook every
              dish like it's for family — because for us, it is.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From Alfaham to Biriyani, every recipe is rooted in tradition and
              finished with our signature chilli warmth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-secondary text-secondary-foreground rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-secondary-foreground/5 rounded-2xl p-5 text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary grid place-items-center mb-3">
                    <s.icon size={20} />
                  </div>
                  <div className="font-display text-3xl font-bold text-accent">
                    {s.value}
                  </div>
                  <div className="text-sm text-secondary-foreground/70 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 italic font-display text-2xl text-accent text-center">
              "Deliciously Yours."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Branches() {
  return (
    <section id="branches" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-primary font-medium uppercase tracking-widest text-xs">
            Visit Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            Find Your Nearest Chillies
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Four branches across Malappuram — same fire, same flavour.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-lift bg-card rounded-2xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-display text-xl font-semibold">{b.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                <Phone size={13} /> {b.phone}
              </p>
              <a
                href={`tel:${b.tel}`}
                className="mt-5 inline-flex items-center justify-center w-full bg-primary text-primary-foreground py-2.5 rounded-full font-medium hover:bg-primary/90 transition text-sm"
              >
                Call Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-primary font-medium uppercase tracking-widest text-xs">
            Gallery
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            Tempting Bites
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {gallery.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={g.src}
                alt="Chillies dish"
                loading="lazy"
                className={`w-full ${g.h === "tall" ? "h-80" : "h-56"} object-cover group-hover:scale-110 transition-transform duration-700`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
