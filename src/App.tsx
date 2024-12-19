import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Index from "./pages/Index";
import TreatmentPlanForm from "./pages/TreatmentPlanForm";
import IntakeForm from "./pages/IntakeForm";
import IntakeAndAssessments from "./pages/IntakeAndAssessments";
import { RoleSelector } from "./components/RoleSelector";

const queryClient = new QueryClient();

export type UserRole = "therapist" | "client";

export const RoleContext = createContext<{
  role: UserRole;
  setRole: (role: UserRole) => void;
}>({
  role: "therapist",
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);

const App = () => {
  const [role, setRole] = useState<UserRole>("therapist");

  return (
    <QueryClientProvider client={queryClient}>
      <RoleContext.Provider value={{ role, setRole }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-b from-white to-therapy-secondary/20">
              <div className="container mx-auto p-4">
                <RoleSelector />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/treatment-plan" element={<TreatmentPlanForm />} />
                  <Route path="/intake" element={<IntakeForm />} />
                  <Route path="/records" element={<IntakeAndAssessments />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RoleContext.Provider>
    </QueryClientProvider>
  );
};

export default App;