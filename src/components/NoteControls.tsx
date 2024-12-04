import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, CheckSquare, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface NoteControlsProps {
  section: string;
  notes: string;
  isRefining: boolean;
  onRefine: () => void;
}

export function NoteControls({ section, notes, isRefining, onRefine }: NoteControlsProps) {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [isAligning, setIsAligning] = useState(false);

  const insurers = [
    "Blue Cross Blue Shield",
    "United Healthcare",
    "Aetna"
  ];

  const checkInsurerStandards = (insurer: string) => {
    setIsChecking(true);
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Standards Check Complete",
        description: `Notes aligned with ${insurer} standards. No issues found.`,
        className: "bg-green-500 text-white",
      });
      setIsChecking(false);
    }, 1500);
  };

  const alignWithDSM = () => {
    setIsAligning(true);
    // Mock API call
    setTimeout(() => {
      toast({
        title: "DSM Alignment Complete",
        description: "Notes have been verified against DSM-5 criteria.",
        className: "bg-green-500 text-white",
      });
      setIsAligning(false);
    }, 1500);
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="outline"
        onClick={onRefine}
        disabled={isRefining}
        className="flex-1"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isRefining ? "Refining..." : "Refine with AI"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            disabled={isChecking}
            className="flex-1"
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            {isChecking ? "Checking..." : "Check Insurer Standards"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {insurers.map((insurer) => (
            <DropdownMenuItem
              key={insurer}
              onClick={() => checkInsurerStandards(insurer)}
            >
              {insurer}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        onClick={alignWithDSM}
        disabled={isAligning}
        className="flex-1"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        {isAligning ? "Aligning..." : "Align with DSM"}
      </Button>
    </div>
  );
}