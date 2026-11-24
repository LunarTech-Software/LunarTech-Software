import Header from "@/components/Header";
import InternalFooter from "@/components/internal/InternalFooter";

/** The hero's header is unchanged; the page now ends in the signature ivory footer. */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <InternalFooter />
    </>
  );
}
