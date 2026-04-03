import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import logoImg from "@/assets/unity-tattoo-logo-main.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "The Shop", path: "/the-shop" },
  { label: "Aftercare", path: "/aftercare" },
  
  { label: "Contact", path: "/contact" },
];

const ThreadsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.784 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.22 1.33-2.96.812-.65 1.904-1.016 3.084-1.098.859-.06 1.683-.019 2.478.091-.09-.525-.27-.98-.534-1.354-.428-.604-1.1-.92-1.996-.94h-.077c-.648 0-1.586.178-2.218 1.024l-1.7-1.132C8.835 5.565 10.273 5 11.84 5h.1c1.6.042 2.832.616 3.66 1.705.576.756.965 1.715 1.158 2.848.659.14 1.272.336 1.834.59 1.128.512 2.04 1.282 2.637 2.248.776 1.256 1.035 2.855.749 4.63-.395 2.454-1.565 4.39-3.475 5.753C16.77 23.593 14.673 24.014 12.186 24zm2.28-9.73c-1.372-.166-3.407-.242-4.378.52-.509.4-.739.935-.71 1.59.046.944.803 1.878 2.5 1.878.077 0 .156-.003.236-.008 1.07-.058 1.896-.462 2.454-1.198.395-.52.65-1.235.788-2.148-.297-.118-.593-.373-.89-.634z"/>
  </svg>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: 'hsl(0 0% 5% / 0.95)' }}>
      <div className="mx-auto flex items-center justify-between h-[70px] md:h-[80px] px-6 sm:px-12 lg:px-16 xl:px-24">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={logoImg} alt="Unity Tattoo" className="h-[60px] w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 hover:text-white ${
                location.pathname === link.path ? "text-white" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-2">
            <a href="https://www.instagram.com/unity_tattoo/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/unitytattoo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Facebook size={16} />
            </a>
            <a href="https://www.threads.com/@unitytattoovancouver" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <ThreadsIcon size={15} />
            </a>
          </div>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: 'hsl(0 0% 5%)' }}>
          <nav className="flex flex-col items-center py-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase font-medium transition-colors hover:text-white ${
                  location.pathname === link.path ? "text-white" : "text-white/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-6 mt-2">
              <a href="https://www.instagram.com/unity_tattoo/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/unitytattoo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.threads.com/@unitytattoovancouver" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <ThreadsIcon size={19} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
