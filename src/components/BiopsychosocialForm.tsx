import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiopsychosocialFormSchema, biopsychosocialFormSchema } from "@/components/intake/schema";
import { useIntakeFormSubmission } from "@/hooks/useIntakeFormSubmission";
import { BiologicalFactors } from "./intake/sections/BiologicalFactors";
import { PsychologicalFactors } from "./intake/sections/PsychologicalFactors";
import { SocialFactors } from "./intake/sections/SocialFactors";
import { ClinicalAssessment } from "./intake/sections/ClinicalAssessment";

export function BiopsychosocialForm() {
  const navigate = useNavigate();
  const { submitIntakeForm } = useIntakeFormSubmission({
    onSuccess: () => navigate("/"),
  });

  const form = useForm<BiopsychosocialFormSchema>({
    resolver: zodResolver(biopsychosocialFormSchema),
    defaultValues: {
      presenting_problems: "",
      medical_history: "",
      family_background: "",
      current_functioning: "",
      onset_duration: "",
      severity: "moderate",
      medications: "",
      sleep_patterns: "",
      appetite_changes: "",
      substance_use: "",
      mental_health_history: "",
      previous_treatment: "",
      coping_mechanisms: "",
      trauma_history: "",
      suicide_risk: false,
      support_systems: "",
      education_employment: "",
      cultural_factors: "",
      diagnostic_impressions: "",
      treatment_recommendations: "",
      goals: "",
    },
    });

    const onSubmit = (data: BiopsychosocialFormSchema) => {
      submitIntakeForm(data, "reviewed");
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BiologicalFactors form={form} />
        <PsychologicalFactors form={form} />
        <SocialFactors form={form} />
        <ClinicalAssessment form={form} />

        <Button type="submit" className="w-full">
          Save Assessment
        </Button>
      </form>
    </Form>
  );
}

