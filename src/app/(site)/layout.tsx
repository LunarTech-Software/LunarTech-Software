import InternalHeader from "@/components/internal/InternalHeader";
import InternalFooter from "@/components/internal/InternalFooter";

/** Every internal page shares this shell: compact nav + full-screen menu, ivory signature footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InternalHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <InternalFooter />
    </>
  );
}
