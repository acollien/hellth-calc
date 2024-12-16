import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { HealthProvider } from "@/contexts/HealthContext";
import Index from "@/pages/Index";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HealthProvider>
        <Index />
        <Toaster />
      </HealthProvider>
    </ThemeProvider>
  );
}

export default App;