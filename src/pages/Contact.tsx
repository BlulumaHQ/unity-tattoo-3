import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdkapwr";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setForm({ first_name: "", last_name: "", email: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, text: "1395 Commercial Drive, Vancouver, BC" },
    { icon: Phone, text: "604.423.3343" },
    { icon: Mail, text: "unitytattoo@gmail.com" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Unity Tattoo Vancouver</title>
        <meta name="description" content="Get in touch with Unity Tattoo on Commercial Drive, Vancouver. Send us a message for questions, inquiries, or general information." />
        <link rel="canonical" href="https://unity-tattoo-b.lovable.app/contact" />
        <meta property="og:title" content="Contact Us | Unity Tattoo Vancouver" />
        <meta property="og:description" content="Have a question? Reach out to Unity Tattoo on Commercial Drive, Vancouver." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-muted-foreground mb-12"
          >
            Have a question? We'd love to hear from you.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {contactInfo.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 justify-center md:justify-start p-4 rounded-lg border border-white/10 bg-white/[0.03]">
                <Icon size={18} className="text-[hsl(var(--brand-green))] shrink-0" />
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-6 rounded-lg border border-white/10 bg-white/[0.03]"
            >
              <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
              <p className="text-muted-foreground">
                Thanks for reaching out! We'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input name="first_name" value={form.first_name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input name="last_name" value={form.last_name} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--brand-green))] hover:bg-[hsl(var(--brand-green))]/90 text-white font-semibold tracking-wide py-6 text-base"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          )}

          {/* Book link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-muted-foreground mt-12 text-sm"
          >
            Looking to book an appointment?{" "}
            <Link to="/book" className="text-[hsl(var(--brand-green))] hover:underline font-medium">
              Book here
            </Link>
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Contact;
