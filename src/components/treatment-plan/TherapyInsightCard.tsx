import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface TherapyInsightProps {
  modality: string;
  ageGroup: string;
}

const getInsightContent = (modality: string, ageGroup: string) => {
  const insights = {
    emdr: {
      children: {
        summary: "EMDR therapy shows strong efficacy for children with trauma and anxiety. Insurance coverage is typically good with documented trauma history.",
        details: [
          "90% insurance approval rate for trauma-related cases",
          "Average 12-15 sessions covered initially",
          "Strong evidence base for childhood PTSD and anxiety",
          "Requires specific certification documentation for coverage"
        ]
      },
      teens: {
        summary: "EMDR is highly effective for adolescent trauma and anxiety. Insurance coverage is favorable with proper documentation.",
        details: [
          "85% insurance approval rate for documented cases",
          "Initial coverage for 15-20 sessions typical",
          "Strong outcomes data for teen anxiety and PTSD",
          "May require periodic progress documentation"
        ]
      },
      adults: {
        summary: "EMDR has extensive research support for adult trauma treatment. Insurance coverage is well-established.",
        details: [
          "95% coverage rate for trauma-related diagnoses",
          "Standard 20-session initial authorization",
          "Strong support from major insurers",
          "Regular outcome measurement recommended"
        ]
      }
    },
    "animal-assisted": {
      children: {
        summary: "Animal-assisted therapy shows promising results for children. Insurance coverage varies but is improving.",
        details: [
          "60% coverage rate when combined with traditional therapy",
          "Usually requires additional documentation",
          "Growing evidence base for autism and anxiety",
          "Best results when integrated with CBT or play therapy"
        ]
      },
      teens: {
        summary: "Animal-assisted interventions show good outcomes for teen mental health. Coverage requires careful documentation.",
        details: [
          "70% approval rate with proper clinical justification",
          "Often covered under behavioral health riders",
          "Strong support for anxiety and depression cases",
          "Documentation of specific interventions crucial"
        ]
      },
      adults: {
        summary: "Animal-assisted therapy demonstrates effectiveness for adult anxiety and PTSD. Coverage improving annually.",
        details: [
          "75% coverage rate for anxiety-related diagnoses",
          "Usually requires specific provider credentials",
          "Growing acceptance by major insurers",
          "Best results documented in anxiety treatment"
        ]
      }
    }
  };

  return insights[modality as keyof typeof insights]?.[ageGroup as keyof (typeof insights)["emdr"]];
};

export function TherapyInsightCard({ modality, ageGroup }: TherapyInsightProps) {
  const [isOpen, setIsOpen] = useState(false);
  const insight = getInsightContent(modality, ageGroup);

  if (!insight) return null;

  return (
    <Card className="p-6 mb-8 bg-therapy-soft/30">
      <div className="space-y-4">
        <p className="text-gray-700">{insight.summary}</p>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="mt-4 space-y-2">
            {insight.details.map((detail, index) => (
              <p key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-therapy-primary/30">
                {detail}
              </p>
            ))}
          </CollapsibleContent>
          
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-therapy-primary hover:text-therapy-primary/80 hover:bg-therapy-secondary/50"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {isOpen ? "Show Less" : "Tell Me More"}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </Card>
  );
}