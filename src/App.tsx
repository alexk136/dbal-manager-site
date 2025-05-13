import { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import ErrorPage from "./pages/ErrorPage";
import i18n from "@/i18n";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lang = location.pathname.split("/")[1];
    if (["ru", "en"].includes(lang)) {
      i18n.changeLanguage(lang);
      navigate("/", { replace: true });
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
