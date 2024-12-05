import { Card } from "@/components/ui/card";
import { SampleSuggestions } from "../SampleSuggestions";
import { NoteSection } from "../NoteSection";

interface PlanSectionProps {
  title: string;
  section: string;
  value: string;
  onChange: (value: string) => void;
  sampleNote: string;
  ageGroup: string;
  modality: string;
  isRefining: boolean;
  onRefine: () => void;
  versions: any[];
  onRevert: (content: string) => void;
  latestChangeSource?: string;
}

export function PlanSection({
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
}: PlanSectionProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <NoteSection
          section={section}
          value={value}
          onChange={onChange}
          sampleNote={sampleNote}
          ageGroup={ageGroup}
          modality={modality}
          isRefining={isRefining}
          onRefine={onRefine}
          versions={versions}
          onRevert={onRevert}
          latestChangeSource={latestChangeSource}
        />
        <SampleSuggestions
          section={section}
          ageGroup={ageGroup}
          modality={modality}
        />
      </div>
    </Card>
  );
}