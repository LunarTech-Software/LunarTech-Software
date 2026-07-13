import { useLanguage } from "./LanguageContext";

const common = {
  en: {
    requestCatalogue: "Request Catalogue",
    chatWhatsapp: "Chat on WhatsApp",
    emailEnquiry: "Email Enquiry",
    bookConsultation: "Book a Consultation",
    navigate: "Navigate",
    solutions: "Solutions",
    learnMore: "Learn more",
    footerCopyright: (year: number, location: string) => `© ${year} LunarTech ${location}. All rights reserved.`,
    footerNote: "Every project is scoped to your operation. We don't publish fixed prices.",
  },
  id: {
    requestCatalogue: "Minta Katalog",
    chatWhatsapp: "Chat di WhatsApp",
    emailEnquiry: "Kirim Email",
    bookConsultation: "Jadwalkan Konsultasi",
    navigate: "Navigasi",
    solutions: "Solusi",
    learnMore: "Selengkapnya",
    footerCopyright: (year: number, location: string) => `© ${year} LunarTech ${location}. Hak cipta dilindungi.`,
    footerNote: "Setiap proyek disesuaikan dengan operasi Anda. Kami tidak mempublikasikan harga tetap.",
  },
};

export function useCommonStrings() {
  const { lang } = useLanguage();
  return common[lang];
}
