import { Link } from "react-router-dom";
import { MessageCircle, Mail } from "lucide-react";
import Logo from "./Logo";
import { contact } from "../lib/site";
import { useSiteData } from "../lib/useSiteData";
import { useCommonStrings } from "../lib/i18n/common";

export default function Footer() {
  const { navLinks, solutions, tagline } = useSiteData();
  const c = useCommonStrings();

  return (
    <footer className="relative z-10 border-t border-white/8 bg-deep-space">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={30} />
            <p className="mt-5 text-muted-silver max-w-xs leading-relaxed">{tagline}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-silver">
              <a
                href={contact.whatsappText}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-soft-white transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href={contact.mailto} className="inline-flex items-center gap-2 hover:text-soft-white transition-colors">
                <Mail size={15} /> {contact.email}
              </a>
              <span className="text-technical-grey">{contact.location}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.24em] uppercase text-technical-grey mb-4">{c.navigate}</h4>
            <ul className="space-y-3 text-sm text-muted-silver">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-soft-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.24em] uppercase text-technical-grey mb-4">{c.solutions}</h4>
            <ul className="space-y-3 text-sm text-muted-silver">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions/${s.slug}`} className="hover:text-soft-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row gap-3 justify-between text-xs text-technical-grey">
          <span>{c.footerCopyright(new Date().getFullYear(), contact.location)}</span>
          <span>{c.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
