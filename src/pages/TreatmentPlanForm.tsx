import { useLocation } from "react-router-dom";
import { useState } from "react";
import { TreatmentPlanWorkflow } from "@/components/TreatmentPlanWorkflow";
import { TherapyModality } from "@/components/TherapyModality";

const TreatmentPlanForm = () => {
  const location = useLocation();
  const { ageGroup } = location.state as { ageGroup: string };
  const [selectedModality, setSelectedModality] = useState("emdr");
  const [showWorkflow, setShowWorkflow] = useState(false);

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

  const handleModalitySelect = (type: string) => {
    setSelectedModality(type);
    setShowWorkflow(true);
  };

  return (
    <div className="container py-8">
      {!showWorkflow ? (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Select Treatment Modality
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the most appropriate treatment approach for your client's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {modalities.map((modality) => (
              <div
                key={modality.type}
                onClick={() => handleModalitySelect(modality.type)}
                className="cursor-pointer"
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
        </>
      ) : (
        <TreatmentPlanWorkflow ageGroup={ageGroup} modality={selectedModality} />
      )}
    </div>
  );
};

export default TreatmentPlanForm;