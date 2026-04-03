import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const reveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const giftCards = [
  { amount: 50, badge: null },
  { amount: 100, badge: null },
  { amount: 150, badge: "Most Popular" },
  { amount: 200, badge: null },
];

const terms = [
  "Gift cards are non-refundable once purchased",
  "Valid for 12 months from the date of purchase",
  "Cannot be redeemed for cash",
  "Cannot be combined with any other offers or discounts",
  "Lost or stolen gift cards cannot be replaced",
  "Redeemable in-shop at Unity Tattoo only (1395 Commercial Drive, Vancouver, BC)",
  "Gift cards may be used toward any tattoo service",
];

const GiftCard = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 md:py-40 bg-foreground text-background text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--brand-green)/0.08),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Gift size={40} className="mx-auto mb-6 text-[hsl(var(--brand-green))]" />
            <h1
              className="text-4xl md:text-6xl xl:text-7xl mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Gift the Art of Ink
            </h1>
            <p
              className="text-lg md:text-xl text-background/60 max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The perfect gift for someone ready for their next tattoo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Card Options */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {giftCards.map((card, i) => (
              <motion.div
                key={card.amount}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="bg-muted border border-border rounded-sm p-8 text-center transition-all duration-300 hover:border-[hsl(var(--brand-green)/0.5)] hover:shadow-[0_0_30px_-10px_hsl(var(--brand-green)/0.2)]">
                  {card.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold text-white rounded-full flex items-center gap-1" style={{ backgroundColor: "hsl(var(--brand-green))", fontFamily: "var(--font-body)" }}>
                      <Sparkles size={10} />
                      {card.badge}
                    </span>
                  )}
                  <p
                    className="text-4xl md:text-5xl mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    ${card.amount}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6" style={{ fontFamily: "var(--font-body)" }}>
                    Gift Card
                  </p>
                  <Button
                    className="w-full tracking-[0.15em] uppercase text-xs font-semibold py-5"
                    style={{ backgroundColor: "hsl(var(--brand-green))", fontFamily: "var(--font-body)" }}
                    onClick={() => {}}
                  >
                    Buy Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Terms */}
      <section className="py-20 md:py-28 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-normal text-center mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Gift Card Terms
            </h2>
            <ul className="space-y-4">
              {terms.map((term, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0 mt-2" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{term}</p>
                </li>
              ))}
            </ul>
            <p className="text-center text-muted-foreground text-sm mt-10">
              Questions? Email us at{" "}
              <a href="mailto:unitytattoo@gmail.com" className="text-foreground hover:underline transition-colors">
                unitytattoo@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default GiftCard;
