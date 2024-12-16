import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HealthProvider } from "@/contexts/HealthContext";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <HealthProvider>
          <Index />
        </HealthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;