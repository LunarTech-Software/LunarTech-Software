import { useState } from "react";
import type { ChangeEvent } from "react";
import { MessageCircle, Mail, MapPin, Check } from "lucide-react";
import { Container, Section, Kicker } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { contact, scopingNote } from "../lib/site";

const projectTypes = [
  "Website / Digital Presence",
  "Business System",
  "Dashboard",
  "Automation / IoT Monitoring",
  "Farm / Plantation Monitoring",
  "Factory / Facility Monitoring",
  "Education / STEM",
  "General Enquiry",
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-soft-white placeholder:text-technical-grey backdrop-blur-md outline-none transition-colors focus:border-lunar-teal/60";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: projectTypes[0],
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
      <PageHero
        kicker="Start a project"
        title="Let's map your operation."
        subtitle="Tell us how your business runs today. We'll take it from there."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Kicker>Quick routes</Kicker>
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
                    <span className="block font-medium text-soft-white">Chat on WhatsApp</span>
                    <span className="block text-sm text-muted-silver">Fastest reply</span>
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
                    <span className="block font-medium text-soft-white">Email Enquiry</span>
                    <span className="block text-sm text-muted-silver">{contact.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lunar-teal/10 text-lunar-teal">
                    <MapPin size={20} />
                  </span>
                  <span>
                    <span className="block font-medium text-soft-white">Based in</span>
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
                  <h2 className="mt-5 text-2xl font-medium text-soft-white">Thanks — we'll be in touch shortly.</h2>
                  <p className="mt-3 leading-relaxed text-muted-silver">
                    Your email client should have opened with your enquiry prefilled. If it's urgent, WhatsApp
                    is the fastest way to reach us.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={inputCls} placeholder="Name" value={form.name} onChange={update("name")} />
                    <input className={inputCls} placeholder="Company" value={form.company} onChange={update("company")} />
                  </div>
                  <input className={`${inputCls} mt-4`} type="email" placeholder="Email" value={form.email} onChange={update("email")} />
                  <select className={`${inputCls} mt-4 appearance-none`} value={form.type} onChange={update("type")}>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-panel">
                        {t}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className={`${inputCls} mt-4 min-h-32 resize-y`}
                    placeholder="Tell us a little about your operation and what you'd like to see or control."
                    value={form.message}
                    onChange={update("message")}
                  />
                  <div className="mt-6">
                    <Button onClick={submit} variant="primary">
                      Send enquiry
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
