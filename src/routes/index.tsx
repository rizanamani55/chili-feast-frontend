import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  UtensilsCrossed,
  Users,
  Store,
  X,
  MessageCircle,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingMenuCta } from "@/components/FloatingMenuCta";
import { useState, useEffect, useRef } from "react";

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
  { id: "1", src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800", caption: "Al Faham Special" },
  { id: "2", src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", caption: "Fresh Broast" },
  { id: "3", src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800", caption: "Prawn Masala" },
  { id: "4", src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", caption: "Seafood Platter" },
  { id: "5", src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800", caption: "Chicken Shawarma" },
  { id: "6", src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800", caption: "Mutton Biriyani" },
  { id: "7", src: "https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800", caption: "Vegetable Curry" },
  { id: "8", src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800", caption: "Fish Fry" },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ----------------------------------------------------------------------
// MAIN HOME PAGE COMPONENT WITH 8 ENGAGEMENT FEATURES
// ----------------------------------------------------------------------
function HomePage() {
  const [selectedBranch, setSelectedBranch] = useState("Pulikkalodi");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chillies_branch");
      if (saved) setSelectedBranch(saved);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* FEATURE 8: STICKY BRANCH PICKER BAR */}
      <BranchPicker selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />

      <Hero />

      {/* FEATURE 1: FEATURED DISH SPOTLIGHT REEL */}
      <SpotlightReel selectedBranch={selectedBranch} />

      {/* FEATURE 5: MOST ORDERED BESTSELLERS */}
      <Bestsellers selectedBranch={selectedBranch} />

      {/* FEATURE 7: KERALA FOOD TRIVIA FLIP CARDS */}
      <TriviaFlipCards />

      {/* FEATURE 2: TASTE QUIZ FIND YOUR DISH */}
      <TasteQuiz selectedBranch={selectedBranch} />

      <About />

      {/* FEATURE 4: HORIZONTAL CUSTOMER REVIEW MARQUEE TICKER */}
      <ReviewsTicker />

      <Branches />
      <Gallery />
      <Footer />

      {/* FEATURE 6: FLOATING WHATSAPP QUICK ORDER PANEL */}
      <WhatsAppQuickOrderPanel />
    </div>
  );
}

// Global WhatsApp Link Helper
const getWAUrl = (dishName: string, selectedBranch: string) => {
  const baseText = `Hi! I'd like to order ${dishName} from Chillies Restaurant.`;
  const text = selectedBranch ? `${baseText}\nBranch: ${selectedBranch}` : baseText;
  return `https://wa.me/919446447755?text=${encodeURIComponent(text)}`;
};

// ----------------------------------------------------------------------
// FEATURE 8: BRANCH PICKER STICKY BAR
// ----------------------------------------------------------------------
function BranchPicker({
  selectedBranch,
  setSelectedBranch,
}: {
  selectedBranch: string;
  setSelectedBranch: (b: string) => void;
}) {
  const branchOptions = ["Pulikkalodi", "Anchachavidi", "Wandoor", "Thiruvali"];

  const selectBranch = (branch: string) => {
    setSelectedBranch(branch);
    localStorage.setItem("chillies_branch", branch);
  };

  return (
    <div className="sticky top-16 z-30 bg-[rgba(26,10,5,0.96)] backdrop-blur-md border-b border-white/5 py-2 px-4 w-full">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="text-cream/70 flex items-center gap-1 font-semibold whitespace-nowrap">
          📍 Ordering from:
        </span>
        <div className="flex gap-2 overflow-x-auto scrollbar-none max-w-full py-1">
          {branchOptions.map((branch) => {
            const isSelected = selectedBranch === branch;
            return (
              <button
                key={branch}
                onClick={() => selectBranch(branch)}
                className={`px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#C0392B] text-white shadow-md shadow-[#C0392B]/20"
                    : "bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream"
                }`}
              >
                {branch}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// HERO SECTION
// ----------------------------------------------------------------------
function Hero() {
  const title = "Deliciously Yours";
  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center text-center p-0"
    >
      {/* Cinematic Looping Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80"
        >
          <source
            src="https://cdn.pixabay.com/video/2022/09/20/132234-752802847_large.mp4"
            type="video/mp4"
          />
          <img
            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80"
            alt="Fallback"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Dark overlay to support readiblity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.3)] z-0 pointer-events-none" />

      {/* Ambient Chilli Red Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_#C0392B_0%,transparent_70%)] opacity-15" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="uppercase tracking-[0.4em] text-accent text-xs sm:text-sm mb-6 font-medium"
        >
          Chillies Restaurant · Kerala
        </motion.p>

        {/* Word-by-word Slide-up Headline */}
        <h1
          className="font-display font-bold text-cream text-balance"
          style={{
            fontSize: "clamp(42px, 9vw, 88px)",
            lineHeight: "1.1",
          }}
        >
          {title.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: wi * 0.15, duration: 0.6, ease: "easeOut" }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-6 text-cream/80 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
        >
          Sizzling Arabian Grill, golden Broast, smoky Biriyani — crafted with
          fire, served with love.
        </motion.p>

        {/* Divider line between tagline and CTAs */}
        <div className="w-full max-w-md h-[1px] bg-white/20 mx-auto my-8" />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              to="/menu"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition shadow-xl shadow-primary/30 inline-block"
            >
              Explore Menu
            </Link>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <a
              href="#branches"
              className="border border-cream/40 text-cream px-8 py-3.5 rounded-full font-semibold hover:bg-cream/10 transition backdrop-blur-sm inline-block"
            >
              Book a Table
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bouncing scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80 z-10 hover:text-white transition"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 1: WHAT'S HOT DISH SPOTLIGHT REEL
// ----------------------------------------------------------------------
const spotlightDishes = [
  { name: "Dragon Alfaham", price: "₹190/340/620", emoji: "🍗", tagline: "Our most-talked-about dish" },
  { name: "Prawns Roast", price: "₹310/580/1100", emoji: "🦐", tagline: "Fresh from the coast daily" },
  { name: "Beef Kondattam", price: "₹240/420/650", emoji: "🥩", tagline: "A Malabar classic" },
  { name: "Dragon Chicken", price: "₹240/430/740", emoji: "🍗", tagline: "Bold, spicy, unforgettable" },
  { name: "Paneer Butter Masala", price: "₹200/370/680", emoji: "🧀", tagline: "For the vegetarian soul" },
  { name: "Prawns Biriyani", price: "₹320", emoji: "🍤", tagline: "The weekend special" },
];

function SpotlightReel({ selectedBranch }: { selectedBranch: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -284, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 284, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      scrollRight();
    } else if (diff < -50) {
      scrollLeft();
    }
    setTouchStart(null);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[#C0392B] font-semibold text-xs tracking-[0.2em] uppercase">
              WHAT'S HOT 🔥
            </span>
            <h2 className="font-display text-4xl font-bold mt-2 text-foreground">
              Fan Favourites
            </h2>
          </div>
          {/* Navigation Arrows (hidden on mobile) */}
          <div className="hidden md:flex gap-3 mt-4 md:mt-0">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-[#1a0a05] text-white flex items-center justify-center hover:bg-[#C0392B] transition cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-[#1a0a05] text-white flex items-center justify-center hover:bg-[#C0392B] transition cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Reel Container */}
        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-6 overflow-x-auto scrollbar-none py-4 px-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {spotlightDishes.map((dish) => (
            <motion.div
              key={dish.name}
              whileHover={{
                y: -6,
                boxShadow: "0 10px 30px rgba(192, 57, 43, 0.25)",
              }}
              style={{
                width: "260px",
                flex: "0 0 260px",
                scrollSnapAlign: "start",
                border: "1.5px solid transparent",
              }}
              className="bg-[#1a0a05] text-[#FFF8F0] rounded-[16px] p-5 flex flex-col justify-between h-[360px] cursor-pointer hover:border-[#C0392B] transition-colors duration-300 relative overflow-hidden"
            >
              <div>
                <span className="text-[48px] block mb-4">{dish.emoji}</span>
                <h3 className="font-display text-lg font-bold text-[#FFF8F0]">
                  {dish.name}
                </h3>
                <p className="text-cream/60 italic text-xs mt-1.5 leading-relaxed">
                  "{dish.tagline}"
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mt-6">
                  <span
                    className="text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: "#F39C12" }}
                  >
                    {dish.price}
                  </span>
                </div>
                <motion.a
                  href={getWAUrl(dish.name, selectedBranch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#C0392B] hover:bg-[#a63024] text-white text-xs font-semibold shadow-sm transition duration-200"
                >
                  <MessageCircle size={13} fill="white" strokeWidth={0} />
                  Order via WhatsApp
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 5: BESTSELLERS SECTION
// ----------------------------------------------------------------------
const bestsellers = [
  { rank: "#1", name: "Dragon Alfaham", badge: "🔥 Most Ordered", price: "₹190/340/620" },
  { rank: "#2", name: "Prawns Roast", badge: "⭐ Staff Pick", price: "₹310/580/1100" },
  { rank: "#3", name: "Beef Biriyani", badge: "❤️ Fan Favourite", price: "₹140/200" },
  { rank: "#4", name: "Shawarma (Plate)", badge: "🔥 Most Ordered", price: "₹120" },
  { rank: "#5", name: "Broast (Regular)", badge: "⭐ Staff Pick", price: "₹170/290/550" },
];

function Bestsellers({ selectedBranch }: { selectedBranch: string }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#C0392B] font-semibold text-xs tracking-[0.2em] uppercase">
            BESTSELLERS
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 text-foreground">
            What Everyone's Ordering
          </h2>
        </div>

        {/* Rows with staggered entry */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-4"
        >
          {bestsellers.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="relative py-5 flex items-center justify-between border-b border-border/10 overflow-hidden group"
            >
              {/* Massive back watermark rank */}
              <span className="absolute left-0 bottom-[-10px] text-[88px] font-bold text-[#C0392B] opacity-5 select-none font-display pointer-events-none">
                {item.rank}
              </span>

              <div className="flex items-center gap-4 relative z-10 pl-6">
                <span className="font-display text-xl font-bold text-[#C0392B] w-8">
                  {item.rank}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition duration-150">
                    {item.name}
                  </h3>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-accent">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 relative z-10">
                <span className="text-sm font-bold text-[#F39C12]">
                  {item.price}
                </span>
                <motion.a
                  href={getWAUrl(item.name, selectedBranch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-semibold text-[#F39C12] underline hover:text-[#C0392B] transition"
                >
                  Order on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 7: KERALA FOOD TRIVIA FLIP CARDS
// ----------------------------------------------------------------------
const triviaCards = [
  {
    front: "🤔 Do you know where Al Faham originates?",
    back: "Al Faham (الفحم) means 'charcoal' in Arabic — it's named after the charcoal grill method brought to Kerala by Gulf-returnees. ☁️",
  },
  {
    front: "🌶 How many chillies go into our Dragon Chicken?",
    back: "We're not telling. But your tongue will know. 🌶🌶🌶",
  },
  {
    front: "🦐 Where do our prawns come from?",
    back: "Fresh from the Malabar coast, sourced daily from local fishermen in Malappuram. 🌊",
  },
  {
    front: "🍗 What makes Malabar Biriyani different?",
    back: "Malabar Biriyani uses Kaima rice (not basmati), fried onions, and a lighter spice profile than Hyderabadi — making it aromatic, not heavy. 🌿",
  },
];

function TriviaFlipCards() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#C0392B] font-semibold text-xs tracking-[0.2em] uppercase">
            FUN FACTS
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 text-foreground">
            Did You Know?
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {triviaCards.map((card, idx) => {
            const isFlipped = !!flippedCards[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleFlip(idx)}
                className={`flip-card ${isFlipped ? "flipped" : ""}`}
              >
                <div className="flip-card-inner">
                  {/* Front (Dark) */}
                  <div className="flip-card-front text-cream/90 flex flex-col justify-center items-center text-center">
                    <span className="text-3xl mb-4">🤔</span>
                    <p className="font-medium text-sm leading-relaxed">
                      {card.front.replace("🤔", "").trim()}
                    </p>
                    <span className="text-[10px] text-cream/40 uppercase tracking-widest font-semibold mt-6">
                      Click to Flip
                    </span>
                  </div>

                  {/* Back (Chilli Red) */}
                  <div className="flip-card-back text-white flex flex-col justify-center items-center text-center">
                    <p className="text-xs italic leading-relaxed">
                      {card.back}
                    </p>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-6">
                      Click to Flip Back
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 2: TASTE QUIZ
// ----------------------------------------------------------------------
const quizQuestions = [
  {
    title: "How hungry are you?",
    options: ["😋 Just a snack", "🍽 Moderately hungry", "🔥 Absolutely starving"],
  },
  {
    title: "What are you feeling?",
    options: ["🌊 Seafood", "🍗 Grilled chicken", "🥩 Red meat", "🥦 Vegetarian"],
  },
  {
    title: "How spicy do you like it?",
    options: ["🙂 Mild", "😤 Medium", "🌶 Bring the heat"],
  },
];

function TasteQuiz({ selectedBranch }: { selectedBranch: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (step < 2) {
      setStep(step + 1);
    } else {
      setStep(3); // Result step
    }
  };

  const getRecommendation = () => {
    if (answers.length < 3) return { name: "Dragon Chicken", reason: "Bold, fiery, and built for serious hunger." };
    
    const [hunger, type, spice] = answers;
    
    // Snack + Any + Mild -> Green Salad or Veg Noodles
    if (hunger.includes("snack") && spice.includes("Mild")) {
      return { name: "Green Salad", reason: "Light, refreshing, and clean tasting." };
    }
    // Snack + Any + Spicy -> Chilly Mushroom Dry
    if (hunger.includes("snack") && spice.includes("heat")) {
      return { name: "Chilly Mushroom Dry", reason: "Perfect spicy bite to kickstart your palate." };
    }
    // Hungry + Seafood + Any -> Prawns Roast
    if (hunger.includes("hungry") && type.includes("Seafood")) {
      return { name: "Prawns Roast", reason: "Succulent prawns roasted in Malabar spices." };
    }
    // Hungry + Chicken + Mild -> Al Faham
    if (hunger.includes("hungry") && type.includes("chicken") && spice.includes("Mild")) {
      return { name: "Al Faham", reason: "Classic charcoal-grilled Arabian goodness." };
    }
    // Hungry + Chicken + Spicy -> Dragon Alfaham
    if (hunger.includes("hungry") && type.includes("chicken") && spice.includes("heat")) {
      return { name: "Dragon Alfaham", reason: "Our iconic Alfaham finished in fiery dragon glaze." };
    }
    // Hungry + Red meat + Any -> Beef Kondattam
    if (hunger.includes("hungry") && type.includes("meat")) {
      return { name: "Beef Kondattam", reason: "Smoky, crispy beef bites from local traditions." };
    }
    // Hungry + Vegetarian + Any -> Paneer Butter Masala
    if (hunger.includes("hungry") && type.includes("Vegetarian")) {
      return { name: "Paneer Butter Masala", reason: "Creamy, rich paneer cooked to perfection." };
    }
    // Starving + Seafood + Any -> Prawns Biriyani
    if (hunger.includes("starving") && type.includes("Seafood")) {
      return { name: "Prawns Biriyani", reason: "Fragrant rice layered with spicy coastal prawns." };
    }
    // Starving + Chicken + Any -> Dragon Combo
    if (hunger.includes("starving") && type.includes("chicken")) {
      return { name: "Dragon Combo", reason: "Sizzling Dragon Alfaham served with a mountain of Mandi rice." };
    }
    // Starving + Red meat + Any -> Beef Biriyani
    if (hunger.includes("starving") && type.includes("meat")) {
      return { name: "Beef Biriyani", reason: "Hearty, slow-cooked beef layered with rich dum spices." };
    }
    // Starving + Vegetarian + Any -> Kadai Paneer
    if (hunger.includes("starving") && type.includes("Vegetarian")) {
      return { name: "Kadai Paneer", reason: "Bold bell pepper spices and fresh, pillowy paneer." };
    }

    return { name: "Dragon Chicken", reason: "Bold, fiery, and built for serious hunger." };
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  const progressPercentage = step === 3 ? 100 : (step / 3) * 100;
  const recommendation = getRecommendation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background flex flex-col items-center border-t border-white/5">
      <div className="text-center mb-10">
        <span className="text-[#C0392B] font-semibold text-xs tracking-[0.2em] uppercase">
          FIND YOUR DISH
        </span>
        <h2 className="font-display text-4xl font-bold mt-2 text-foreground">
          Not sure what to order?
        </h2>
      </div>

      {/* Quiz Card */}
      <div className="w-full max-w-[480px] bg-[#1a0a05] rounded-[20px] p-8 shadow-2xl relative overflow-hidden border border-white/5">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-[#C0392B]"
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {step < 3 ? (
          <div>
            <div className="flex justify-between items-center text-[10px] text-cream/40 font-bold uppercase tracking-wider mb-6 mt-2">
              <span>Question {step + 1} of 3</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>

            <h3 className="font-display text-xl font-bold text-cream mb-6">
              {quizQuestions[step].title}
            </h3>

            <div className="flex flex-col gap-3">
              {quizQuestions[step].options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3.5 px-6 rounded-full text-sm font-semibold border border-white/10 text-cream bg-transparent hover:bg-[#C0392B] hover:border-[#C0392B] transition-all duration-200 text-left cursor-pointer"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="text-center py-4 flex flex-col items-center"
          >
            <span className="text-[#F39C12] font-semibold text-xs uppercase tracking-widest mb-1 block">
              We recommend...
            </span>
            <h3 className="font-display text-3xl font-bold text-[#FFF8F0] mt-2 mb-3">
              {recommendation.name}
            </h3>
            <p className="text-cream/80 text-sm italic leading-relaxed max-w-sm mb-8 px-4">
              "{recommendation.reason}"
            </p>

            <motion.a
              href={getWAUrl(recommendation.name, selectedBranch)}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[280px] py-3.5 rounded-full bg-[#C0392B] hover:bg-[#a63024] text-white text-sm font-semibold shadow-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} fill="white" strokeWidth={0} />
              Order recommended dish
            </motion.a>

            <button
              onClick={resetQuiz}
              className="mt-6 text-xs text-cream/45 hover:text-accent font-semibold uppercase tracking-wider underline cursor-pointer"
            >
              Try again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// ABOUT SECTION & STATS
// ----------------------------------------------------------------------
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 1500;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;

            if (elapsedTime >= duration) {
              setCount(target);
              return;
            }

            const progress = elapsedTime / duration;
            const easeOutProgress = progress * (2 - progress); // Ease out quad

            setCount(Math.floor(easeOutProgress * target));
            requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={elementRef} className="font-display text-4xl font-bold text-accent">
      {count}
      {suffix}
    </span>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let currentText = "";
          let index = 0;
          const speed = 120; // Typewriter speed

          const type = () => {
            if (index < text.length) {
              currentText += text[index];
              setDisplayedText(currentText);
              index++;
              setTimeout(type, speed);
            }
          };

          type();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasAnimated]);

  return (
    <span ref={elementRef} className="font-display text-4xl font-bold text-accent inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[30px] bg-accent ml-1 align-middle"
      />
    </span>
  );
}

function About() {
  const stats = [
    { icon: Store, label: "Branches", value: 4, isText: false, suffix: "" },
    { icon: UtensilsCrossed, label: "Menu Items", value: 100, isText: false, suffix: "+" },
    { icon: Users, label: "Happy Guests", textValue: "Thousands", isText: true, suffix: "" },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Text Description */}
          <div>
            <span
              className="font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C0392B",
              }}
            >
              Our Story
            </span>
            <h2
              className="font-display font-bold text-balance mt-2"
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: "1.2",
              }}
            >
              From a humble cloud kitchen to Kerala's favourite table.
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              Chillies began with a single wok, a passion for fire-grilled
              Arabian flavours, and an obsession with the smoky soul of Malabar
              cooking. Today, four bustling branches later, we still cook every
              dish like it's for family — because for us, it is.
            </motion.p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From Alfaham to Biriyani, every recipe is rooted in tradition and
              finished with our signature chilli warmth.
            </p>
          </div>

          {/* Stats Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#C0392B]/20 bg-[rgb(20,8,5)]"
          >
            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-[#2C1810] text-[#FFF8F0] rounded-[12px] p-6 border border-[#C0392B]/30 border-t-[3px] border-t-[#C0392B] relative flex flex-col justify-between"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#C0392B]/10 text-[#C0392B] grid place-items-center mb-4">
                    <stat.icon size={20} />
                  </div>

                  <div className="text-center">
                    {stat.isText ? (
                      <TypewriterText text={stat.textValue!} />
                    ) : (
                      <AnimatedCounter target={stat.value!} suffix={stat.suffix} />
                    )}

                    <div className="mt-2 text-xs text-[#FFF8F0]/70 font-semibold tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-8 italic font-display text-2xl text-accent text-center">
              "Deliciously Yours."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 4: REVIEWS TICKER MARQUEE
// ----------------------------------------------------------------------
const reviewsRow1 = [
  "Best Al Faham in Malappuram 🔥",
  "Dragon Chicken is absolutely unreal",
  "Came for shawarma, stayed for the biriyani",
  "4 branches and every one is consistent",
  "The broast hits different at midnight",
];

const reviewsRow2 = [
  "Prawns roast > everything else on the menu",
  "Family favourite for 3 years now",
  "Finally a place that does Malabar cooking justice",
  "Chillies never disappoints, ever",
  "The Beef Kondattam is a spiritual experience",
];

function ReviewsTicker() {
  const row1 = [...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
  const row2 = [...reviewsRow2, ...reviewsRow2, ...reviewsRow2];

  return (
    <section className="bg-[#0f0604] py-20 overflow-hidden relative border-t border-white/5 border-b border-white/5">
      <div className="text-center mb-12">
        <span className="text-[#C0392B] font-semibold text-xs tracking-[0.2em] uppercase block">
          WHAT PEOPLE SAY
        </span>
      </div>

      <div className="marquee-container flex flex-col gap-6 w-full">
        {/* Row 1 (Left Scrolling) */}
        <div className="flex overflow-hidden w-full relative">
          <div className="animate-marquee-left flex gap-6">
            {row1.map((rev, i) => (
              <div
                key={i}
                className="px-6 py-4 rounded-full bg-white/5 border border-white/10 text-cream/90 flex flex-col gap-1 items-center justify-center shrink-0 min-w-[280px]"
              >
                <p className="text-sm font-medium">"{rev}"</p>
                <span className="text-[12px] text-accent mt-1">⭐⭐⭐⭐⭐</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Right Scrolling) */}
        <div className="flex overflow-hidden w-full relative">
          <div className="animate-marquee-right flex gap-6">
            {row2.map((rev, i) => (
              <div
                key={i}
                className="px-6 py-4 rounded-full bg-white/5 border border-white/10 text-cream/90 flex flex-col gap-1 items-center justify-center shrink-0 min-w-[280px]"
              >
                <p className="text-sm font-medium">"{rev}"</p>
                <span className="text-[12px] text-accent mt-1">⭐⭐⭐⭐⭐</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FEATURE 3: LIVE STATUS & BRANCHES SECTION
// ----------------------------------------------------------------------
function BranchStatus() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // Open between 11:00 AM (11) and 11:00 PM (23)
      setIsOpen(hours >= 11 && hours < 23);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // sync every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: isOpen ? "rgba(39, 174, 96, 0.15)" : "rgba(192, 57, 43, 0.15)",
        color: isOpen ? "#27AE60" : "#C0392B",
      }}
      className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase z-20"
    >
      <Clock size={11} className="shrink-0" />
      <span
        style={{ backgroundColor: isOpen ? "#27AE60" : "#C0392B" }}
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${isOpen ? "animate-dot-pulse" : ""}`}
      />
      <span>{isOpen ? "Open Now" : "Closed"}</span>
    </div>
  );
}

function Branches() {
  return (
    <section id="branches" className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="font-medium"
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#C0392B",
            }}
          >
            Visit Us
          </span>
          <h2
            className="font-display font-bold text-balance mt-2"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: "1.2",
            }}
          >
            Find Your Nearest Chillies
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Four branches across Malappuram — same fire, same flavour.
          </p>
        </div>

        {/* Branches Grid with Hover radial expand glow */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {branches.map((b) => (
            <motion.div
              key={b.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="branch-card p-6 flex flex-col justify-between h-full cursor-pointer relative"
            >
              {/* FEATURE 3: LIVE STATUS BADGE */}
              <BranchStatus />

              <div>
                <div className="flex items-center mb-4 mt-2">
                  <MapPin size={32} className="text-primary shrink-0 animate-bounce" />
                  <h3 className="ml-4 font-display text-xl font-bold text-cream">
                    {b.name}
                  </h3>
                </div>
                <p className="text-sm text-cream/70 mt-2 flex items-center gap-2">
                  <Phone size={13} className="text-primary" /> {b.phone}
                </p>
              </div>
              <a
                href={`tel:${b.tel}`}
                className="btn-call mt-6 inline-flex items-center justify-center w-full px-5 py-3 rounded-full font-semibold"
              >
                Call Now
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// GALLERY & INTERACTIVE LIGHTBOX
// ----------------------------------------------------------------------
function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Keyboard Navigation inside Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentImage]);

  return (
    <>
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-background border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C0392B",
              }}
            >
              Gallery
            </span>
            <h2
              className="font-display font-bold text-balance mt-2"
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: "1.2",
              }}
            >
              Tempting Bites
            </h2>
          </div>

          {/* Responsive CSS Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {gallery.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="break-inside-avoid mb-6 cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg border border-[#C0392B]/10"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[450px]"
                />
                
                {/* Dark Overlay Sliding Up on Hover */}
                <div className="absolute inset-0 bg-[#0000008a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col justify-end p-6 z-10 pointer-events-none">
                  <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-1">
                    Signature Dish
                  </span>
                  <h4 className="text-cream font-display text-xl font-bold">
                    {g.caption}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Lightbox slideshow modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[60] p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream transition"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Slider container */}
            <div className="relative w-[90vw] max-w-[900px] h-[80vh] flex items-center justify-center">
              <motion.img
                key={currentImage}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                src={gallery[currentImage].src}
                alt={gallery[currentImage].caption}
                className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl select-none"
              />

              {/* Slider Chevrons */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[60] p-3 sm:p-4 bg-white/5 hover:bg-white/10 hover:scale-105 transition rounded-full text-cream"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[60] p-3 sm:p-4 bg-white/5 hover:bg-white/10 hover:scale-105 transition rounded-full text-cream"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption Information */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-cream">
              <span className="text-accent text-[10px] uppercase tracking-widest font-semibold mb-1 block">
                Signature Dish
              </span>
              <p className="font-display text-xl font-bold">{gallery[currentImage].caption}</p>
              <p className="text-[11px] text-cream/40 mt-1">
                {currentImage + 1} / {gallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ----------------------------------------------------------------------
// FEATURE 6: FLOATING WHATSAPP QUICK ORDER PANEL
// ----------------------------------------------------------------------
function WhatsAppQuickOrderPanel() {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [branch, setBranch] = useState("Pulikkalodi");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendOrder = () => {
    if (!inputVal.trim()) return;
    const baseText = `Hi! I'd like to order:\n${inputVal}`;
    const text = `${baseText}\nBranch: ${branch}`;
    const url = `https://wa.me/919446447755?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setInputVal("");
  };

  return (
    <>
      {/* Background click overlay to close panel */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-transparent z-40"
        />
      )}

      <AnimatePresence>
        {showButton && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Quick Order Panel */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  style={{ transformOrigin: "bottom right" }}
                  className="bg-[#1a0a05] text-cream w-[280px] p-5 rounded-[16px] shadow-2xl border border-white/10 mb-4 flex flex-col gap-4 text-left"
                >
                  {/* Panel Header */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h3 className="text-sm font-semibold text-[#FFF8F0] tracking-wide">
                      Quick Order via WhatsApp
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-cream/55 hover:text-white transition p-1 rounded"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Input Form */}
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-cream/40 uppercase tracking-wider font-bold">
                        What would you like?
                      </label>
                      <textarea
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="e.g. 1 Dragon Alfaham (M), 1 Ghee Rice"
                        className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-cream focus:outline-none focus:border-[#C0392B] transition placeholder:text-cream/30 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-cream/40 uppercase tracking-wider font-bold">
                        Select Branch
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full bg-[#1a0a05] border border-white/10 rounded-lg p-2 text-xs text-cream focus:outline-none focus:border-[#C0392B] transition cursor-pointer"
                      >
                        <option value="Pulikkalodi">Pulikkalodi</option>
                        <option value="Anchachavidi">Anchachavidi</option>
                        <option value="Wandoor">Wandoor</option>
                        <option value="Thiruvali">Thiruvali</option>
                      </select>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={sendOrder}
                      className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <MessageCircle size={14} fill="white" strokeWidth={0} />
                      Send Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circular Toggle Button */}
            <motion.button
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl cursor-pointer hover:bg-[#20ba59] transition-colors duration-250 relative z-50 border border-white/10"
              aria-label="WhatsApp Quick Order"
            >
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
                className="text-white"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.48-.002 9.932-4.409 9.935-9.827.001-2.624-1.018-5.093-2.868-6.947-1.85-1.854-4.312-2.873-6.93-2.875-5.485 0-9.937 4.41-9.94 9.828 0 1.558.423 3.082 1.229 4.433L1.933 21.05l4.714-1.896zm11.332-6.55c-.295-.148-1.748-.865-2.019-.963-.272-.098-.47-.148-.667.148-.198.297-.767.963-.94 1.16-.173.199-.347.223-.642.075-.295-.148-1.248-.46-2.378-1.467-.88-.784-1.474-1.753-1.647-2.05-.173-.297-.018-.458.13-.606.134-.133.295-.347.444-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.667-1.61-.915-2.207-.242-.579-.487-.501-.667-.51l-.57-.01c-.197 0-.518.073-.79.371-.271.297-1.038 1.016-1.038 2.48 0 1.462 1.062 2.875 1.21 3.073.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.748-.715 1.995-1.404.247-.69.247-1.284.173-1.404-.074-.12-.272-.198-.567-.346z" />
              </svg>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
