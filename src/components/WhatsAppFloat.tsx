import { MessageCircle } from "lucide-react";
import { contact } from "../lib/site";
import { useCommonStrings } from "../lib/i18n/common";

/** Persistent floating WhatsApp CTA (secondary conversion path). */
export default function WhatsAppFloat() {
  const c = useCommonStrings();
  return (
    <a
      href={contact.whatsappText}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.chatWhatsapp}
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-steel-teal to-lunar-teal text-void pl-3.5 pr-4 py-3 text-sm font-medium shadow-lg shadow-black/40 hover:brightness-110 transition-all"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">{c.chatWhatsapp}</span>
    </a>
  );
}
