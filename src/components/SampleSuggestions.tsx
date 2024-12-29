import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SuggestionItem } from "./SuggestionItem";
import { useTreatmentSuggestions } from "@/hooks/useTreatmentSuggestions";
import { FormSectionProps } from "@/types/forms";

export function SampleSuggestions({ section, ageGroup, modality }: FormSectionProps) {

  const { suggestions, isLoading } = useTreatmentSuggestions(section, ageGroup, modality);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          View Examples
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ScrollArea className="h-72">
          <div className="space-y-4 p-4">
            <h4 className="font-medium leading-none">Sample Content</h4>
            <p className="text-sm text-muted-foreground">
              Click any suggestion to use it as a starting point
            </p>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading suggestions...</p>
            ) : (
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} content={suggestion} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
