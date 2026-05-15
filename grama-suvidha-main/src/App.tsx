import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./pages/Welcome.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Overview from "./pages/Overview.tsx";
import Ongoing from "./pages/sections/Ongoing.tsx";
import Pending from "./pages/sections/Pending.tsx";
import Completed from "./pages/sections/Completed.tsx";
import Ratings from "./pages/sections/Ratings.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LanguageProvider } from "./i18n/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="ongoing" element={<Ongoing />} />
              <Route path="pending" element={<Pending />} />
              <Route path="completed" element={<Completed />} />
              <Route path="ratings" element={<Ratings />} />
            </Route>
            <Route path="/project/:id" element={<ProjectDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
