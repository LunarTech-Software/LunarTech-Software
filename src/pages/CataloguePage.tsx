import { useState } from "react";
import { FileText, Download, Check } from "lucide-react";
import { Container, Section, Kicker } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import { contact } from "../lib/site";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-soft-white placeholder:text-technical-grey backdrop-blur-md outline-none transition-colors focus:border-lunar-teal/60";

export default function CataloguePage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", industry: "", whatsapp: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nIndustry: ${form.industry}\nWhatsApp: ${form.whatsapp}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("LUNAR Catalogue Request")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero
        kicker="Catalogue"
        title="The LUNAR Catalogue."
        subtitle="A premium overview of our services, solution pillars, example projects, process, and contact details — in one PDF."
      />

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-panel to-void p-8 text-center">
                  <FileText size={40} className="text-lunar-teal" strokeWidth={1.4} />
                  <p className="mt-5 text-xl font-medium text-soft-white">LUNAR — Catalogue</p>
                  <p className="mt-2 text-sm text-muted-silver">Services · Solutions · Work · Process</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-technical-grey">PDF · Coming soon</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={24} />
                  </span>
                  <h2 className="mt-5 text-2xl font-medium text-soft-white">Thank you — your request is on its way.</h2>
                  <p className="mt-3 leading-relaxed text-muted-silver">
                    Your email client should have opened with your request prefilled. We'll follow up shortly.
                  </p>
                  <div className="mt-6">
                    <Button href={contact.whatsappText} newTab variant="primary">
                      <Download size={16} /> Or chat on WhatsApp
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <Kicker>Request the PDF</Kicker>
                  <div className="space-y-4">
                    <input className={inputCls} placeholder="Name" value={form.name} onChange={update("name")} />
                    <input className={inputCls} placeholder="Company" value={form.company} onChange={update("company")} />
                    <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={update("email")} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input className={inputCls} placeholder="Industry (optional)" value={form.industry} onChange={update("industry")} />
                      <input className={inputCls} placeholder="WhatsApp (optional)" value={form.whatsapp} onChange={update("whatsapp")} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button onClick={submit} variant="primary" className="w-full sm:w-auto">
                      <Download size={16} /> Request Catalogue
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-technical-grey">We'll only use your details to send the catalogue and follow up.</p>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
