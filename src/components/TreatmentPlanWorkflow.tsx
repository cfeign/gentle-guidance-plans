import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface TreatmentPlanWorkflowProps {
  ageGroup: string;
  modality: string;
}

export function TreatmentPlanWorkflow({ ageGroup, modality }: TreatmentPlanWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Initial Assessment",
      description: "Gather baseline information and identify specific challenges",
      tasks: [
        "Conduct age-appropriate assessment",
        "Identify primary concerns",
        "Establish treatment goals",
      ],
    },
    {
      title: "Treatment Structure",
      description: "Define the framework and approach",
      tasks: [
        "Determine session frequency",
        "Set milestone markers",
        "Plan parent/guardian involvement",
      ],
    },
    {
      title: "Intervention Strategies",
      description: "Select specific techniques and approaches",
      tasks: [
        "Choose age-appropriate exercises",
        "Develop coping strategies",
        "Plan progress tracking methods",
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center"
          >
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                currentStep > index + 1
                  ? "bg-therapy-primary text-white"
                  : currentStep === index + 1
                  ? "bg-therapy-secondary text-therapy-primary"
                  : "bg-gray-200"
              }`}
            >
              {currentStep > index + 1 ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-16 mx-2 ${
                  currentStep > index + 1 ? "bg-therapy-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{steps[currentStep - 1].title}</h3>
        <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
        
        <div className="space-y-4">
          {steps[currentStep - 1].tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-therapy-secondary" />
              <span>{task}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
            disabled={currentStep === steps.length}
          >
            Next Step
          </Button>
        </div>
      </Card>
    </div>
  );
}