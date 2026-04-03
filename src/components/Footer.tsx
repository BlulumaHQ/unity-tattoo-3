import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const ThreadsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.784 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.22 1.33-2.96.812-.65 1.904-1.016 3.084-1.098.859-.06 1.683-.019 2.478.091-.09-.525-.27-.98-.534-1.354-.428-.604-1.1-.92-1.996-.94h-.077c-.648 0-1.586.178-2.218 1.024l-1.7-1.132C8.835 5.565 10.273 5 11.84 5h.1c1.6.042 2.832.616 3.66 1.705.576.756.965 1.715 1.158 2.848.659.14 1.272.336 1.834.59 1.128.512 2.04 1.282 2.637 2.248.776 1.256 1.035 2.855.749 4.63-.395 2.454-1.565 4.39-3.475 5.753C16.77 23.593 14.673 24.014 12.186 24zm2.28-9.73c-1.372-.166-3.407-.242-4.378.52-.509.4-.739.935-.71 1.59.046.944.803 1.878 2.5 1.878.077 0 .156-.003.236-.008 1.07-.058 1.896-.462 2.454-1.198.395-.52.65-1.235.788-2.148-.297-.118-.593-.373-.89-.634z"/>
  </svg>
);

const artistsCol1 = ["Heather Drew", "Paige McGrath", "Bronson Ramos", "Jesse Kvarnstrom"];
const artistsCol2 = ["Soodie Yang", "Brianne Throne", "Atisha Rainey", "Jordyn Bishop"];

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'hsl(0 0% 5%)', color: 'hsl(0 0% 95%)' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xl tracking-[0.35em] uppercase font-serif text-white/90">Unity Tattoo</span>
            <div className="text-white/50 text-sm text-center md:text-left space-y-1">
              <p>1395 Commercial Drive</p>
              <p>Vancouver, BC Canada</p>
              <p>604-423-3343</p>
              <a href="mailto:unitytattoo@gmail.com" className="hover:text-white transition-colors block">unitytattoo@gmail.com</a>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.instagram.com/unity_tattoo/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/unitytattoo" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="https://www.threads.com/@unitytattoovancouver" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><ThreadsIcon size={17} /></a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-white/70 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Quick Links</h4>
            {[
              { label: "Home", path: "/" },
              { label: "The Shop", path: "/the-shop" },
              { label: "Aftercare", path: "/aftercare" },
              
              { label: "Book Now", path: "/book" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-white/40 hover:text-white transition-colors tracking-wide">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-white/70 mb-4" style={{ fontFamily: 'var(--font-body)' }}>Our Artists</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex flex-col gap-2">
                {artistsCol1.map((name) => (
                  <Link key={name} to={`/artists/${name.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-white/40 hover:text-white transition-colors tracking-wide whitespace-nowrap">
                    {name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {artistsCol2.map((name) => (
                  <Link key={name} to={`/artists/${name.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-white/40 hover:text-white transition-colors tracking-wide whitespace-nowrap">
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3">
        <p className="text-center text-[11px] text-white/25 tracking-wide">
          © 2026 Unity Tattoo | Web Design by{" "}
          <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Bluluma</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
