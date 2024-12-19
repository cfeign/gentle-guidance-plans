import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTreatmentSuggestions } from "@/hooks/useTreatmentSuggestions";
import { SuggestionItem } from "./SuggestionItem";

interface SampleSuggestionsProps {
  section: string;
  ageGroup: string;
  modality: string;
}

export function SampleSuggestions({ section, ageGroup, modality }: SampleSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: suggestions = [], isLoading, isError } = useTreatmentSuggestions(section, ageGroup, modality);

  console.log("Rendering suggestions:", { section, ageGroup, modality, suggestions });

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="text-therapy-primary">
        <Lightbulb className="w-4 h-4 mr-2" />
        Loading suggestions...
      </Button>
    );
  }

  if (isError || !suggestions || suggestions.length === 0) {
    return null;
  }

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
        {suggestions.map((suggestion: string, index: number) => (
          <SuggestionItem key={index} suggestion={suggestion} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}