import { useState } from "react";
import { FileText, Download, Check } from "lucide-react";
import { Container, Section, Kicker } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { contact } from "../lib/site";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";
import { useCommonStrings } from "../lib/i18n/common";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-soft-white placeholder:text-technical-grey backdrop-blur-md outline-none transition-colors focus:border-lunar-teal/60";

const copy = {
  en: {
    heroKicker: "Catalogue",
    heroTitle: "The LUNAR Catalogue.",
    heroSubtitle: "A premium overview of our services, solution pillars, example projects, process, and contact details — in one PDF.",
    pdfLabel: "LUNAR — Catalogue",
    pdfServices: "Services · Solutions · Work · Process",
    pdfComingSoon: "PDF · Coming soon",
    description:
      "Explore LUNAR's digital engineering and automation solutions, including websites, custom business systems, automation, IoT monitoring, farm and factory monitoring, service-sector systems, and project examples.",
    thankYouHeading: "Thank you — your request is on its way.",
    thankYouBody: "Your email client should have opened with your request prefilled. We'll follow up shortly.",
    orWhatsapp: "Or chat on WhatsApp",
    requestPdf: "Request the PDF",
    namePlaceholder: "Name",
    companyPlaceholder: "Company",
    emailPlaceholder: "Email",
    industryPlaceholder: "Industry (optional)",
    whatsappPlaceholder: "WhatsApp (optional)",
    orRequestWhatsapp: "Or request via WhatsApp",
    privacyNote: "We'll only use your details to send the catalogue and follow up.",
    submitSubject: "LUNAR Catalogue Request",
  },
  id: {
    heroKicker: "Katalog",
    heroTitle: "Katalog LUNAR.",
    heroSubtitle: "Ringkasan premium layanan, pilar solusi, contoh proyek, proses, dan detail kontak kami — dalam satu PDF.",
    pdfLabel: "LUNAR — Katalog",
    pdfServices: "Layanan · Solusi · Karya · Proses",
    pdfComingSoon: "PDF · Segera hadir",
    description:
      "Jelajahi solusi rekayasa digital dan otomasi LUNAR, termasuk website, sistem bisnis kustom, otomasi, monitoring IoT, monitoring pertanian dan pabrik, sistem sektor jasa, dan contoh proyek.",
    thankYouHeading: "Terima kasih — permintaan Anda sedang diproses.",
    thankYouBody: "Email client Anda seharusnya sudah terbuka dengan permintaan Anda terisi otomatis. Kami akan segera menindaklanjuti.",
    orWhatsapp: "Atau chat di WhatsApp",
    requestPdf: "Minta PDF-nya",
    namePlaceholder: "Nama",
    companyPlaceholder: "Perusahaan",
    emailPlaceholder: "Email",
    industryPlaceholder: "Industri (opsional)",
    whatsappPlaceholder: "WhatsApp (opsional)",
    orRequestWhatsapp: "Atau minta lewat WhatsApp",
    privacyNote: "Kami hanya akan menggunakan data Anda untuk mengirim katalog dan menindaklanjuti.",
    submitSubject: "Permintaan Katalog LUNAR",
  },
};

export default function CataloguePage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const c = useCommonStrings();
  const { scopingNote } = useSiteData();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", industry: "", whatsapp: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nIndustry: ${form.industry}\nWhatsApp: ${form.whatsapp}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(t.submitSubject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle} />

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-panel to-void p-8 text-center">
                  <FileText size={40} className="text-lunar-teal" strokeWidth={1.4} />
                  <p className="mt-5 text-xl font-medium text-soft-white">{t.pdfLabel}</p>
                  <p className="mt-2 text-sm text-muted-silver">{t.pdfServices}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-technical-grey">{t.pdfComingSoon}</p>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-silver">{t.description}</p>
                <p className="mt-3 text-xs leading-relaxed text-technical-grey">{scopingNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={24} />
                  </span>
                  <h2 className="mt-5 text-2xl font-medium text-soft-white">{t.thankYouHeading}</h2>
                  <p className="mt-3 leading-relaxed text-muted-silver">{t.thankYouBody}</p>
                  <div className="mt-6">
                    <Button href={contact.whatsappCatalogueText} newTab variant="primary">
                      <Download size={16} /> {t.orWhatsapp}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <Kicker>{t.requestPdf}</Kicker>
                  <div className="space-y-4">
                    <input className={inputCls} placeholder={t.namePlaceholder} value={form.name} onChange={update("name")} />
                    <input className={inputCls} placeholder={t.companyPlaceholder} value={form.company} onChange={update("company")} />
                    <input className={inputCls} type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={update("email")} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input className={inputCls} placeholder={t.industryPlaceholder} value={form.industry} onChange={update("industry")} />
                      <input className={inputCls} placeholder={t.whatsappPlaceholder} value={form.whatsapp} onChange={update("whatsapp")} />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button onClick={submit} variant="primary" className="w-full sm:w-auto">
                      <Download size={16} /> {c.requestCatalogue}
                    </Button>
                    <Button href={contact.whatsappCatalogueText} newTab variant="secondary">
                      {t.orRequestWhatsapp}
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-technical-grey">{t.privacyNote}</p>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
