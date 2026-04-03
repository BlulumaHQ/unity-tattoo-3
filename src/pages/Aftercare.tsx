import { motion } from "framer-motion";

const steps = [
  "Leave the Saniderm (plastic) bandage on for a minimum of 24 hours up to 5 days. Regular bandage between 6 to 16 hours.",
  "Wash your hands well then remove the bandage slowly under warm running water.",
  "Immediately after removing the bandage, gently wash your tattoo using only your fingertips (do not use a facecloth, sponge, etc.) with an unscented soap and lukewarm water. Rinse the area thoroughly until all the ointment, blood and/or plasma are removed.",
  "Pat the tattoo dry with a clean towel — do not wipe or rub it dry.",
  "Let your tattoo dry and rest until it starts feeling tight like a sunburn, then apply a very thin layer of unscented lotion (Aveeno, Lubriderm, etc.), rub it into the skin completely and pat away any excess remaining on the surface.",
  "Continue to treat your new tattoo this way for about 2–3 weeks, or until the tattoo has stopped flaking and is no longer dry and shiny.",
];

const tips = [
  "Always use fragrance-free, hypoallergenic soap and moisturizer when caring for a tattoo.",
  "Never rebandage your tattoo unless directed to do so by your artist.",
  "While healing, cover the tattoo with clothing whenever it might be exposed to the sun.",
  "No using sunscreen on the tattoo until it has fully healed. Once fully healed, sunscreen can be used to protect it from fading.",
  "No picking at scabs or flakes as this can cause scar tissue to form.",
  "No soaking the tattoo (swimming, bathing, etc.) until the tattoo has healed. Showering is fine with limited water exposure.",
];

const Aftercare = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-heading mb-16"
        >
          Aftercare
        </motion.h1>

        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-6"
            >
              <span className="text-3xl font-serif text-muted-foreground/30 shrink-0">{index + 1}</span>
              <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-sm p-8"
        >
          <h2 className="text-xl font-serif mb-6">Important Tips</h2>
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0 mt-2" />
                <p className="text-muted-foreground text-sm leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground text-sm text-center mt-12"
        >
          Aftercare may vary depending on the artist. Please email the shop at{" "}
          <a href="mailto:unitytattoo@gmail.com" className="text-foreground hover:underline">
            unitytattoo@gmail.com
          </a>{" "}
          if you have any questions.
        </motion.p>
      </div>
    </section>
  );
};

export default Aftercare;
