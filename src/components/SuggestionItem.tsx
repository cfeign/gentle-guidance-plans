import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SuggestionProps } from "@/types/forms";

export function SuggestionItem({ content, onClick, className }: SuggestionProps) {

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-left font-normal hover:bg-therapy-soft",
        className
      )}
      onClick={onClick}
    >
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {content}
      </p>
    </Button>
  );
}