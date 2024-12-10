import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormFieldWithTips } from "./FormFieldWithTips";

interface BiopsychosocialFormData {
  // Identifying Information
  presenting_problems: string;
  onset_duration: string;
  severity: "mild" | "moderate" | "severe";
  
  // Biological Factors
  medical_conditions: string;
  medications: string;
  sleep_patterns: string;
  appetite_changes: string;
  substance_use: string;
  
  // Psychological Factors
  mental_health_history: string;
  previous_treatment: string;
  coping_mechanisms: string;
  trauma_history: string;
  suicide_risk: boolean;
  
  // Social Factors
  family_dynamics: string;
  support_systems: string;
  education_employment: string;
  cultural_factors: string;
  
  // Clinical Assessment
  diagnostic_impressions: string;
  treatment_recommendations: string;
  goals: string;
}

export function BiopsychosocialForm() {
  const { toast } = useToast();
  const form = useForm<BiopsychosocialFormData>();

  const onSubmit = async (data: BiopsychosocialFormData) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) {
        toast({
          title: "Error",
          description: "Please sign in to submit an assessment",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("intake_forms").update({
        presenting_problems: data.presenting_problems,
        medical_history: data.medical_conditions,
        family_background: data.family_dynamics,
        current_functioning: data.diagnostic_impressions,
        therapist_notes: JSON.stringify(data),
        status: "reviewed",
      }).eq("therapist_id", profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Assessment has been saved",
      });
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error",
        description: "Failed to save assessment",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 bg-therapy-secondary/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Presenting Problems & History</h3>
          
          <FormFieldWithTips
            form={form}
            name="presenting_problems"
            label="Chief Complaint & Presenting Problems"
            placeholder="Describe the primary reasons for seeking treatment..."
          />

          <FormFieldWithTips
            form={form}
            name="onset_duration"
            label="Onset & Duration"
            placeholder="When did the symptoms begin? How have they progressed?"
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptom Severity</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="mild" />
                      <label htmlFor="mild">Mild</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <label htmlFor="moderate">Moderate</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severe" id="severe" />
                      <label htmlFor="severe">Severe</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 bg-therapy-accent/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Biological Factors</h3>
          
          <FormFieldWithTips
            form={form}
            name="medical_conditions"
            label="Current Medical Conditions"
            placeholder="List any current medical conditions..."
          />

          <FormFieldWithTips
            form={form}
            name="medications"
            label="Current Medications"
            placeholder="List current medications and dosages..."
          />

          <FormFieldWithTips
            form={form}
            name="sleep_patterns"
            label="Sleep Patterns"
            placeholder="Describe sleep patterns and any disturbances..."
          />
        </div>

        <div className="space-y-6 bg-therapy-soft/40 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Psychological Factors</h3>
          
          <FormFieldWithTips
            form={form}
            name="mental_health_history"
            label="Mental Health History"
            placeholder="Previous mental health diagnoses and treatments..."
          />

          <FormFieldWithTips
            form={form}
            name="trauma_history"
            label="Trauma History"
            placeholder="Relevant trauma history and impact..."
          />

          <FormField
            control={form.control}
            name="suicide_risk"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Current Suicide Risk
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 bg-therapy-primary/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Social & Environmental Factors</h3>
          
          <FormFieldWithTips
            form={form}
            name="family_dynamics"
            label="Family Dynamics"
            placeholder="Current family situation and relationships..."
          />

          <FormFieldWithTips
            form={form}
            name="support_systems"
            label="Support Systems"
            placeholder="Available social support and resources..."
          />

          <FormFieldWithTips
            form={form}
            name="cultural_factors"
            label="Cultural Considerations"
            placeholder="Relevant cultural factors and beliefs..."
          />
        </div>

        <div className="space-y-6 bg-therapy-secondary/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Clinical Assessment & Plan</h3>
          
          <FormFieldWithTips
            form={form}
            name="diagnostic_impressions"
            label="Diagnostic Impressions"
            placeholder="Clinical impressions and potential diagnoses..."
          />

          <FormFieldWithTips
            form={form}
            name="treatment_recommendations"
            label="Treatment Recommendations"
            placeholder="Recommended treatment approach and interventions..."
          />

          <FormFieldWithTips
            form={form}
            name="goals"
            label="Treatment Goals"
            placeholder="Specific, measurable treatment goals..."
          />
        </div>

        <Button type="submit" className="w-full">
          Save Assessment
        </Button>
      </form>
    </Form>
  );
}
