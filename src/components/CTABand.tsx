import { MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Button from "./Button";
import { Container } from "./Section";
import { contact } from "../lib/site";

interface CTABandProps {
  heading: string;
  body?: string;
  catalogue?: boolean;
  consultation?: boolean;
}

/** Recurring conversion band — one solid primary + supporting ghost actions. */
export default function CTABand({ heading, body, catalogue = true, consultation = true }: CTABandProps) {
  return (
    <section className="relative border-t border-white/8 py-20 md:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-md md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(106,154,168,0.35), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-medium leading-[1.1] tracking-tight text-soft-white md:text-4xl" style={{ textWrap: "balance" }}>
              {heading}
            </h2>
            {body && <p className="mt-4 text-lg leading-relaxed text-muted-silver">{body}</p>}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {catalogue ? (
                <Button to="/catalogue" variant="primary">
                  Request Catalogue <ArrowRight size={16} />
                </Button>
              ) : (
                <Button to="/contact" variant="primary">
                  Book a Consultation <ArrowRight size={16} />
                </Button>
              )}
              {consultation && catalogue && (
                <Button to="/contact" variant="secondary">
                  Book a Consultation
                </Button>
              )}
              {catalogue && (
                <Button href={contact.whatsappText} newTab variant="link">
                  <MessageCircle size={15} /> Chat on WhatsApp
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
