import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TheShop = () => {
  return (
    <>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/shop-exterior.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-serif text-white">
            The Shop
          </motion.h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8 text-center">
            <h2 className="section-heading mb-8">About Unity Tattoo</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unity Tattoo is a premier tattoo shop located in the heart of Vancouver's vibrant Commercial Drive neighborhood. Our collective brings together some of the most talented tattoo artists in British Columbia, each with their own distinct style and artistic vision.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that every tattoo tells a story. Our artists work closely with each client to understand their vision and create custom designs that are deeply personal and artistically exceptional. Whether you're looking for fine line work, traditional designs, realism, or something entirely unique, our team has the skill and creativity to bring your ideas to life.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our shop maintains the highest standards of cleanliness and safety. We use only premium inks and equipment, and our artists follow strict sterilization protocols to ensure a safe and comfortable experience for every client.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-heading mb-16">
            Our Space
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="aspect-video overflow-hidden">
              <img src="/images/shop-exterior.jpg" alt="Unity Tattoo storefront" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="aspect-video overflow-hidden">
              <img src="/images/shop-interior.webp" alt="Unity Tattoo shop interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-xl font-serif mb-4">Location</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">1395 Commercial Drive<br />Vancouver, BC Canada</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h3 className="text-xl font-serif mb-4">Contact</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">604-423-3343<br /><a href="mailto:unitytattoo@gmail.com" className="hover:text-foreground transition-colors">unitytattoo@gmail.com</a></p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="text-xl font-serif mb-4">Book Now</h3>
              <Link to="/book" className="cta-button text-sm">Make an Appointment</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheShop;
