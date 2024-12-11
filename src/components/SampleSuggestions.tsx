import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SampleSuggestionsProps {
  section: string;
  ageGroup: string;
  modality: string;
}

const getSuggestions = (section: string, ageGroup: string, modality: string) => {
  const suggestions = {
    emdr: {
      children: {
        presenting_problems: [
          "Behavioral changes after traumatic event",
          "Sleep disturbances or nightmares",
          "Difficulty concentrating in school",
        ],
        medical_conditions: [
          "Current medications and dosages",
          "Previous therapy experiences",
          "Physical symptoms related to trauma",
        ],
        mental_health_history: [
          "Previous trauma treatment attempts",
          "Family mental health background",
          "School counseling history",
        ],
        trauma_history: [
          "Age-appropriate trauma assessment",
          "Impact on daily functioning",
          "Parent/caregiver observations",
        ],
        family_dynamics: [
          "Family support system",
          "Parent/caregiver involvement",
          "Home environment stability",
        ],
        diagnostic_impressions: [
          "Age-appropriate PTSD symptoms",
          "Developmental considerations",
          "Attachment patterns",
        ],
        treatment_recommendations: [
          "Child-adapted EMDR protocol",
          "Play therapy integration",
          "Parent/caregiver involvement plan",
        ],
      },
      teens: {
        presenting_problems: [
          "Academic performance changes",
          "Social relationship difficulties",
          "Emotional regulation challenges",
        ],
        medical_conditions: [
          "Current medications",
          "Physical health status",
          "Sleep patterns",
        ],
        mental_health_history: [
          "Previous counseling experiences",
          "School-based interventions",
          "Family therapy history",
        ],
        trauma_history: [
          "Detailed trauma timeline",
          "Impact on development",
          "Coping mechanisms used",
        ],
        family_dynamics: [
          "Parent-teen relationship",
          "Sibling dynamics",
          "Support system assessment",
        ],
        diagnostic_impressions: [
          "PTSD criteria evaluation",
          "Comorbid conditions",
          "Risk assessment",
        ],
        treatment_recommendations: [
          "Standard EMDR protocol adaptation",
          "School coordination plan",
          "Family involvement strategy",
        ],
      },
      adults: {
        presenting_problems: [
          "Current trauma symptoms",
          "Work/relationship impact",
          "Daily functioning assessment",
        ],
        medical_conditions: [
          "Physical health status",
          "Current medications",
          "Sleep and appetite patterns",
        ],
        mental_health_history: [
          "Previous therapy experiences",
          "Treatment outcomes",
          "Coping strategies used",
        ],
        trauma_history: [
          "Comprehensive trauma assessment",
          "Impact on life domains",
          "Previous treatment attempts",
        ],
        family_dynamics: [
          "Current support system",
          "Relationship patterns",
          "Family mental health history",
        ],
        diagnostic_impressions: [
          "PTSD diagnostic criteria",
          "Comorbid conditions",
          "Functional impairment",
        ],
        treatment_recommendations: [
          "Standard EMDR protocol",
          "Treatment frequency",
          "Progress monitoring plan",
        ],
      },
    },
    "animal-assisted": {
      children: {
        presenting_problems: [
          "Anxiety or fear responses",
          "Social interaction difficulties",
          "Emotional regulation challenges",
        ],
        medical_conditions: [
          "Allergies assessment",
          "Physical health status",
          "Previous animal interactions",
        ],
        mental_health_history: [
          "Previous therapy experiences",
          "Response to animals",
          "School-based interventions",
        ],
        trauma_history: [
          "Animal-related experiences",
          "Comfort with animals",
          "Safety considerations",
        ],
        family_dynamics: [
          "Family pet history",
          "Home environment",
          "Support system",
        ],
        diagnostic_impressions: [
          "Behavioral observations",
          "Animal interaction assessment",
          "Treatment suitability",
        ],
        treatment_recommendations: [
          "Animal selection plan",
          "Integration strategy",
          "Safety protocols",
        ],
      },
      teens: {
        presenting_problems: [
          "Social anxiety symptoms",
          "Emotional regulation",
          "Self-esteem concerns",
        ],
        medical_conditions: [
          "Health considerations",
          "Allergies assessment",
          "Physical limitations",
        ],
        mental_health_history: [
          "Previous interventions",
          "Animal interaction history",
          "Treatment preferences",
        ],
        trauma_history: [
          "Trauma impact assessment",
          "Animal-related experiences",
          "Safety considerations",
        ],
        family_dynamics: [
          "Family support system",
          "Pet relationships",
          "Home environment",
        ],
        diagnostic_impressions: [
          "Clinical assessment",
          "Animal therapy suitability",
          "Treatment goals",
        ],
        treatment_recommendations: [
          "Animal therapy protocol",
          "Integration plan",
          "Progress monitoring",
        ],
      },
      adults: {
        presenting_problems: [
          "Current symptoms",
          "Functional impact",
          "Treatment goals",
        ],
        medical_conditions: [
          "Health status",
          "Allergies/concerns",
          "Physical limitations",
        ],
        mental_health_history: [
          "Previous treatment",
          "Animal interactions",
          "Therapeutic preferences",
        ],
        trauma_history: [
          "Trauma assessment",
          "Animal experiences",
          "Safety planning",
        ],
        family_dynamics: [
          "Support system",
          "Living situation",
          "Pet relationships",
        ],
        diagnostic_impressions: [
          "Clinical evaluation",
          "Treatment suitability",
          "Goal assessment",
        ],
        treatment_recommendations: [
          "Treatment protocol",
          "Animal integration",
          "Progress measures",
        ],
      },
    },
  };

  return suggestions[modality as keyof typeof suggestions]?.[ageGroup as keyof (typeof suggestions)["emdr"]]?.[section as keyof typeof suggestions["emdr"]["children"]] || [];
};

export function SampleSuggestions({ section, ageGroup, modality }: SampleSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = getSuggestions(section, ageGroup, modality);

  if (!suggestions.length) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-therapy-primary hover:text-therapy-primary/80 hover:bg-therapy-secondary/50 p-2"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Help Explore More Ideas
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        {suggestions.map((suggestion, index) => (
          <p key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-therapy-primary/30">
            {suggestion}
          </p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}