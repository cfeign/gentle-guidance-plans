import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { TreatmentPlanWorkflow } from "@/components/TreatmentPlanWorkflow";

interface LocationState {
  ageGroup: string;
  modality: string;
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
      }
    }
  };
  
  return notes[modality as keyof typeof notes]?.[ageGroup as keyof (typeof notes)["emdr"]];
};

const TreatmentPlanForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ageGroup, modality } = location.state as LocationState;
  const sampleNotes = getSampleNotes(ageGroup, modality);

  const [notes, setNotes] = useState({
    assessment: "",
    structure: "",
    intervention: "",
  });

  const handleNotesChange = (
    section: keyof typeof notes,
    value: string
  ) => {
    setNotes((prev) => ({
      ...prev,
      [section]: value,
    }));
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
          Back to Modalities
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {modality === "emdr" ? "EMDR" : "Animal-Assisted"} Therapy Plan
          </h1>
          <p className="text-gray-600">
            Age Group: {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}
          </p>
        </div>

        <TreatmentPlanWorkflow ageGroup={ageGroup} modality={modality} />

        <div className="space-y-6">
          {["assessment", "structure", "intervention"].map((section) => (
            <Card key={section} className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {section.charAt(0).toUpperCase() + section.slice(1)} Notes
              </h3>
              <div className="space-y-4">
                <div className="bg-therapy-soft p-4 rounded-md">
                  <p className="text-sm text-gray-600 italic">
                    Sample: {sampleNotes?.[section as keyof typeof sampleNotes]}
                  </p>
                </div>
                <Textarea
                  value={notes[section as keyof typeof notes]}
                  onChange={(e) =>
                    handleNotesChange(section as keyof typeof notes, e.target.value)
                  }
                  placeholder={`Enter your ${section} notes here...`}
                  className="min-h-[150px]"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanForm;