import { Flame, Instagram, Facebook, Youtube, MapPin } from "lucide-react";

const branches = [
  { name: "Pulikkalodi", phone: "702 522 2260" },
  { name: "Anchachavidi", phone: "894 360 8000" },
  { name: "Wandoor", phone: "860 618 6666" },
  { name: "Thiruvali", phone: "6239 100 600" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f0604] border-t border-[#C0392B]/40 text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-4 gap-12">
        {/* Logo & Description column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-primary grid place-items-center shadow-lg">
              <Flame size={20} className="text-white animate-pulse" />
            </span>
            <span className="font-display text-[28px] font-bold text-cream tracking-tight leading-none">
              Chillies
            </span>
          </div>
          <p className="text-secondary-foreground/70 italic font-display text-lg mb-6">
            Deliciously Yours
          </p>
          
          {/* Custom 36px rounded square social buttons */}
          <div className="flex gap-2.5">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Youtube, label: "YouTube" }
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-[36px] h-[36px] rounded-lg bg-white/6 flex items-center justify-center hover:bg-[#C0392B] transition-colors duration-200 shadow-sm"
                aria-label={label}
              >
                <Icon size={18} className="text-cream" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-display text-lg mb-5 text-accent font-semibold tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            <li>
              <a
                href="/"
                className="transition-colors duration-150 hover:text-[#F39C12]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/menu"
                className="transition-colors duration-150 hover:text-[#F39C12]"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="/#branches"
                className="transition-colors duration-150 hover:text-[#F39C12]"
              >
                Branches
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className="transition-colors duration-150 hover:text-[#F39C12]"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Branches Column */}
        <div>
          <h4 className="font-display text-lg mb-5 text-accent font-semibold tracking-wide">
            Our Branches
          </h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            {branches.map((b) => (
              <li key={b.name} className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 text-[#F39C12] shrink-0" />
                <span>
                  <span className="block font-medium text-secondary-foreground">
                    {b.name}
                  </span>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="transition-colors duration-150 hover:text-[#F39C12] text-xs text-secondary-foreground/60"
                  >
                    {b.phone}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit us Column */}
        <div>
          <h4 className="font-display text-lg mb-5 text-accent font-semibold tracking-wide">
            Visit Us
          </h4>
          <p className="text-sm text-secondary-foreground/80 font-medium">
            <a
              href="https://www.chiliesgroup.com"
              className="transition-colors duration-150 hover:text-[#F39C12]"
            >
              www.chiliesgroup.com
            </a>
          </p>
          <p className="text-xs text-secondary-foreground/50 mt-4 leading-relaxed">
            Authentic Kerala-Arabian flavours served sizzling hot across 4 branches.
          </p>
        </div>
      </div>

      {/* Footer bottom copyright and Tagline in italic serif text */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-secondary-foreground/45">
        <div className="mb-2">
          <span className="font-display italic text-sm text-cream/70 tracking-wider">
            Made with fire in Kerala
          </span>
        </div>
        <p>© {new Date().getFullYear()} Chillies Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
