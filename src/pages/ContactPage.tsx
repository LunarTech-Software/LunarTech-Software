import { useState } from "react";
import type { ChangeEvent } from "react";
import { MessageCircle, Mail, MapPin, Check } from "lucide-react";
import { Container, Section, Kicker } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { contact } from "../lib/site";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

/** value = stable English key used in the mailto subject; label = displayed, localized text. */
const PROJECT_TYPES = [
  { value: "Website / Digital Presence", en: "Website / Digital Presence", id: "Website / Kehadiran Digital" },
  { value: "Custom Business System", en: "Custom Business System", id: "Sistem Bisnis Kustom" },
  { value: "Automation / IoT Monitoring", en: "Automation / IoT Monitoring", id: "Otomasi / Monitoring IoT" },
  { value: "Agriculture / Plantation Monitoring", en: "Agriculture / Plantation Monitoring", id: "Monitoring Pertanian / Perkebunan" },
  { value: "Factory / Facility Monitoring", en: "Factory / Facility Monitoring", id: "Monitoring Pabrik / Fasilitas" },
  { value: "Education / STEM", en: "Education / STEM", id: "Pendidikan / STEM" },
  { value: "Service Sector System", en: "Service Sector System", id: "Sistem Sektor Jasa" },
  { value: "CCTV / Facility Monitoring", en: "CCTV / Facility Monitoring", id: "CCTV / Monitoring Fasilitas" },
  { value: "Catalogue Request", en: "Catalogue Request", id: "Permintaan Katalog" },
  { value: "General Enquiry", en: "General Enquiry", id: "Pertanyaan Umum" },
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-soft-white placeholder:text-technical-grey backdrop-blur-md outline-none transition-colors focus:border-lunar-teal/60";

const copy = {
  en: {
    heroKicker: "Start a project",
    heroTitle: "Let's map your operation.",
    heroSubtitle: "Tell us how your business runs today. We'll take it from there.",
    quickRoutes: "Quick routes",
    chatWhatsapp: "Chat on WhatsApp",
    fastestReply: "Fastest reply",
    emailEnquiry: "Email Enquiry",
    basedIn: "Based in",
    thanksHeading: "Thanks — we'll be in touch shortly.",
    thanksBody: "Your email client should have opened with your enquiry prefilled. If it's urgent, WhatsApp is the fastest way to reach us.",
    namePlaceholder: "Name",
    companyPlaceholder: "Company",
    emailPlaceholder: "Email",
    messagePlaceholder: "Tell us a little about your operation and what you'd like to see or control.",
    sendEnquiry: "Send enquiry",
  },
  id: {
    heroKicker: "Mulai proyek",
    heroTitle: "Mari petakan operasi Anda.",
    heroSubtitle: "Ceritakan bagaimana bisnis Anda berjalan hari ini. Kami akan melanjutkan dari sana.",
    quickRoutes: "Jalur cepat",
    chatWhatsapp: "Chat di WhatsApp",
    fastestReply: "Balasan tercepat",
    emailEnquiry: "Kirim Email",
    basedIn: "Berlokasi di",
    thanksHeading: "Terima kasih — kami akan segera menghubungi Anda.",
    thanksBody: "Email client Anda seharusnya sudah terbuka dengan pertanyaan Anda terisi otomatis. Jika mendesak, WhatsApp adalah cara tercepat menghubungi kami.",
    namePlaceholder: "Nama",
    companyPlaceholder: "Perusahaan",
    emailPlaceholder: "Email",
    messagePlaceholder: "Ceritakan sedikit tentang operasi Anda dan apa yang ingin Anda lihat atau kendalikan.",
    sendEnquiry: "Kirim pertanyaan",
  },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { scopingNote } = useSiteData();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: PROJECT_TYPES[0].value,
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nProject Type: ${form.type}\n\n${form.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`LUNAR Enquiry — ${form.type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle} />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Kicker>{t.quickRoutes}</Kicker>
              <div className="space-y-3">
                <a
                  href={contact.whatsappText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lunar-teal/10 text-lunar-teal">
                    <MessageCircle size={20} />
                  </span>
                  <span>
                    <span className="block font-medium text-soft-white">{t.chatWhatsapp}</span>
                    <span className="block text-sm text-muted-silver">{t.fastestReply}</span>
                  </span>
                </a>
                <a
                  href={contact.mailto}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lunar-teal/10 text-lunar-teal">
                    <Mail size={20} />
                  </span>
                  <span>
                    <span className="block font-medium text-soft-white">{t.emailEnquiry}</span>
                    <span className="block text-sm text-muted-silver">{contact.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lunar-teal/10 text-lunar-teal">
                    <MapPin size={20} />
                  </span>
                  <span>
                    <span className="block font-medium text-soft-white">{t.basedIn}</span>
                    <span className="block text-sm text-muted-silver">{contact.location}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={24} />
                  </span>
                  <h2 className="mt-5 text-2xl font-medium text-soft-white">{t.thanksHeading}</h2>
                  <p className="mt-3 leading-relaxed text-muted-silver">{t.thanksBody}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={inputCls} placeholder={t.namePlaceholder} value={form.name} onChange={update("name")} />
                    <input className={inputCls} placeholder={t.companyPlaceholder} value={form.company} onChange={update("company")} />
                  </div>
                  <input className={`${inputCls} mt-4`} type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={update("email")} />
                  <select className={`${inputCls} mt-4 appearance-none`} value={form.type} onChange={update("type")}>
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt.value} value={pt.value} className="bg-panel">
                        {pt[lang]}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className={`${inputCls} mt-4 min-h-32 resize-y`}
                    placeholder={t.messagePlaceholder}
                    value={form.message}
                    onChange={update("message")}
                  />
                  <div className="mt-6">
                    <Button onClick={submit} variant="primary">
                      {t.sendEnquiry}
                    </Button>
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-technical-grey">{scopingNote}</p>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
