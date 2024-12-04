import { Button } from "@/components/ui/button";
import { History, RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Version {
  content: string;
  timestamp: Date;
  source: "AI Refinement" | "Insurer Check" | "DSM Alignment" | "Manual Edit";
}

interface VersionHistoryProps {
  versions: Version[];
  onRevert: (content: string) => void;
  latestChangeSource?: string;
}

export function VersionHistory({ versions, onRevert, latestChangeSource }: VersionHistoryProps) {
  if (!versions.length) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      {latestChangeSource && (
        <Badge variant="outline" className="bg-therapy-soft text-gray-600">
          Last saved: {latestChangeSource}
        </Badge>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="w-4 h-4" />
            Version History
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px]">
          {versions.map((version, index) => (
            <DropdownMenuItem
              key={index}
              className="flex flex-col items-start gap-1 py-2"
              onClick={() => onRevert(version.content)}
            >
              <div className="flex items-center gap-2 w-full">
                <RotateCcw className="w-4 h-4" />
                <span className="flex-1">{version.source}</span>
              </div>
              <span className="text-xs text-gray-500">
                {format(version.timestamp, "MMM d, yyyy h:mm a")}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}