import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TherapyModality } from "@/components/TherapyModality";
import { AgeGroupSelector } from "@/components/AgeGroupSelector";
import { useRole } from "../App";

const getTherapyModalities = (isClientView: boolean) => {
  const modalities = [
    {
      type: "cbt",
      name: isClientView ? "Understanding Thoughts & Actions" : "Cognitive Behavioral Therapy",
      description: isClientView
        ? "Learn how your thoughts affect your feelings and discover practical ways to feel better"
        : "Evidence-based approach focusing on thoughts and behaviors",
    },
    {
      type: "emdr",
      name: isClientView ? "Processing Difficult Memories" : "EMDR Therapy",
      description: isClientView
        ? "A gentle approach to help your mind heal from tough experiences"
        : "Processing trauma through bilateral stimulation",
    },
    {
      type: "animal-assisted",
      name: isClientView ? "Healing with Animal Friends" : "Animal-Assisted Therapy",
      description: isClientView
        ? "Find comfort and growth through interactions with friendly therapy animals"
        : "Incorporating animals in therapeutic healing",
    },
    {
      type: "family-therapy",
      name: isClientView ? "Family Connection" : "Family Therapy",
      description: isClientView
        ? "Build stronger bonds and better understanding with your loved ones"
        : "Working with families to improve communication",
    },
    {
      type: "art-therapy",
      name: isClientView ? "Creative Expression" : "Art Therapy",
      description: isClientView
        ? "Use art and creativity to express yourself and feel better"
        : "Using creative expression for healing",
    },
    {
      type: "nature-therapy",
      name: isClientView ? "Nature Connection" : "Nature Therapy",
      description: isClientView
        ? "Find peace and healing through connecting with the natural world"
        : "Healing through connection with nature",
    },
    {
      type: "psychodynamic",
      name: isClientView ? "Understanding Your Story" : "Psychodynamic Therapy",
      description: isClientView
        ? "Explore how past experiences shape your present and create positive change"
        : "Exploring past experiences and unconscious patterns",
    },
    {
      type: "positive-psychology",
      name: isClientView ? "Building on Your Strengths" : "Positive Psychology",
      description: isClientView
        ? "Focus on what makes you unique and develop your natural abilities"
        : "Focusing on strengths and positive emotions",
    },
    {
      type: "mindfulness",
      name: isClientView ? "Present Moment Awareness" : "Mindfulness-Based Therapy",
      description: isClientView
        ? "Learn to find calm and clarity in your daily life"
        : "Present-moment awareness and acceptance",
    },
  ];

  return modalities;
};

const Index = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("children");
  const navigate = useNavigate();
  const { role } = useRole();
  const isClientView = role === "client";

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
            {isClientView
              ? "Let's Create Your Healing Journey Together"
              : "Treatment Plan Co-Creation"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isClientView
              ? "We'll work together to find the best approach for you or your loved one. Each journey is unique, and we're here to support you every step of the way."
              : "Collaborate with your client to develop personalized treatment plans using evidence-based approaches for different age groups."}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            {isClientView
              ? "First, let's find the right fit for your age:"
              : "Select Age Group:"}
          </h2>
          <AgeGroupSelector
            selected={selectedAgeGroup}
            onChange={setSelectedAgeGroup}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            {isClientView
              ? "Now, explore different ways we can work together:"
              : "Select Treatment Modality:"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTherapyModalities(isClientView).map((modality) => (
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