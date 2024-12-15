import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TreatmentPlanWorkflow } from "@/components/TreatmentPlanWorkflow";
import { NoteSection } from "@/components/NoteSection";
import { useRole } from "../App";

interface LocationState {
  ageGroup: string;
  modality: string;
}

interface Version {
  content: string;
  timestamp: Date;
  source: "AI Refinement" | "Insurer Check" | "DSM Alignment" | "Manual Edit";
}

interface NotesState {
  content: string;
  versions: Version[];
  latestChangeSource?: string;
}

const getSampleNotes = (ageGroup: string, modality: string) => {
  const notes = {
    emdr: {
      children: {
        assessment: "Child presents with anxiety related to a recent car accident. Using age-appropriate metaphors like 'butterfly taps' to explain bilateral stimulation. Parent reports nightmares and increased startle response.",
        structure: "Weekly 45-minute sessions. First 15 minutes with parent and child, remaining time for EMDR work using child-friendly tools like puppet play and drawing. Plan for 12 sessions initially.",
        intervention: "Using story-telling and art to establish safe place. Incorporating child's favorite superhero for resource installation. Using light bars with changing colors for bilateral stimulation.",
      },
      teens: {
        assessment: "Adolescent experiencing academic anxiety and social withdrawal following cyberbullying incident. Reports intrusive thoughts and difficulty concentrating in class.",
        structure: "50-minute sessions twice weekly initially, reducing to weekly after stabilization. Including parents in monthly check-ins.",
        intervention: "Using headphones with bilateral audio for processing. Incorporating mindfulness techniques between sets. Focus on building positive self-beliefs through successful academic experiences.",
      },
      adults: {
        assessment: "Adult client presenting with PTSD symptoms following workplace accident. Reports flashbacks, hypervigilance, and difficulty maintaining employment.",
        structure: "Weekly 60-minute sessions. Initial phase focusing on stabilization and resource development. Treatment expected to span 16-20 sessions.",
        intervention: "Standard EMDR protocol with cognitive interweaves as needed. Incorporating workplace-specific coping strategies. Using combination of visual and tactile bilateral stimulation.",
      }
    },
    "animal-assisted": {
      children: {
        assessment: "Child showing selective mutism in school settings. Demonstrates interest in animals and becomes more verbal in their presence. No history of animal-related trauma.",
        structure: "30-minute sessions with therapy dog present. Initial sessions focus on non-verbal interaction with animal, gradually incorporating verbal commands and storytelling.",
        intervention: "Using therapy dog as social bridge. Teaching gentle pet care as confidence builder. Incorporating animal-themed art and play activities.",
      },
      teens: {
        assessment: "Teenager struggling with depression and social isolation. Shows positive response to animals and expresses interest in veterinary career.",
        structure: "Weekly 60-minute sessions combining traditional talk therapy with animal interaction. Including journaling about animal interactions between sessions.",
        intervention: "Working with therapy horse for emotional regulation. Teaching animal training techniques to build confidence. Using animal care responsibilities as behavioral activation.",
      },
      adults: {
        assessment: "Adult client with generalized anxiety disorder and difficulty with emotional expression. History of positive experiences with pets.",
        structure: "Bi-weekly 50-minute sessions incorporating both small and large therapy animals. Focus on mindfulness and grounding techniques with animal support.",
        intervention: "Progressive exposure to different therapy animals. Teaching animal-assisted relaxation techniques. Building emotional awareness through animal interaction.",
      }
    }
  };
  
  return notes[modality as keyof typeof notes]?.[ageGroup as keyof (typeof notes)["emdr"]];
};

const TreatmentPlanForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useRole();
  const isClientView = role === "client";
  const { ageGroup, modality } = location.state as LocationState;
  const sampleNotes = getSampleNotes(ageGroup, modality);

  const [notes, setNotes] = useState<Record<string, NotesState>>({
    assessment: { content: "", versions: [] },
    structure: { content: "", versions: [] },
    intervention: { content: "", versions: [] },
  });

  const [isRefining, setIsRefining] = useState({
    assessment: false,
    structure: false,
    intervention: false,
  });

  const handleNotesChange = (section: keyof typeof notes, value: string) => {
    setNotes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        content: value,
        versions: [
          {
            content: value,
            timestamp: new Date(),
            source: "Manual Edit",
          },
          ...prev[section].versions,
        ],
        latestChangeSource: "Manual Edit",
      },
    }));
  };

  const handleRevert = (section: keyof typeof notes, content: string) => {
    setNotes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        content,
      },
    }));
  };

  const refineText = async (section: keyof typeof notes) => {
    setIsRefining((prev) => ({ ...prev, [section]: true }));

    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setNotes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        content: `Refined ${prev[section].content}`,
        versions: [
          {
            content: `Refined ${prev[section].content}`,
            timestamp: new Date(),
            source: "AI Refinement",
          },
          ...prev[section].versions,
        ],
        latestChangeSource: "AI Refinement",
      },
    }));

    setIsRefining((prev) => ({ ...prev, [section]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-therapy-secondary/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {isClientView ? "Back to Ways We Can Help" : "Back to Modalities"}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isClientView
              ? modality === "emdr"
                ? "Your Memory Healing Plan"
                : "Your Animal-Assisted Healing Plan"
              : `${modality === "emdr" ? "EMDR" : "Animal-Assisted"} Therapy Plan`}
          </h1>
          <p className="text-gray-600">
            Age Group: {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}
          </p>
        </div>

        <TreatmentPlanWorkflow ageGroup={ageGroup} modality={modality} />

        <div className="space-y-6">
          {(["assessment", "structure", "intervention"] as const).map((section) => (
            <NoteSection
              key={section}
              title={`${section.charAt(0).toUpperCase() + section.slice(1)} Notes`}
              section={section}
              value={notes[section].content}
              onChange={(value) => handleNotesChange(section, value)}
              sampleNote={sampleNotes[section]}
              ageGroup={ageGroup}
              modality={modality}
              isRefining={isRefining[section]}
              onRefine={() => refineText(section)}
              versions={notes[section].versions}
              onRevert={(content) => handleRevert(section, content)}
              latestChangeSource={notes[section].latestChangeSource}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanForm;
