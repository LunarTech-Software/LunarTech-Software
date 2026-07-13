import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import TechLogoMarquee from "../components/clients/TechLogoMarquee";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

const copy = {
  en: {
    heroKicker: "Clients",
    heroTitle: "Built for real operating environments.",
    heroSubtitle: "LUNAR is early. We're not going to show you fake logos or invented testimonials — here's who we build for.",
    segmentsKicker: "Client segments",
    segmentsHeading: "Every project starts with your operation, not a case study.",
    honestyKicker: "A note on honesty",
    honestyBody:
      "As real client work is delivered, this page will show logos, industries, and results — with permission, and only work we actually did. Until then, we'd rather show you nothing than show you something invented.",
    techKicker: "Technology we work with",
    techHeading: "Built with modern tools.",
    ctaHeading: "Be one of the first.",
    ctaBody: "Early clients get closer attention and a system shaped from scratch around their operation.",
  },
  id: {
    heroKicker: "Klien",
    heroTitle: "Dibangun untuk lingkungan operasi nyata.",
    heroSubtitle: "LUNAR masih baru. Kami tidak akan menampilkan logo palsu atau testimoni rekaan — berikut siapa yang kami layani.",
    segmentsKicker: "Segmen klien",
    segmentsHeading: "Setiap proyek dimulai dari operasi Anda, bukan studi kasus.",
    honestyKicker: "Catatan kejujuran",
    honestyBody:
      "Saat hasil kerja klien nyata mulai tersedia, halaman ini akan menampilkan logo, industri, dan hasil — dengan izin, dan hanya pekerjaan yang benar-benar kami lakukan. Sampai saat itu, kami lebih memilih tidak menampilkan apa pun daripada menampilkan sesuatu yang rekaan.",
    techKicker: "Teknologi yang kami gunakan",
    techHeading: "Dibangun dengan tools modern.",
    ctaHeading: "Jadilah yang pertama.",
    ctaBody: "Klien awal mendapat perhatian lebih dekat dan sistem yang dirancang dari awal sesuai operasi mereka.",
  },
};

export default function ClientsPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const { clientSegments } = useSiteData();

  return (
    <div>
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle} />

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>{t.segmentsKicker}</Kicker>
            <Heading className="text-3xl md:text-4xl">{t.segmentsHeading}</Heading>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientSegments.map((label, i) => (
              <Reveal key={label} delay={i * 0.04}>
                <div className="flex h-full items-center rounded-xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md">
                  <span className="font-medium text-soft-white">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>{t.honestyKicker}</Kicker>
            <p className="text-lg leading-relaxed text-muted-silver">{t.honestyBody}</p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Reveal className="mb-10 text-center">
          <Kicker>{t.techKicker}</Kicker>
          <Heading className="text-2xl md:text-3xl">{t.techHeading}</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <TechLogoMarquee />
        </Reveal>
      </Section>

      <CTABand heading={t.ctaHeading} body={t.ctaBody} />
    </div>
  );
}
