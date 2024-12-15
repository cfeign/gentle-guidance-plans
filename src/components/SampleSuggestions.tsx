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
        assessment: [
          "Consider incorporating play therapy elements to assess trauma impact",
          "Use age-appropriate metaphors for explaining feelings and symptoms",
          "Include parent/caregiver observations of behavioral changes",
        ],
        structure: [
          "Start with shorter sessions (30-45 minutes) and gradually increase",
          "Include regular parent check-ins at the beginning of sessions",
          "Use creative activities for bilateral stimulation",
        ],
        intervention: [
          "Incorporate favorite toys/characters in safe place development",
          "Use storytelling to process difficult memories",
          "Implement child-friendly bilateral stimulation methods",
        ],
      },
      teens: {
        assessment: [
          "Include academic and social media impact assessment",
          "Evaluate peer relationships and support systems",
          "Assess for co-occurring anxiety or depression",
        ],
        structure: [
          "Balance individual processing with family involvement",
          "Include homework assignments for skill practice",
          "Consider group therapy components",
        ],
        intervention: [
          "Use music or art for bilateral stimulation",
          "Incorporate mindfulness techniques",
          "Address negative self-beliefs related to trauma",
        ],
      },
      adults: {
        assessment: [
          "Evaluate impact on work and relationships",
          "Include detailed trauma history timeline",
          "Assess for dissociative symptoms",
        ],
        structure: [
          "Standard 60-90 minute sessions",
          "Regular progress evaluation",
          "Incorporate relapse prevention planning",
        ],
        intervention: [
          "Use cognitive interweaves for stuck points",
          "Implement workplace-specific coping strategies",
          "Address attachment-related issues",
        ],
      },
    },
    "animal-assisted": {
      children: {
        assessment: [
          "Observe child-animal interactions for attachment patterns",
          "Assess comfort level with different animals",
          "Include family's experience with pets",
        ],
        structure: [
          "Short sessions with varied animal interactions",
          "Include animal care education",
          "Incorporate family in animal activities",
        ],
        intervention: [
          "Use animals for emotional regulation practice",
          "Teach gentle touch and boundaries",
          "Incorporate animal-themed art therapy",
        ],
      },
      teens: {
        assessment: [
          "Evaluate interest in animal-related activities",
          "Assess for allergies or phobias",
          "Include goals related to animal interaction",
        ],
        structure: [
          "Combine individual and group sessions",
          "Include animal care responsibilities",
          "Regular progress documentation",
        ],
        intervention: [
          "Use animal training for confidence building",
          "Incorporate journaling about animal interactions",
          "Practice social skills through animal care",
        ],
      },
      adults: {
        assessment: [
          "Review previous experience with animals",
          "Assess comfort with different species",
          "Evaluate stress response to animals",
        ],
        structure: [
          "Progressive exposure to different animals",
          "Include mindfulness with animals",
          "Regular evaluation of comfort levels",
        ],
        intervention: [
          "Use animals for grounding exercises",
          "Practice emotional regulation through animal interaction",
          "Incorporate animal-assisted mindfulness",
        ],
      },
    },
  };

  return suggestions[modality as keyof typeof suggestions]?.[ageGroup as keyof (typeof suggestions)["emdr"]]?.[section as keyof typeof suggestions["emdr"]["children"]] || [];
};

export function SampleSuggestions({ section, ageGroup, modality }: SampleSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = getSuggestions(section, ageGroup, modality);

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