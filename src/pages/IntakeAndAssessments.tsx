import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRole } from "../App";
import { ClientIntakeForm } from "@/components/intake/ClientIntakeForm";
import { AssessmentsList } from "@/components/assessment/AssessmentsList";
import { NewAssessmentForm } from "@/components/assessment/NewAssessmentForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function IntakeAndAssessments() {
  const { role } = useRole();
  const [showNewAssessment, setShowNewAssessment] = useState(false);

  if (role !== "therapist") {
    return <div>Access restricted to therapists.</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Client Records</h1>
      
      <Tabs defaultValue="assessments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="intake">Intake Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-4">
          {showNewAssessment ? (
            <NewAssessmentForm onCancel={() => setShowNewAssessment(false)} />
          ) : (
            <div>
              <Button 
                onClick={() => setShowNewAssessment(true)}
                className="mb-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
              <AssessmentsList />
            </div>
          )}
        </TabsContent>

        <TabsContent value="intake">
          <ClientIntakeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}