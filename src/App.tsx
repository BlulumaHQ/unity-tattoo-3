import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ArtistDetail from "./pages/ArtistDetail";
import TheShop from "./pages/TheShop";
import Aftercare from "./pages/Aftercare";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import GiftCard from "./pages/GiftCard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Helmet>
          <title>Unity Tattoo | Vancouver Tattoo Shop on Commercial Drive</title>
          <meta
            name="description"
            content="Unity Tattoo is a premier tattoo shop on Vancouver's Commercial Drive. Book your appointment with our talented team of artists specializing in fine line, realism, traditional, and custom designs."
          />
          <meta property="og:title" content="Unity Tattoo | Vancouver Tattoo Shop" />
          <meta property="og:description" content="Premier tattoo shop on Vancouver's Commercial Drive featuring exceptional artists and custom designs." />
          <meta property="og:type" content="website" />
        </Helmet>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/artists/:slug" element={<ArtistDetail />} />
              <Route path="/the-shop" element={<TheShop />} />
              <Route path="/aftercare" element={<Aftercare />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
              <Route path="/gift-card" element={<GiftCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
