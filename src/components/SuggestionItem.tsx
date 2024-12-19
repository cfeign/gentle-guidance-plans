interface SuggestionItemProps {
  suggestion: string;
}

export function SuggestionItem({ suggestion }: SuggestionItemProps) {
  return (
    <p className="text-sm text-gray-600 pl-4 border-l-2 border-therapy-primary/30">
      {suggestion}
    </p>
  );
}