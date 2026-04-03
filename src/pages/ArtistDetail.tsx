import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { artists } from "@/data/artists";
import ImageLightbox from "@/components/ImageLightbox";

const ArtistDetail = () => {
  const { slug } = useParams();
  const artist = artists.find((a) => a.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!artist) {
    return (
      <section className="py-32 text-center">
        <h1 className="section-heading mb-4">Artist Not Found</h1>
        <Link to="/" className="cta-button">Back to Home</Link>
      </section>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="py-24 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-serif mb-8"
        >
          {artist.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {artist.specialty}
          {artist.isGuest && " · Guest Artist"}
        </motion.p>
        {artist.bio && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 px-4"
          >
            {artist.bio}
          </motion.p>
        )}
        {!artist.bio && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground/50 max-w-xl mx-auto leading-relaxed mb-10 px-4 italic"
          >
            Bio coming soon.
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link to={`/book?artist=${artist.slug}`} className="cta-button">
            Book with {artist.name.split(" ")[0]}
          </Link>
        </motion.div>
      </section>

      {artist.gallery.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {artist.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="aspect-square overflow-hidden cursor-pointer rounded-sm"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img}
                    alt={`${artist.name} tattoo work ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageLightbox
        images={artist.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % artist.gallery.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + artist.gallery.length) % artist.gallery.length)}
        altPrefix={`${artist.name} work`}
      />
    </>
  );
};

export default ArtistDetail;
