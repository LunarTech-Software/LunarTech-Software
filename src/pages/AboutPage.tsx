import { Container, Section, Kicker, Heading } from "../components/Section";
import PageHero from "../components/PageHero";
import StarfieldBackdrop from "../components/StarfieldBackdrop";
import Reveal from "../components/Reveal";
import CTABand from "../components/CTABand";
import IndustryStrip from "../components/home/IndustryStrip";
import { useSiteData } from "../lib/useSiteData";
import { useLanguage } from "../lib/i18n/LanguageContext";

const principlesByLang = {
  en: [
    { title: "Understand first.", body: "We learn how your operation really runs before we build anything." },
    { title: "Built to fit.", body: "Systems shaped around your workflow, not a template forced on top." },
    { title: "Engineering discipline.", body: "The reliability of engineering with the speed of modern software." },
    { title: "Honest and clear.", body: "We label demos as demos, ship a working first phase, and keep improving." },
  ],
  id: [
    { title: "Memahami terlebih dahulu.", body: "Kami mempelajari bagaimana operasi Anda benar-benar berjalan sebelum membangun apa pun." },
    { title: "Dibangun agar sesuai.", body: "Sistem dibentuk sesuai alur kerja Anda, bukan template yang dipaksakan." },
    { title: "Disiplin engineering.", body: "Keandalan engineering dengan kecepatan software modern." },
    { title: "Jujur dan jelas.", body: "Kami memberi label demo sebagai demo, merilis fase pertama yang berfungsi, dan terus menyempurnakan." },
  ],
};

