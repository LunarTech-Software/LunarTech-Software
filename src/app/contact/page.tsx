"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { contact, contactCopy, projectTypes, scopingNote, solutions } from "@/lib/content";
import { Container, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const inputCls =
  "w-full rounded-xl border border-line bg-panel/40 px-4 py-3 text-foreground placeholder:text-technical outline-none transition-colors focus:border-accent/60";

function ContactForm() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const intentSlug = searchParams.get("intent");
  const intentSolution = solutions.find((s) => s.slug === intentSlug);

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: intentSolution ? t(intentSolution.name) : projectTypes[projectTypes.length - 1].en,
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    const body = `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nProject Type: ${form.type}\n\n${form.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`LUNAR Enquiry — ${form.type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="pt-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Kicker>{t(contactCopy.kicker)}</Kicker>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">{t(contactCopy.heading)}</h1>
          <p className="mt-4 text-lg text-muted">{t(contactCopy.subhead)}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="lunar-kicker mb-4 block">{t(contactCopy.quickRoutes)}</span>
            <div className="space-y-3">
              <a
                href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block font-medium text-foreground">{lang === "en" ? "Chat on WhatsApp" : "Chat di WhatsApp"}</span>
                  <span className="block text-sm text-muted">{t(contactCopy.fastestReply)}</span>
                </span>
              </a>
              <a href={contact.mailto} className="flex items-center gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-accent/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="block font-medium text-foreground">{lang === "en" ? "Email Enquiry" : "Kirim Email"}</span>
                  <span className="block text-sm text-muted">{contact.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-line p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <MapPin size={20} />
                </span>
                <span>
                  <span className="block font-medium text-foreground">{t(contactCopy.basedIn)}</span>
                  <span className="block text-sm text-muted">{contact.location}</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {sent ? (
              <div className="flex h-full flex-col justify-center rounded-2xl border border-line p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={24} />
                </span>
                <h2 className="mt-5 text-2xl font-medium text-foreground">{t(contactCopy.thanksHeading)}</h2>
                <p className="mt-3 leading-relaxed text-muted">{t(contactCopy.thanksBody)}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-line p-7 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder={t(contactCopy.namePlaceholder)} value={form.name} onChange={update("name")} />
                  <input className={inputCls} placeholder={t(contactCopy.companyPlaceholder)} value={form.company} onChange={update("company")} />
                </div>
                <input className={`${inputCls} mt-4`} type="email" placeholder={t(contactCopy.emailPlaceholder)} value={form.email} onChange={update("email")} />
                <select className={`${inputCls} mt-4 appearance-none`} value={form.type} onChange={update("type")}>
                  {projectTypes.map((pt) => (
                    <option key={pt.en} value={pt[lang]} className="bg-panel">
                      {t(pt)}
                    </option>
                  ))}
                </select>
                <textarea
                  className={`${inputCls} mt-4 min-h-32 resize-y`}
                  placeholder={t(contactCopy.messagePlaceholder)}
                  value={form.message}
                  onChange={update("message")}
                />
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={submit}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-void transition-colors hover:bg-accent"
                  >
                    {t(contactCopy.send)}
                  </button>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-technical">{t(scopingNote)}</p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
