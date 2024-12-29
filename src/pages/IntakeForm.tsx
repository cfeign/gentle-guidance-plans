import { useRole } from "@/App";
import { BiopsychosocialForm } from "@/components/BiopsychosocialForm";
import { AgeGroupSelector } from "@/components/AgeGroupSelector";
import { ClientIntakeForm } from "@/components/intake/ClientIntakeForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AgeGroup } from "@/types/forms";

interface LocationState {
  ageGroup: AgeGroup;
}

const IntakeForm = () => {
  const { role } = useRole();
  const location = useLocation();
  const { ageGroup = 'adults' } = (location.state as LocationState) || {};
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(ageGroup);

  if (role === "client") {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6">Initial Assessment Form</h2>
        <ClientIntakeForm ageGroup={selectedAgeGroup} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6">Biopsychosocial Assessment</h2>
      <AgeGroupSelector selected={selectedAgeGroup} onChange={setSelectedAgeGroup} />
      <div className="mt-6">
        <BiopsychosocialForm />
      </div>
    </div>
  );
};

export default IntakeForm;

