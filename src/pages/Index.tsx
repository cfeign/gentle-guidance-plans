import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TherapyModality } from "@/components/TherapyModality";
import { AgeGroupSelector } from "@/components/AgeGroupSelector";

const therapyModalities = [
  {
    type: "cbt",
    name: "Cognitive Behavioral Therapy",
    description: "Evidence-based approach focusing on thoughts and behaviors",
  },
  {
    type: "emdr",
    name: "EMDR Therapy",
    description: "Processing trauma through bilateral stimulation",
  },
  {
    type: "animal-assisted",
    name: "Animal-Assisted Therapy",
    description: "Incorporating animals in therapeutic healing",
  },
  {
    type: "family-therapy",
    name: "Family Therapy",
    description: "Working with families to improve communication",
  },
  {
    type: "art-therapy",
    name: "Art Therapy",
    description: "Using creative expression for healing",
  },
  {
    type: "nature-therapy",
    name: "Nature Therapy",
    description: "Healing through connection with nature",
  },
  {
    type: "psychodynamic",
    name: "Psychodynamic Therapy",
    description: "Exploring past experiences and unconscious patterns",
  },
  {
    type: "positive-psychology",
    name: "Positive Psychology",
    description: "Focusing on strengths and positive emotions",
  },
  {
    type: "mindfulness",
    name: "Mindfulness-Based Therapy",
    description: "Present-moment awareness and acceptance",
  },
];

const Index = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("children");
  const navigate = useNavigate();

  const handleModalitySelect = (modalityType: string) => {
    navigate("/treatment-plan", {
      state: { ageGroup: selectedAgeGroup, modality: modalityType },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-therapy-secondary/20">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Treatment Plan Co-Creation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collaborate with your therapist to develop personalized treatment plans
            using evidence-based approaches for different age groups.
          </p>
        </div>

        <div className="mb-8">
          <AgeGroupSelector
            selected={selectedAgeGroup}
            onChange={setSelectedAgeGroup}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapyModalities.map((modality) => (
            <div
              key={modality.type}
              onClick={() => handleModalitySelect(modality.type)}
            >
              <TherapyModality {...modality} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;