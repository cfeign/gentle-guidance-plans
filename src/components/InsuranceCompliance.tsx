import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface InsuranceComplianceProps {
  section: string;
}

const getComplianceTips = (section: string) => {
  const tips = {
    presenting_problems: [
      "Include specific symptoms and their frequency",
      "Document impact on daily functioning",
      "Note duration of symptoms",
    ],
    medical_conditions: [
      "List all current medications and dosages",
      "Include relevant medical diagnoses",
      "Document any hospitalizations",
    ],
    mental_health_history: [
      "Include previous treatment dates and providers",
      "Document past diagnoses",
      "Note treatment outcomes",
    ],
    trauma_history: [
      "Use specific diagnostic criteria language",
      "Document impact on current functioning",
      "Include safety planning if relevant",
    ],
    family_dynamics: [
      "Note family mental health history",
      "Document support system structure",
      "Include cultural considerations",
    ],
    diagnostic_impressions: [
      "Use current DSM criteria",
      "Include all relevant diagnoses",
      "Document rule-outs",
    ],
    treatment_recommendations: [
      "Specify frequency and duration",
      "Include evidence-based interventions",
      "Document medical necessity",
    ],
  };

  return tips[section as keyof typeof tips] || [];
};

export function InsuranceCompliance({ section }: InsuranceComplianceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tips = getComplianceTips(section);

  if (!tips.length) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-therapy-primary hover:text-therapy-primary/80 hover:bg-therapy-secondary/50 p-2"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Insurance Compliance Tips
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {tips.map((tip, index) => (
          <p key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-therapy-primary/30">
            {tip}
          </p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}