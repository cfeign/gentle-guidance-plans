import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AgeGroupSelectorProps {
  selected: string;
  onChange: (group: string) => void;
}

export function AgeGroupSelector({ selected, onChange }: AgeGroupSelectorProps) {
  const ageGroups = [
    { id: "children", label: "Kids & Young Children (3-12)" },
    { id: "teens", label: "Teens & Youth (13-17)" },
    { id: "adults", label: "Adults (18+)" },
  ];

  return (
    <div className="flex space-x-4 p-4 bg-therapy-secondary/20 rounded-lg">
      {ageGroups.map((group) => (
        <Button
          key={group.id}
          onClick={() => onChange(group.id)}
          variant="ghost"
          className={cn(
            "px-6 py-2 rounded-full transition-all duration-300",
            selected === group.id
              ? "bg-therapy-primary text-white"
              : "hover:bg-therapy-secondary"
          )}
        >
          {group.label}
        </Button>
      ))}
    </div>
  );
}