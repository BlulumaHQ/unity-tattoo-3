import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import StickyBookingCTA from "./StickyBookingCTA";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <StickyBookingCTA />
    </div>
  );
};

export default Layout;
