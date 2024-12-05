import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TherapyModality } from "@/components/TherapyModality";
import { AgeGroupSelector } from "@/components/AgeGroupSelector";

const therapyModalities = [
  {
    type: "cbt",
    name: "Understanding Thoughts & Actions",
    description: "Learn how your thoughts affect your feelings and discover practical ways to feel better",
  },
  {
    type: "emdr",
    name: "Processing Difficult Memories",
    description: "A gentle approach to help your mind heal from tough experiences",
  },
  {
    type: "animal-assisted",
    name: "Healing with Animal Friends",
    description: "Find comfort and growth through interactions with friendly therapy animals",
  },
  {
    type: "family-therapy",
    name: "Family Connection",
    description: "Build stronger bonds and better understanding with your loved ones",
  },
  {
    type: "art-therapy",
    name: "Creative Expression",
    description: "Use art and creativity to express yourself and feel better",
  },
  {
    type: "nature-therapy",
    name: "Nature Connection",
    description: "Find peace and healing through connecting with the natural world",
  },
  {
    type: "psychodynamic",
    name: "Understanding Your Story",
    description: "Explore how past experiences shape your present and create positive change",
  },
  {
    type: "positive-psychology",
    name: "Building on Your Strengths",
    description: "Focus on what makes you unique and develop your natural abilities",
  },
  {
    type: "mindfulness",
    name: "Present Moment Awareness",
    description: "Learn to find calm and clarity in your daily life",
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
            Let's Create Your Healing Journey Together
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'll work together to find the best approach for you or your loved one. 
            Each journey is unique, and we're here to support you every step of the way.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">First, let's find the right fit for your age:</h2>
          <AgeGroupSelector
            selected={selectedAgeGroup}
            onChange={setSelectedAgeGroup}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Now, explore different ways we can work together:</h2>
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
    </div>
  );
};

export default Index;