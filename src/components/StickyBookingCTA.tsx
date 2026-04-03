import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const StickyBookingCTA = () => {
  return (
    <>
      {/* Desktop - Right side vertical */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <Link
          to="/book"
          className="flex items-center gap-2 px-4 py-3 text-xs tracking-[0.15em] uppercase font-medium text-white transition-colors shadow-lg hover:brightness-110"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', backgroundColor: 'hsl(var(--brand-green))' }}
        >
          <Calendar size={14} />
          Book Now
        </Link>
      </div>

      {/* Mobile - Right side vertical (same as desktop) */}
      <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <Link
          to="/book"
          className="flex items-center gap-2 px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium text-white transition-colors shadow-lg hover:brightness-110"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', backgroundColor: 'hsl(var(--brand-green))' }}
        >
          <Calendar size={12} />
          Book Now
        </Link>
      </div>
    </>
  );
};

export default StickyBookingCTA;
