import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Toolkit from "./pages/Toolkit";
import Planner from "./pages/Planner";
import Bot from "./pages/Bot";
import MediaKit from "./pages/MediaKit";
import Referral from "./pages/Referral";
import Shop from "./pages/Shop";
import BioLink from "./pages/BioLink";
import BioLinkManager from "./pages/BioLinkManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/bot" element={<Bot />} />
          <Route path="/media-kit" element={<MediaKit />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bio-link" element={<BioLink />} />
          <Route path="/bio-link-manager" element={<BioLinkManager />} />
          <Route path="/bio/:username" element={<BioLink />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
