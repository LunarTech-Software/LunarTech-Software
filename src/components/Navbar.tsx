import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { contact } from "../lib/site";
import { useSiteData } from "../lib/useSiteData";
import { useCommonStrings } from "../lib/i18n/common";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { navLinks } = useSiteData();
  const c = useCommonStrings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center transition-colors duration-300 ${
          scrolled ? "bg-void border-b border-white/10" : "bg-transparent"
        }`}
      >
        <Logo size={28} />

        <nav className="hidden lg:flex items-center gap-7 text-[15px] text-muted-silver">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-soft-white ${isActive ? "text-soft-white" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Button to="/catalogue" variant="primary" className="!px-5 !py-2.5 text-xs">
            {c.requestCatalogue}
          </Button>
        </div>

        <button
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`w-6 h-[2px] bg-soft-white transition-all duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`w-6 h-[2px] bg-soft-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-soft-white transition-all duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-sm lg:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-medium tracking-tight ${isActive ? "text-lunar-teal" : "text-soft-white"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="flex flex-col items-center gap-4 mt-6 w-64">
                <LanguageSwitcher className="mb-2" />
                <Button to="/catalogue" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  {c.requestCatalogue}
                </Button>
                <Button href={contact.whatsappText} newTab variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                  <MessageCircle size={16} /> {c.chatWhatsapp}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
