import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BRAND = "#0e8fcb";
const ENDPOINT = "https://zeyvzvliesujnbehoctx.supabase.co/functions/v1/submit-waiver";

const ARTISTS = [
  "Atisha Rainey", "Brianne Thorne", "Bronson Ramos", "Heather Drew",
  "Jack Marmion", "Jay Skeleton", "Jesse Kvarnstrom", "Jordyn Bishop",
  "Paige McGrath", "Soodie Yang",
];

const TERMS = [
  "I understand that if I arrive to my appointment intoxicated or in any way unable to legally consent to a tattoo, I will be refused service and my deposit will be forfeit.",
  "I am not pregnant or nursing.",
  "I understand that infection is always possible as a result of a tattoo, particularly in the event I do not follow proper care instructions. I understand my artist has taken all reasonable precautions to allow no cross-contamination; all re-usable equipment is fully disinfected between appointments up to and above the BC health guidelines, and all single-use equipment is sterile prior to use and disposed of after my appointment. If I have any questions I will ask my artist well before I take anecdotal advice from strangers on the internet. I understand that if I do not care for my tattoo properly, soak my tattoo, or tan, and it heals badly as a result, I may be charged for a touch up.",
  "I understand a tattoo is a permanent change to my physical appearance and that no representations have been made to me as to the ability to later change or remove the tattoo.",
  "I understand that while allergic reactions to pigments and other products in the tattoo process are extremely rare, I accept the risk of its possibility and that my artist has no reasonable way to determine ahead of time if this will occur.",
  "I am responsible for the meaning and/or spelling of my tattoo.",
  "I understand that variations in colour and final design may exist between the tattoo as selected by me and that which is ultimately applied to my body. I understand that colours may not heal as bright depending on my skin type and tone. I also understand that over time colours and the clarity of the tattoo may diminish due to sun exposure and the naturally occurring dispersion of pigment in the skin as I age.",
  "I acknowledge obtaining a tattoo is my choice and my choice alone. I consent to the application process and actions required to apply the tattoo.",
  "I release all rights to any photograph taken of my tattoo and give my complete advance consent for their reproduction in any print or electronic form or exhibition in any venue. If I do not wish for a photo to be publicized, or wish for my identity to be obscured, I will tell my artist ahead of time.",
  "I agree to release Unity Tattoo, its owners, contractors, and representatives from any and all claims, damages, or legal actions arising from or connected in any way with my tattoo or the procedures and conduct used to apply my tattoo.",
];

const COVID_STATEMENTS = [
  "I am not experiencing any symptoms related to COVID-19, nor have I been in close proximity with anyone experiencing symptoms including fever, cough, above-normal fatigue, difficulty breathing, flu-like symptoms, and sore throat in the last 5 days. If I have, I will contact my artist as soon as possible to reschedule my appointment and not put others at risk.",
  "I have taken reasonable precautions prior to my appointment to limit my risk of being an asymptomatic carrier.",
  "I will notify my artist immediately if I develop COVID-19 or other communicable illness related symptoms within 5 days of my appointment.",
];

interface FormState {
  legalFirst: string; legalLast: string;
  preferredFirst: string; preferredLast: string;
  pronouns: string;
  dobYear: string; dobMonth: string; dobDay: string;
  phone: string; email: string;
  mailingList: "" | "yes" | "no";
  street1: string; street2: string; city: string; province: string; postal: string;
  artist: string;
  termsAgreed: boolean;
  skinConditions: "" | "yes" | "no"; skinConditionsDetail: string;
  allergies: "" | "yes" | "no"; allergiesDetail: string;
  medicalHistory: "" | "yes" | "no"; medicalHistoryDetail: string;
  covidAgreed: boolean;
  ageConfirmed: boolean;
}

