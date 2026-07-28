import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
