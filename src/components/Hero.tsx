"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { hero, contact } from "@/lib/content";
import Button from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Section";

export default function Hero() {
  const { t, lang } = useLanguage();
  const [service, setService] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-void pt-24">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-70"
          poster="/images/cinematic/server-room.png"
        >
          <source src="/videos/hero-orbit.mp4" type="video/mp4" />
        </video>
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? (lang === "en" ? "Unmute video" : "Aktifkan suara video") : (lang === "en" ? "Mute video" : "Matikan suara video")}
          className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-void/60 text-foreground backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[70%]"
        style={{ background: "linear-gradient(to right, #030712 0%, #030712 55%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-void"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <Kicker>{t(hero.kicker)}</Kicker>
          <h1 className="text-[2.05rem] font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-[2.75rem] lg:text-[4.15rem] xl:text-[4.43rem] 2xl:text-[4.99rem]">
            {t(hero.headline)}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted lg:text-lg">{t(hero.subhead)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="primary">
              {lang === "en" ? "Request Catalogue" : "Minta Katalog"} <ArrowRight size={16} />
            </Button>
            <Button href={contact.whatsapp("Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.")} newTab variant="secondary">
              <MessageCircle size={16} /> {lang === "en" ? "Chat on WhatsApp" : "Chat di WhatsApp"}
            </Button>
            <Button href={contact.mailto} variant="link">
              <Mail size={15} /> {lang === "en" ? "Email Enquiry" : "Kirim Email"}
            </Button>
          </div>

          <div className="mt-10 max-w-lg">
            <span className="lunar-kicker mb-3 block">{lang === "en" ? "Choose your starting point" : "Pilih titik awal Anda"}</span>
            <div className="flex flex-wrap gap-2">
              {hero.serviceOptions.map((opt) => (
                <button
                  key={opt.en}
                  type="button"
                  onClick={() => setService(opt.en)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-colors ${
                    service === opt.en
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {t(opt)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          y: { duration: 2.4, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 flex justify-center pb-6"
      >
        <ChevronDown size={20} className="text-muted" />
      </motion.div>
    </section>
  );
}
