import { Flame, Instagram, Facebook, Twitter, MapPin } from "lucide-react";

const branches = [
  { name: "Pulikkalodi", phone: "702 522 2260" },
  { name: "Anchachavidi", phone: "894 360 8000" },
  { name: "Wandoor", phone: "860 618 6666" },
  { name: "Thiruvali", phone: "6239 100 600" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-full bg-primary grid place-items-center">
              <Flame size={18} />
            </span>
            <span className="font-display text-xl font-bold">Chillies</span>
          </div>
          <p className="text-secondary-foreground/70 italic font-display">
            Deliciously Yours
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-secondary-foreground/10 grid place-items-center hover:bg-primary transition"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="/menu" className="hover:text-accent">Menu</a></li>
            <li><a href="/#branches" className="hover:text-accent">Branches</a></li>
            <li><a href="/#about" className="hover:text-accent">About</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Our Branches</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            {branches.map((b) => (
              <li key={b.name} className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-accent shrink-0" />
                <span>
                  <span className="block font-medium text-secondary-foreground">{b.name}</span>
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                    {b.phone}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Visit Us</h4>
          <p className="text-sm text-secondary-foreground/80">
            <a href="https://www.chiliesgroup.com" className="hover:text-accent">
              www.chiliesgroup.com
            </a>
          </p>
          <p className="text-sm text-secondary-foreground/60 mt-3">
            Authentic Kerala-Arabian flavours served across 4 branches.
          </p>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-5 text-center text-xs text-secondary-foreground/50">
        © {new Date().getFullYear()} Chillies Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
