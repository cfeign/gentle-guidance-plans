import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanSection } from "./treatment-plan/PlanSection";

interface TreatmentPlanWorkflowProps {
  ageGroup: string;
  modality: string;
}

export function TreatmentPlanWorkflow({ ageGroup, modality }: TreatmentPlanWorkflowProps) {
  const [currentStep, setCurrentStep] = useState("1");
  const [assessmentContent, setAssessmentContent] = useState("");
  const [structureContent, setStructureContent] = useState("");
  const [interventionContent, setInterventionContent] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const steps = [
    {
      id: "1",
      title: "Initial Assessment",
      description: "Gather baseline information and identify specific challenges",
      tasks: [
        "Conduct age-appropriate assessment",
        "Identify primary concerns",
        "Establish treatment goals",
      ],
      content: assessmentContent,
      setContent: setAssessmentContent,
      sampleNote: "Based on the initial assessment, the client presents with...",
    },
    {
      id: "2",
      title: "Treatment Structure",
      description: "Define the framework and approach",
      tasks: [
        "Determine session frequency",
        "Set milestone markers",
        "Plan parent/guardian involvement",
      ],
      content: structureContent,
      setContent: setStructureContent,
      sampleNote: "Treatment will be structured as follows...",
    },
    {
      id: "3",
      title: "Intervention Strategies",
      description: "Select specific techniques and approaches",
      tasks: [
        "Choose age-appropriate exercises",
        "Develop coping strategies",
        "Plan progress tracking methods",
      ],
      content: interventionContent,
      setContent: setInterventionContent,
      sampleNote: "The following intervention strategies will be implemented...",
    },
  ];

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = parseInt(currentStep);
    if (direction === 'prev' && currentIndex > 1) {
      setCurrentStep(String(currentIndex - 1));
    } else if (direction === 'next' && currentIndex < steps.length) {
      setCurrentStep(String(currentIndex + 1));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {steps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className="data-[state=active]:bg-therapy-secondary data-[state=active]:text-therapy-primary"
            >
              {step.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {steps.map((step) => (
          <TabsContent key={step.id} value={step.id}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              
              <div className="space-y-4 mb-6">
                {step.tasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-therapy-secondary" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>

              <PlanSection
                title={step.title}
                section={`step_${step.id}`}
                value={step.content}
                onChange={step.setContent}
                sampleNote={step.sampleNote}
                ageGroup={ageGroup}
                modality={modality}
                isRefining={isRefining}
                onRefine={() => setIsRefining(true)}
                versions={[]}
                onRevert={(content: string) => step.setContent(content)}
              />

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('prev')}
                  disabled={currentStep === "1"}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleNavigation('next')}
                  disabled={currentStep === String(steps.length)}
                  className="bg-therapy-primary hover:bg-therapy-primary/90"
                >
                  Next Step
                </Button>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
