import { Link } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, MapPin, Phone } from "lucide-react";
import { artists } from "@/data/artists";

const allRecentWorkImages = [
  "/images/portfolio/tattoo-snake-bg.webp",
  "/images/portfolio/tattoo-moon-woman.webp",
  "/images/portfolio/tattoo-frog-samurai.webp",
  "/images/portfolio/tattoo-eagle-snake.webp",
  "/images/portfolio/tattoo-robot-helmet.webp",
  "/images/portfolio/tattoo-strawberry-heart.webp",
  "/images/portfolio/tattoo-cat-portrait.webp",
  "/images/portfolio/tattoo-statue-realism.webp",
  "/images/portfolio/tattoo-dotwork-mandala.jpg",
  "/images/portfolio/tattoo-fineline-botanical.jpg",
  "/images/portfolio/tattoo-fineline-portrait.jpg",
  "/images/portfolio/tattoo-japanese-dragon.jpg",
  "/images/portfolio/tattoo-neo-trad-skull-rose.jpg",
  "/images/portfolio/tattoo-trad-eagle.jpg",
  "/images/portfolio/tattoo-watercolor-bird.jpg",
  "/images/portfolio/tattoo-wolf-realism.jpg",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Incredible experience! The artists at Unity Tattoo are so talented and professional. My piece turned out even better than I imagined.",
  },
  {
    name: "Jordan K.",
    rating: 5,
    text: "Best tattoo shop in Vancouver. The shop is clean, welcoming, and the artists really take the time to understand your vision.",
  },
  {
    name: "Alex R.",
    rating: 5,
    text: "Had an amazing session here. The attention to detail is unmatched. Highly recommend Unity Tattoo to anyone looking for quality work.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Index = () => {
  const recentWorkImages = useMemo(() => shuffleArray(allRecentWorkImages).slice(0, 8), []);

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-32 sm:py-36 md:py-40 lg:py-36 xl:py-40 bg-foreground text-background order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-background/50 mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              8 experienced artists on Commercial Drive. Every style, done well.
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[0.92] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tattooing Vancouver Since 2011
            </h1>
            <p
              className="flex items-center gap-2 text-sm text-background/50 tracking-wide mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MapPin size={14} />
              1395 Commercial Drive &nbsp;·&nbsp; Vancouver, BC
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/book"
                className="inline-flex items-center gap-3 bg-background text-foreground px-10 py-5 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-background/90 active:scale-[0.97] shadow-2xl"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book an Appointment
                <ArrowRight size={16} />
              </Link>
            </div>

          </motion.div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-0 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src="/images/shop-exterior.jpg"
              alt="Unity Tattoo shop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — TRUST BAR
      ═══════════════════════════════════════════ */}
      <section className="bg-muted border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 space-y-2"
          >
            <p
              className="text-sm tracking-wide text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              ⭐ Average Rating: 4.8 / 5
            </p>
            <span
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              What People Say — Reviews from Google
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {reviews.map((review, i) => (
              <motion.blockquote
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="px-6 md:px-8 py-6 md:py-2 text-center"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs">⭐⭐⭐⭐⭐</span>
                  <cite
                    className="text-xs font-semibold tracking-wider uppercase not-italic"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {review.name}
                  </cite>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* INLINE CTA BANNER */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-foreground text-background py-6"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <p
            className="text-sm tracking-wide text-background/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Ready to get started?
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-background/90 active:scale-[0.97]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Book Now <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — ARTISTS
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            Our Artists
          </motion.h2>
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
          >
            Meet the talented team behind Unity Tattoo. Each artist brings their own unique style and expertise.
          </motion.p>

          <div className="space-y-2">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.slug}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <div
                  className={`group grid grid-cols-1 md:grid-cols-2 min-h-[280px] md:min-h-[340px] overflow-hidden bg-muted hover:bg-muted/80 transition-colors duration-300 ${
                    index % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <Link
                    to={`/artists/${artist.slug}`}
                    className={`relative overflow-hidden block ${index % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <div className="aspect-[7/5]">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
                  </Link>

                  {/* Info */}
                  <div
                    className={`flex flex-col justify-center px-8 md:px-12 py-8 ${
                      index % 2 === 1 ? "md:order-1 md:text-right md:items-end" : "md:items-start"
                    }`}
                    style={{ direction: "ltr" }}
                  >
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {artist.specialty}
                    </span>
                    <span
                      className="text-2xl md:text-3xl lg:text-4xl mb-4"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {artist.name}
                    </span>
                    <div className={`flex flex-wrap gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      <Link
                        to={`/artists/${artist.slug}`}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        View Portfolio <ArrowRight size={12} />
                      </Link>
                      <Link
                        to={`/book?artist=${artist.slug}`}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold px-4 py-2 transition-colors text-white rounded-sm"
                        style={{ backgroundColor: "hsl(var(--brand-green))", fontFamily: "var(--font-body)" }}
                      >
                        Book {artist.name.split(" ")[0]}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-16"
          >
            <Link to="/book" className="cta-button">
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — RECENT WORK
      ═══════════════════════════════════════════ */}
      <section className="relative bg-foreground text-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="section-heading text-background mb-12"
          >
            Recent Work
          </motion.h2>
          {/* @ts-ignore */}
          <behold-widget feed-id="aSEpgedpptorBzJbzqY3"></behold-widget>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — THE SHOP
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-3">
              <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-normal mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The Shop
              </motion.h2>
              <motion.p
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-muted-foreground leading-relaxed"
              >
                Located on Vancouver's iconic Commercial Drive, Unity Tattoo has been a cornerstone of East Van's creative community since 2011. Our collective of 8 talented artists brings together decades of experience across every tattoo style — from fine line realism to bold neo-traditional.
              </motion.p>
            </div>
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-2 flex flex-col gap-4 items-start"
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-foreground/90 active:scale-[0.97] w-full justify-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book an Appointment <ArrowRight size={16} />
              </Link>
              <Link
                to="/the-shop"
                className="cta-button w-full text-center"
              >
                Explore the Shop
              </Link>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <Phone size={14} />
                <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>604-423-3343</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — LOCATION + FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="bg-muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="min-h-[350px] lg:min-h-0"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.123!2d-123.0695!3d49.2715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671854e0ee703%3A0x7fbc48cb507cb03c!2s1395+Commercial+Dr%2C+Vancouver%2C+BC+V5L+3X5%2C+Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Unity Tattoo Location"
            />
          </motion.div>

          <div className="bg-foreground text-background flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-[1.05]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready to Get Inked?
              </h2>
              <p
                className="text-background/60 mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book your appointment today and let our talented artists bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-3 bg-background text-foreground px-10 py-4 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-background/90 active:scale-[0.97]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Book an Appointment
                  <ArrowRight size={16} />
                </Link>
              </div>
              <p
                className="text-background/40 text-sm mt-8 flex items-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MapPin size={14} />
                1395 Commercial Drive &nbsp;·&nbsp; Vancouver, BC Canada
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
