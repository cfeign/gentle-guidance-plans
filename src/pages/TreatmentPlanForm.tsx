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

const getClientFriendlyNotes = (ageGroup: string, modality: string) => {
  const notes = {
    emdr: {
      children: {
        assessment: "Let's talk about what's been bothering you lately! Your therapist wants to know about any scary or upsetting memories that might be making you feel worried or sad. They'll use special ways to help you feel better, like fun games and drawing. What would you like help with?",
        structure: "Your therapist will meet with you and sometimes your parents to help you feel better. They'll use special activities that feel like playing games to help your brain process tough memories. Would you like to know more about these activities?",
        intervention: "Your therapist has lots of fun tools to help you feel better! You might use special lights, draw pictures, or tell stories about your feelings. What kinds of activities do you enjoy doing?",
      },
      teens: {
        assessment: "This is your space to share what's been challenging for you. Your therapist wants to understand what memories or experiences might be affecting your daily life, school, or relationships. What would you like to work on?",
        structure: "Your therapy sessions will be a safe space to process difficult memories and experiences. Your therapist will teach you techniques to help manage stress and anxiety. How often would you like to meet?",
        intervention: "Your therapist will use specific techniques to help you process memories in a safe way. You'll learn tools to help you feel more in control. What coping strategies have worked for you in the past?",
      },
      adults: {
        assessment: "This is where we'll explore what brings you to therapy and understand how past experiences might be affecting your current life. Your therapist wants to hear your story and what you hope to achieve. What goals do you have for therapy?",
        structure: "Your therapy sessions will be focused on processing difficult memories and experiences in a safe, controlled way. Your therapist will guide you through proven techniques. What schedule would work best for you?",
        intervention: "Your therapist will use evidence-based methods to help you process memories and develop new coping strategies. You'll learn techniques to manage stress and anxiety. What support do you need most right now?",
      }
    },
    "animal-assisted": {
      children: {
        assessment: "Let's talk about how you feel about animals! Your therapist wants to know if you like spending time with friendly animals and how they might help you feel better. What's your favorite animal?",
        structure: "You'll get to spend time with special therapy animals who are trained to help kids feel better. Your therapist will be there to guide you. Would you like to know what kinds of animals you might meet?",
        intervention: "You'll learn fun ways to interact with the therapy animals, like giving them gentle pets or teaching them tricks. The animals can help you feel braver and calmer. What would you like to try first?",
      },
      teens: {
        assessment: "This is a chance to explore how working with animals might help you feel better. Your therapist wants to know about your experience with animals and what you hope to achieve. Do you have any pets at home?",
        structure: "Your sessions will include time with trained therapy animals in a safe, supportive environment. You'll learn how to build confidence and manage emotions with their help. What kind of activities interest you?",
        intervention: "You'll work with therapy animals to learn new ways of handling stress and building confidence. The animals can help you practice social skills and emotional expression. What would you like to learn?",
      },
      adults: {
        assessment: "Let's explore how animal-assisted therapy might support your healing journey. Your therapist wants to understand your comfort level with animals and your therapeutic goals. What draws you to this approach?",
        structure: "Your sessions will incorporate interactions with trained therapy animals to support your emotional well-being. The animals provide a unique way to work through challenges. What schedule works best for you?",
        intervention: "You'll work alongside therapy animals to develop new coping strategies and emotional awareness. The animals offer unconditional support during your healing process. What aspects of this approach interest you most?",
      }
    }
  };
  
  return notes[modality as keyof typeof notes]?.[ageGroup as keyof (typeof notes)["emdr"]];
};

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
  const sampleNotes = isClientView 
    ? getClientFriendlyNotes(ageGroup, modality)
    : getSampleNotes(ageGroup, modality);

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

  const getClientFriendlyTitle = (modality: string) => {
    if (modality === "emdr") {
      return "Your Memory Healing Plan";
    } else if (modality === "animal-assisted") {
      return "Your Animal-Assisted Healing Journey";
    }
    return "Your Healing Plan";
  };

  const getClientFriendlyBackText = () => {
    return "Back to Ways We Can Help";
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
          {isClientView ? getClientFriendlyBackText() : "Back to Modalities"}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isClientView
              ? getClientFriendlyTitle(modality)
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