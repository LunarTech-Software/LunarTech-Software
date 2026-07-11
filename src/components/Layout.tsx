import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppFloat from "./WhatsAppFloat";
import SmoothScroll from "./SmoothScroll";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-void text-soft-white font-sans antialiased overflow-x-hidden">
      <ScrollToTop />
      <SmoothScroll>
        <Navbar />
        <main className="relative z-10">
          <Outlet />
        </main>
        <Footer />
      </SmoothScroll>
      <WhatsAppFloat />
    </div>
  );
}
