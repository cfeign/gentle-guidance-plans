import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { NoteControls } from "@/components/NoteControls";
import { VersionHistory } from "@/components/VersionHistory";
import { SampleSuggestions } from "@/components/SampleSuggestions";

interface Version {
  content: string;
  timestamp: Date;
  source: "AI Refinement" | "Insurer Check" | "DSM Alignment" | "Manual Edit";
}

interface NoteSectionProps {
  title: string;
  section: string;
  value: string;
  onChange: (value: string) => void;
  sampleNote: string;
  ageGroup: string;
  modality: string;
  isRefining: boolean;
  onRefine: () => void;
  versions: Version[];
  onRevert: (content: string) => void;
  latestChangeSource?: string;
}

export function NoteSection({
  title,
  section,
  value,
  onChange,
  sampleNote,
  ageGroup,
  modality,
  isRefining,
  onRefine,
  versions,
  onRevert,
  latestChangeSource,
}: NoteSectionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">
        <div className="bg-therapy-soft p-4 rounded-md">
          <p className="text-sm text-gray-600 italic mb-2">Sample: {sampleNote}</p>
          <SampleSuggestions section={section} ageGroup={ageGroup} modality={modality} />
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter your ${section} notes here...`}
          className="min-h-[150px]"
        />
        <div className="space-y-2">
          <NoteControls
            section={section}
            notes={value}
            isRefining={isRefining}
            onRefine={onRefine}
          />
          <VersionHistory
            versions={versions}
            onRevert={onRevert}
            latestChangeSource={latestChangeSource}
          />
        </div>
      </div>
    </Card>
  );
}