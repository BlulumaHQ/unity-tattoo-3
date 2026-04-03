import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { artists } from "@/data/artists";

const Artists = () => {
  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-6"
          >
            Artists
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
          >
            Meet the talented team behind Unity Tattoo. Each artist brings their own unique style and expertise.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link to={`/artists/${artist.slug}`} className="group relative block overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="font-serif text-xl md:text-2xl text-white text-center leading-tight px-4">
                      {artist.name}
                    </span>
                    <span className="text-xs tracking-wider text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                      {artist.specialty}
                    </span>
                    {artist.isGuest && (
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80 bg-white/10 px-3 py-1" style={{ fontFamily: 'var(--font-body)' }}>Guest Artist</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Artists;
