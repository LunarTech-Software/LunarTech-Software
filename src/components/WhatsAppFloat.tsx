import { MessageCircle } from "lucide-react";
import { contact } from "../lib/site";

/** Persistent floating WhatsApp CTA (secondary conversion path). */
export default function WhatsAppFloat() {
  return (
    <a
      href={contact.whatsappText}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-steel-teal to-lunar-teal text-void pl-3.5 pr-4 py-3 text-sm font-medium shadow-lg shadow-black/40 hover:brightness-110 transition-all"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
