import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { TreatmentPlanWorkflow } from "@/components/TreatmentPlanWorkflow";
import { useToast } from "@/components/ui/use-toast";
import { NoteControls } from "@/components/NoteControls";

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
  const { toast } = useToast();
  const { ageGroup, modality } = location.state as LocationState;
  const sampleNotes = getSampleNotes(ageGroup, modality);

  const [notes, setNotes] = useState({
    assessment: "",
    structure: "",
    intervention: "",
  });

  const [isRefining, setIsRefining] = useState({
    assessment: false,
    structure: false,
    intervention: false,
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

  const refineText = async (section: keyof typeof notes) => {
    if (!notes[section].trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to refine.",
        variant: "destructive",
      });
      return;
    }

    setIsRefining((prev) => ({ ...prev, [section]: true }));

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a professional mental health treatment plan writer. 
                       Improve the following ${section} notes for ${modality} therapy 
                       for ${ageGroup}. Make it more professional and detailed while 
                       maintaining the core information.`,
            },
            {
              role: "user",
              content: notes[section],
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        setNotes((prev) => ({
          ...prev,
          [section]: data.choices[0].message.content.trim(),
        }));
        toast({
          title: "Success",
          description: "Notes refined successfully!",
          className: "bg-green-500 text-white",
        });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refine notes. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRefining((prev) => ({ ...prev, [section]: false }));
    }
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
                <NoteControls
                  section={section}
                  notes={notes[section as keyof typeof notes]}
                  isRefining={isRefining[section as keyof typeof isRefining]}
                  onRefine={() => refineText(section as keyof typeof notes)}
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