const initial: FormState = {
  legalFirst: "", legalLast: "",
  preferredFirst: "", preferredLast: "",
  pronouns: "",
  dobYear: "", dobMonth: "", dobDay: "",
  phone: "", email: "",
  mailingList: "",
  street1: "", street2: "", city: "", province: "", postal: "",
  artist: "",
  termsAgreed: false,
  skinConditions: "", skinConditionsDetail: "",
  allergies: "", allergiesDetail: "",
  medicalHistory: "", medicalHistoryDetail: "",
  covidAgreed: false,
  ageConfirmed: false,
};

// Signature pad component
const SignaturePad = ({ onChange }: { onChange: (dataUrl: string | null) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const hasDrawn = useRef(false);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#111";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drawing.current = true;
    last.current = getPos(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d");
    if (!ctx || !last.current) return;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    hasDrawn.current = true;
  };
  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (hasDrawn.current) {
      onChange(canvasRef.current!.toDataURL("image/png"));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    hasDrawn.current = false;
    onChange(null);
  };

  return (
    <div>
      <div className="border-2 border-border rounded bg-white" style={{ touchAction: "none" }}>
        <canvas
          ref={canvasRef}
          className="w-full h-48 block rounded cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Button type="button" variant="outline" size="sm" onClick={clear}>Clear</Button>
      </div>
    </div>
  );
};

const Waiver = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [signature, setSignature] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => { const { [k]: _, ...rest } = e; return rest; });
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.legalFirst.trim()) e.legalFirst = "Required";
      if (!form.legalLast.trim()) e.legalLast = "Required";
      if (!form.dobYear || !form.dobMonth || !form.dobDay) e.dob = "Complete date of birth required";
      else {
        const y = +form.dobYear, m = +form.dobMonth, d = +form.dobDay;
        if (y < 1900 || y > new Date().getFullYear() || m < 1 || m > 12 || d < 1 || d > 31) e.dob = "Invalid date";
      }
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
      if (!form.mailingList) e.mailingList = "Please select";
      if (!form.street1.trim()) e.street1 = "Required";
      if (!form.city.trim()) e.city = "Required";
      if (!form.province.trim()) e.province = "Required";
      if (!form.postal.trim()) e.postal = "Required";
      if (!form.artist) e.artist = "Please select an artist";
    } else if (s === 2) {
      if (!form.termsAgreed) e.termsAgreed = "You must agree to continue";
    } else if (s === 3) {
      if (!form.skinConditions) e.skinConditions = "Please select";
      else if (form.skinConditions === "yes" && !form.skinConditionsDetail.trim()) e.skinConditionsDetail = "Please provide details";
      if (!form.allergies) e.allergies = "Please select";
      else if (form.allergies === "yes" && !form.allergiesDetail.trim()) e.allergiesDetail = "Please provide details";
      if (!form.medicalHistory) e.medicalHistory = "Please select";
      else if (form.medicalHistory === "yes" && !form.medicalHistoryDetail.trim()) e.medicalHistoryDetail = "Please provide details";
      if (!form.covidAgreed) e.covidAgreed = "You must agree to continue";
    } else if (s === 4) {
      if (!form.ageConfirmed) e.ageConfirmed = "You must confirm your age";
      if (!signature) e.signature = "Signature is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitting(true);
    setSubmitError(null);

    const fullAddress = [
      form.street1,
      form.street2,
      `${form.city}, ${form.province} ${form.postal}`.trim(),
    ].filter((s) => s && s.trim()).join(", ");

    const payload = {
      form_slug: "unity-tattoo-waiver",
      customer_name: `${form.legalFirst} ${form.legalLast}`.trim(),
      customer_email: form.email,
      customer_phone: form.phone,
      submission_data: {
        preferred_name: `${form.preferredFirst} ${form.preferredLast}`.trim(),
        pronouns: form.pronouns,
        date_of_birth: `${form.dobYear}-${form.dobMonth.padStart(2, "0")}-${form.dobDay.padStart(2, "0")}`,
        address: fullAddress,
        artist: form.artist,
        mailing_list: form.mailingList === "yes" ? "Yes" : "No",
        skin_conditions: form.skinConditions === "yes" ? "Yes" : "No",
        skin_conditions_detail: form.skinConditions === "yes" ? form.skinConditionsDetail : "",
        allergies: form.allergies === "yes" ? "Yes" : "No",
        allergies_detail: form.allergies === "yes" ? form.allergiesDetail : "",
        medical_history: form.medicalHistory === "yes" ? "Yes" : "No",
        medical_history_detail: form.medicalHistory === "yes" ? form.medicalHistoryDetail : "",
        terms_agreed: form.termsAgreed,
        covid_agreed: form.covidAgreed,
        age_confirmed: form.ageConfirmed,
        signature: signature,
      },
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success === true) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(json?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-32 md:py-40">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <CheckCircle size={56} className="mx-auto mb-6" style={{ color: BRAND }} />
            <h1 className="text-3xl md:text-4xl font-serif mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Thank you
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Your waiver has been submitted. A copy has been emailed to you.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const progressPercent = (step / 4) * 100;

  const YesNo = ({ value, onChange, name }: { value: "" | "yes" | "no"; onChange: (v: "yes" | "no") => void; name: string }) => (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as "yes" | "no")} className="flex gap-6 mt-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yes" id={`${name}-yes`} />
        <Label htmlFor={`${name}-yes`} className="font-normal cursor-pointer">Yes</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="no" id={`${name}-no`} />
        <Label htmlFor={`${name}-no`} className="font-normal cursor-pointer">No</Label>
      </div>
    </RadioGroup>
  );

  return (
    <>
      <Helmet>
        <title>Tattoo Consent Form | Unity Tattoo</title>
        <meta name="description" content="Complete your Unity Tattoo consent and waiver form online before your appointment." />
      </Helmet>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="section-heading mb-3">Tattoo Consent Form</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Please complete this form before your appointment.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-10">
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: BRAND }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center tracking-[0.15em] uppercase">
              Step {step} of 4
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {/* ───────── STEP 1 ───────── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h2 className="text-sm tracking-[0.15em] uppercase font-semibold mb-1">Step 1: Client Information</h2>
                    <p className="text-muted-foreground text-xs">Tell us about yourself.</p>
                  </div>

                  <div>
                    <Label className="mb-2 block">Legal Name *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Input placeholder="First name" value={form.legalFirst} onChange={(e) => set("legalFirst", e.target.value)} className="bg-muted h-12" />
                        {errors.legalFirst && <p className="text-destructive text-xs mt-1">{errors.legalFirst}</p>}
                      </div>
                      <div>
                        <Input placeholder="Last name" value={form.legalLast} onChange={(e) => set("legalLast", e.target.value)} className="bg-muted h-12" />
                        {errors.legalLast && <p className="text-destructive text-xs mt-1">{errors.legalLast}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Preferred Name <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input placeholder="First name" value={form.preferredFirst} onChange={(e) => set("preferredFirst", e.target.value)} className="bg-muted h-12" />
                      <Input placeholder="Last name" value={form.preferredLast} onChange={(e) => set("preferredLast", e.target.value)} className="bg-muted h-12" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pronouns">Pronouns <span className="text-muted-foreground font-normal">(optional)</span></Label>
                    <Input id="pronouns" value={form.pronouns} onChange={(e) => set("pronouns", e.target.value)} className="mt-1 bg-muted h-12" />
                  </div>

                  <div>
                    <Label className="mb-2 block">Date of Birth *</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="Year" inputMode="numeric" maxLength={4} value={form.dobYear} onChange={(e) => set("dobYear", e.target.value.replace(/\D/g, ""))} className="bg-muted h-12" />
                      <Input placeholder="Month" inputMode="numeric" maxLength={2} value={form.dobMonth} onChange={(e) => set("dobMonth", e.target.value.replace(/\D/g, ""))} className="bg-muted h-12" />
                      <Input placeholder="Day" inputMode="numeric" maxLength={2} value={form.dobDay} onChange={(e) => set("dobDay", e.target.value.replace(/\D/g, ""))} className="bg-muted h-12" />
                    </div>
                    {errors.dob && <p className="text-destructive text-xs mt-1">{errors.dob}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="mt-1 bg-muted h-12" />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-1 bg-muted h-12" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label>Would you like to join our mailing list for booking updates and exclusive offers? *</Label>
                    <YesNo value={form.mailingList} onChange={(v) => set("mailingList", v)} name="mailing" />
                    {errors.mailingList && <p className="text-destructive text-xs mt-1">{errors.mailingList}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label className="block">Address *</Label>
                    <div>
                      <Input placeholder="Street Address" value={form.street1} onChange={(e) => set("street1", e.target.value)} className="bg-muted h-12" />
                      {errors.street1 && <p className="text-destructive text-xs mt-1">{errors.street1}</p>}
                    </div>
                    <Input placeholder="Street Address Line 2 (optional)" value={form.street2} onChange={(e) => set("street2", e.target.value)} className="bg-muted h-12" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <Input placeholder="City" value={form.city} onChange={(e) => set("city", e.target.value)} className="bg-muted h-12" />
                        {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Input placeholder="Province" value={form.province} onChange={(e) => set("province", e.target.value)} className="bg-muted h-12" />
                        {errors.province && <p className="text-destructive text-xs mt-1">{errors.province}</p>}
                      </div>
                      <div>
                        <Input placeholder="Postal Code" value={form.postal} onChange={(e) => set("postal", e.target.value)} className="bg-muted h-12" />
                        {errors.postal && <p className="text-destructive text-xs mt-1">{errors.postal}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="artist">Artist *</Label>
                    <Select value={form.artist} onValueChange={(v) => set("artist", v)}>
                      <SelectTrigger id="artist" className="mt-1 bg-muted h-12">
                        <SelectValue placeholder="Select your artist" />
                      </SelectTrigger>
                      <SelectContent>
                        {ARTISTS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.artist && <p className="text-destructive text-xs mt-1">{errors.artist}</p>}
                  </div>
                </motion.div>
              )}

              {/* ───────── STEP 2 ───────── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h2 className="text-sm tracking-[0.15em] uppercase font-semibold mb-1">Step 2: Terms & Consent</h2>
                  </div>

                  <blockquote
                    className="border-l-4 pl-4 py-3 italic text-sm md:text-base bg-muted/50"
                    style={{ borderColor: BRAND }}
                  >
                    I acknowledge that by signing this document I will use the opportunity through email and in person to ask my artist any questions or address any concerns I may have about the tattoo process or the healing process, and will let my artist know about anything that may impede my ability to be tattooed or successfully heal.
                  </blockquote>

                  <ol className="space-y-4 list-decimal list-outside pl-5 text-sm leading-relaxed">
                    {TERMS.map((t, i) => <li key={i}>{t}</li>)}
                  </ol>

                  <div className="border-t border-border pt-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={form.termsAgreed}
                        onCheckedChange={(c) => set("termsAgreed", c === true)}
                        className="mt-1"
                      />
                      <span className="text-sm">I have read, understood, and agree to all of the terms set out above.</span>
                    </label>
                    {errors.termsAgreed && <p className="text-destructive text-xs mt-1">{errors.termsAgreed}</p>}
                  </div>
                </motion.div>
              )}

              {/* ───────── STEP 3 ───────── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h2 className="text-sm tracking-[0.15em] uppercase font-semibold mb-1">Step 3: Health Disclosure</h2>
                  </div>

                  <div>
                    <Label>Do you have skin conditions on the location selected for your tattoo? (e.g. rash, eczema, infection, psoriasis, scarring) *</Label>
                    <YesNo value={form.skinConditions} onChange={(v) => set("skinConditions", v)} name="skin" />
                    {errors.skinConditions && <p className="text-destructive text-xs mt-1">{errors.skinConditions}</p>}
                    {form.skinConditions === "yes" && (
                      <div className="mt-3">
                        <Label htmlFor="skinDetail">If yes, please identify the condition.</Label>
                        <Textarea id="skinDetail" value={form.skinConditionsDetail} onChange={(e) => set("skinConditionsDetail", e.target.value)} className="mt-1 bg-muted" />
                        {errors.skinConditionsDetail && <p className="text-destructive text-xs mt-1">{errors.skinConditionsDetail}</p>}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Do you have any allergies? (e.g. latex, adhesive, lavender, aloe) *</Label>
                    <YesNo value={form.allergies} onChange={(v) => set("allergies", v)} name="allergies" />
                    {errors.allergies && <p className="text-destructive text-xs mt-1">{errors.allergies}</p>}
                    {form.allergies === "yes" && (
                      <div className="mt-3">
                        <Label htmlFor="allergyDetail">If yes, please include the severity.</Label>
                        <Textarea id="allergyDetail" value={form.allergiesDetail} onChange={(e) => set("allergiesDetail", e.target.value)} className="mt-1 bg-muted" />
                        {errors.allergiesDetail && <p className="text-destructive text-xs mt-1">{errors.allergiesDetail}</p>}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Do you have any medical history that may affect the tattoo process or healing? (e.g. diabetes, blood thinning medication, epilepsy, blood-related disease) *</Label>
                    <YesNo value={form.medicalHistory} onChange={(v) => set("medicalHistory", v)} name="medical" />
                    {errors.medicalHistory && <p className="text-destructive text-xs mt-1">{errors.medicalHistory}</p>}
                    {form.medicalHistory === "yes" && (
                      <div className="mt-3">
                        <Label htmlFor="medDetail">If yes, please identify the condition.</Label>
                        <Textarea id="medDetail" value={form.medicalHistoryDetail} onChange={(e) => set("medicalHistoryDetail", e.target.value)} className="mt-1 bg-muted" />
                        {errors.medicalHistoryDetail && <p className="text-destructive text-xs mt-1">{errors.medicalHistoryDetail}</p>}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-5">
                    <h3 className="text-sm tracking-[0.15em] uppercase font-semibold mb-3">COVID-19 Specific Information</h3>
                    <ol className="space-y-3 list-decimal list-outside pl-5 text-sm leading-relaxed">
                      {COVID_STATEMENTS.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>

                    <div className="mt-5">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox checked={form.covidAgreed} onCheckedChange={(c) => set("covidAgreed", c === true)} className="mt-1" />
                        <span className="text-sm">I have read, understood, and agree to the COVID-19 statements above.</span>
                      </label>
                      {errors.covidAgreed && <p className="text-destructive text-xs mt-1">{errors.covidAgreed}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ───────── STEP 4 ───────── */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h2 className="text-sm tracking-[0.15em] uppercase font-semibold mb-1">Step 4: Declaration & Signature</h2>
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox checked={form.ageConfirmed} onCheckedChange={(c) => set("ageConfirmed", c === true)} className="mt-1" />
                      <span className="text-sm">I declare that I am at least 19 years of age — the minimum legal age to receive a tattoo in British Columbia — and that the date of birth provided in this form is true and accurate.</span>
                    </label>
                    {errors.ageConfirmed && <p className="text-destructive text-xs mt-1">{errors.ageConfirmed}</p>}
                  </div>

                  <div>
                    <p className="text-sm mb-2">
                      By signing below, I confirm that I have read and understood this entire document and that all information I have provided is true and accurate.
                    </p>
                    <SignaturePad onChange={setSignature} />
                    {errors.signature && <p className="text-destructive text-xs mt-1">{errors.signature}</p>}
                  </div>

                  {submitError && (
                    <div className="p-3 rounded border border-destructive/40 bg-destructive/10 text-destructive text-sm">
                      {submitError}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="mt-10 flex gap-3">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={back} disabled={submitting} className="flex-1 py-6 text-sm tracking-[0.15em] uppercase font-semibold">
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={next}
                  className="flex-1 py-6 text-sm tracking-[0.15em] uppercase font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  Continue <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-6 text-sm tracking-[0.15em] uppercase font-semibold text-white hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  {submitting ? (<><Loader2 size={16} className="mr-2 animate-spin" /> Submitting…</>) : "Submit Waiver"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Waiver;
