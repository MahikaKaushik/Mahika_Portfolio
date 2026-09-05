import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import UCDCaseStudy from "./pages/UCDCaseStudy";
import SystemUnificationCaseStudy from "./pages/SystemUnificationCaseStudy";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* reducedMotion="user" makes every Framer Motion animation in the app
        respect the OS "reduce motion" setting — transform and layout animations
        are suppressed, opacity and colour fades still run. */}
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work/ucd" element={<UCDCaseStudy />} />
            {/* CR Control Tower is finished but held back: several screens carry a
                named employee's contact details and real customer names. Restore
                this line and drop comingSoon on its card in Index.tsx to publish. */}
            {/* <Route path="/work/control-tower" element={<CRControlTowerCaseStudy />} /> */}
            <Route path="/work/system-unification" element={<SystemUnificationCaseStudy />} />
            <Route path="/about" element={<AboutPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
