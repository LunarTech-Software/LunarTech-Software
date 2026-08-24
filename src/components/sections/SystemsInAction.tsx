"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { automationPanel, dashboardPanel } from "@/lib/content";
import { Container, Kicker } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function SystemsInAction() {
  const { t } = useLanguage();
  return (
    <section className="lunar-section relative overflow-hidden border-t border-line">
      <Image
        src="/images/cinematic/server-room.png"
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div aria-hidden className="absolute inset-0 bg-void/70" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Kicker>{t(automationPanel.kicker)}</Kicker>
            <h3 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">{t(automationPanel.heading)}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t(automationPanel.body)}</p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {automationPanel.readouts.map((r) => (
                <div key={r.label.en} className="bg-void p-5">
                  <span className="text-2xl font-medium text-foreground">{r.value}</span>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-technical">{t(r.label)}</p>
                  <p className="mt-1 text-xs text-accent">{t(r.status)}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker>{t(dashboardPanel.kicker)}</Kicker>
            <h3 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">{t(dashboardPanel.heading)}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{t(dashboardPanel.body)}</p>

            <div className="mt-8 rounded-2xl border border-line bg-void p-5">
              <span className="text-[11px] uppercase tracking-[0.06em] text-technical">{t(dashboardPanel.mockLabel)}</span>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {dashboardPanel.kpis.map((k) => (
                  <div key={k.label.en}>
                    <span className="block text-lg font-medium text-foreground">{k.value}</span>
                    <span className="block text-[11px] text-muted">{t(k.label)}</span>
                    <span className="block text-[11px] text-accent">{k.delta}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2 border-t border-line pt-4">
                {dashboardPanel.statuses.map((s) => (
                  <div key={s.label.en} className="flex items-center justify-between text-xs">
                    <span className="text-muted">{t(s.label)}</span>
                    <span className="text-foreground">{t(s.status)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