const copy = {
  en: {
    heroKicker: "Who we are",
    heroTitle: "The orbit your operations organize around.",
    heroSubtitle: "LUNAR is a digital engineering and automation company that builds the systems real businesses run on.",
    nameKicker: "The name",
    nameHeading: "Built around the idea of orbit.",
    nameBody:
      "LUNAR represents a stable path where systems, data, automation, and operations move with clarity. We build the structure businesses operate from — bringing precision, visibility, and control into how real work gets done.",
    whyKicker: "Why we exist",
    why: [
      "Most businesses don't struggle for lack of effort. They lose time, money, and clarity to work spread across spreadsheets, paper, group chats, and manual checking. Everyone is busy, yet no one can see the whole picture.",
      "LUNAR exists to change that. We're a digital engineering company that builds the systems a business actually runs on — custom software, dashboards, automation, and IoT monitoring, each shaped around how your operation truly works rather than forced on top of it.",
      "We sit where software, engineering, business systems, and real-time monitoring meet. We understand the operation on the ground, map where it breaks, then design and build systems that give you visibility and control. The result isn't just technology — it's a clearer, calmer, more capable business.",
    ],
    whyClosing: "That's what our name means: an orbit, the stable path everything turns around. LUNAR is the orbit your operations organize themselves around.",
    thinkKicker: "How we think",
    thinkHeading: "Four principles we build by.",
    diffKicker: "What makes us different",
    diffHeading: "Five reasons clients trust the build.",
    ctaHeading: "Let's map your operation.",
    ctaBody: "Start with a conversation about how your business really runs today.",
  },
  id: {
    heroKicker: "Siapa kami",
    heroTitle: "Orbit tempat operasi Anda berputar.",
    heroSubtitle: "LUNAR adalah perusahaan rekayasa digital dan otomasi yang membangun sistem yang menjadi tulang punggung bisnis nyata.",
    nameKicker: "Arti nama",
    nameHeading: "Dibangun dari konsep orbit.",
    nameBody:
      "LUNAR mewakili jalur stabil tempat sistem, data, otomasi, dan operasi bergerak dengan jelas. Kami membangun struktur tempat bisnis beroperasi — menghadirkan presisi, visibilitas, dan kontrol ke dalam cara kerja yang sesungguhnya.",
    whyKicker: "Mengapa kami ada",
    why: [
      "Sebagian besar bisnis tidak kekurangan usaha. Mereka kehilangan waktu, uang, dan kejelasan karena pekerjaan tersebar di spreadsheet, kertas, grup chat, dan pengecekan manual. Semua orang sibuk, namun tidak ada yang bisa melihat gambaran keseluruhan.",
      "LUNAR hadir untuk mengubah itu. Kami adalah perusahaan rekayasa digital yang membangun sistem yang benar-benar dijalankan bisnis — perangkat lunak kustom, dasbor, otomasi, dan monitoring IoT, masing-masing dibentuk sesuai cara operasi Anda bekerja, bukan dipaksakan di atasnya.",
      "Kami berada di titik temu antara software, engineering, sistem bisnis, dan monitoring real-time. Kami memahami operasi di lapangan, memetakan di mana masalahnya, lalu merancang dan membangun sistem yang memberi Anda visibilitas dan kontrol. Hasilnya bukan sekadar teknologi — melainkan bisnis yang lebih jelas, tenang, dan mumpuni.",
    ],
    whyClosing: "Itulah arti nama kami: sebuah orbit, jalur stabil tempat segalanya berputar. LUNAR adalah orbit tempat operasi Anda berputar.",
    thinkKicker: "Bagaimana kami berpikir",
    thinkHeading: "Empat prinsip yang kami pegang.",
    diffKicker: "Apa yang membuat kami berbeda",
    diffHeading: "Lima alasan klien mempercayai hasil kerja kami.",
    ctaHeading: "Mari petakan operasi Anda.",
    ctaBody: "Mulai dengan percakapan tentang bagaimana bisnis Anda sebenarnya berjalan hari ini.",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const principles = principlesByLang[lang];
  const { differentiators } = useSiteData();

  return (
    <div>
      <StarfieldBackdrop />
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle} />

      {/* The name */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden>
          <svg viewBox="0 0 500 500" className="absolute right-[-10%] top-1/2 h-[130%] w-[130%] -translate-y-1/2 opacity-40">
            <ellipse cx="250" cy="250" rx="220" ry="92" fill="none" stroke="#6A9AA8" strokeWidth="1" className="animate-orbit-spin-slow" style={{ transformOrigin: "250px 250px" }} transform="rotate(-14 250 250)" />
            <ellipse cx="250" cy="250" rx="160" ry="66" fill="none" stroke="#5C88A0" strokeWidth="1" opacity="0.8" className="animate-orbit-spin-reverse" style={{ transformOrigin: "250px 250px" }} transform="rotate(10 250 250)" />
            <ellipse cx="250" cy="250" rx="100" ry="40" fill="none" stroke="#4E7393" strokeWidth="1" opacity="0.7" className="animate-orbit-spin" style={{ transformOrigin: "250px 250px" }} transform="rotate(-6 250 250)" />
            <circle cx="250" cy="250" r="3.5" fill="#6A9AA8" />
          </svg>
        </div>

        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <Kicker>{t.nameKicker}</Kicker>
              <Heading className="text-4xl md:text-5xl">{t.nameHeading}</Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-silver md:text-xl">{t.nameBody}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why we exist */}
      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <Kicker>{t.whyKicker}</Kicker>
            <div className="space-y-5 text-lg leading-relaxed text-muted-silver">
              {t.why.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-soft-white">{t.whyClosing}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* How we think */}
      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>{t.thinkKicker}</Kicker>
            <Heading className="text-3xl md:text-4xl">{t.thinkHeading}</Heading>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="text-lg font-medium text-soft-white">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-silver">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What makes us different */}
      <Section className="border-y border-white/8 bg-deep-space/40">
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <Kicker>{t.diffKicker}</Kicker>
            <Heading className="text-3xl md:text-4xl">{t.diffHeading}</Heading>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <span className="text-sm font-semibold tabular-nums text-lunar-teal">0{i + 1}</span>
                  <h3 className="mt-3 font-medium text-soft-white">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-silver">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <IndustryStrip />

      <CTABand heading={t.ctaHeading} body={t.ctaBody} />
    </div>
  );
}
