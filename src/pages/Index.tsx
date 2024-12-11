import { useNavigate } from "react-router-dom";
import { useRole } from "../App";
import { Card } from "@/components/ui/card";
import { ClipboardList, FileSpreadsheet } from "lucide-react";
import { AgeGroupSelector } from "@/components/AgeGroupSelector";
import { TherapyModality } from "@/components/TherapyModality";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const isClientView = role === "client";
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("adults");
  const [selectedModality, setSelectedModality] = useState("emdr");

  const modalities = [
    {
      name: "EMDR Therapy",
      description: "Eye Movement Desensitization and Reprocessing for trauma and anxiety",
      type: "emdr",
    },
    {
      name: "Animal-Assisted Therapy",
      description: "Therapeutic interventions assisted by trained animals",
      type: "animal-assisted",
    },
    {
      name: "Family Therapy",
      description: "Systemic approach involving family members",
      type: "family-therapy",
    },
    {
      name: "Art Therapy",
      description: "Expression and healing through creative processes",
      type: "art-therapy",
    },
  ];

  const features = [
    {
      title: isClientView ? "Your Treatment Journey" : "Treatment Plans",
      icon: ClipboardList,
      description: isClientView
        ? "Personalized plans to support your growth and healing"
        : "Create and manage customized treatment plans",
      onClick: () => navigate("/treatment-plan", { 
        state: { 
          ageGroup: selectedAgeGroup,
          modality: selectedModality
        }
      }),
      isAvailable: true,
    },
    {
      title: isClientView ? "Your Wellness Snapshot" : "Intake & Assessments",
      icon: FileSpreadsheet,
      description: isClientView
        ? "Share your story and help us understand your needs better"
        : "Biopsychosocial intake forms and standardized assessments",
      onClick: () => navigate("/intake", { state: { ageGroup: selectedAgeGroup } }),
      isAvailable: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-therapy-secondary/20">
      <div className="container py-8">
        <div className="mb-8">
          <AgeGroupSelector selected={selectedAgeGroup} onChange={setSelectedAgeGroup} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isClientView
              ? "Let's Begin Your Healing Journey"
              : "Welcome to Your Practice Dashboard"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isClientView
              ? "Choose where you'd like to start. We're here to support you every step of the way."
              : "Select a tool to begin working with your clients."}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Treatment Modality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modalities.map((modality) => (
              <div
                key={modality.type}
                onClick={() => setSelectedModality(modality.type)}
              >
                <TherapyModality
                  name={modality.name}
                  description={modality.description}
                  type={modality.type}
                  isSelected={selectedModality === modality.type}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden group ${
                feature.isAvailable ? "hover:scale-102" : "opacity-75"
              }`}
              onClick={feature.onClick}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-therapy-secondary">
                    <feature.icon className="w-8 h-8 text-therapy-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-lg mb-4">{feature.description}</p>
                {!feature.isAvailable && (
                  <div className="absolute top-4 right-4 bg-therapy-soft text-gray-500 text-sm font-medium px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
                <div className="mt-auto flex justify-end">
                  <span className="text-therapy-primary group-hover:underline">
                    {feature.isAvailable ? "Get Started →" : "Learn More →"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;