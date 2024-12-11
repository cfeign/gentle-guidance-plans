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
  const { data: suggestions = [], isLoading } = useTreatmentSuggestions(section, ageGroup, modality);

  if (isLoading || !suggestions.length) return null;

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
          <SuggestionItem key={index} suggestion={suggestion} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}