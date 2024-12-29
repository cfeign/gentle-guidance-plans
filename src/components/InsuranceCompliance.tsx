import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AlertCircle } from "lucide-react";

type Section = 'presenting_problems' | 'diagnostic_impressions' | 'treatment_recommendations';

interface InsuranceComplianceProps {
  section: Section;
}

const complianceGuidelines: Record<Section, string> = {
  presenting_problems: "Include specific symptoms, duration, and impact on daily functioning. Avoid generalizations.",
  diagnostic_impressions: "Use current DSM criteria. Support diagnosis with specific observed symptoms and reported history.",
  treatment_recommendations: "Ensure recommendations are evidence-based and appropriate for diagnosis. Include frequency and duration.",
};


export function InsuranceCompliance({ section }: InsuranceComplianceProps) {
  const guidelines = complianceGuidelines[section];

  if (!guidelines) {
    return null;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">
          <AlertCircle className="w-4 h-4 mr-2" />
          Compliance Tips
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Insurance Compliance Guidelines</h4>
          <p className="text-sm text-muted-foreground">{guidelines}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
