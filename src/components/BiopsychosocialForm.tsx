import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
          
          <FormField
            control={form.control}
            name="presenting_problems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chief Complaint & Presenting Problems</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the primary reasons for seeking treatment..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="onset_duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Onset & Duration</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="When did the symptoms begin? How have they progressed?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
          
          <FormField
            control={form.control}
            name="medical_conditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Medical Conditions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any current medical conditions..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Medications</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List current medications and dosages..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sleep_patterns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleep Patterns</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe sleep patterns and any disturbances..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 bg-therapy-soft/40 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Psychological Factors</h3>
          
          <FormField
            control={form.control}
            name="mental_health_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mental Health History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Previous mental health diagnoses and treatments..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trauma_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trauma History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Relevant trauma history and impact..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
          
          <FormField
            control={form.control}
            name="family_dynamics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Dynamics</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Current family situation and relationships..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="support_systems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Systems</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Available social support and resources..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cultural_factors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cultural Considerations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Relevant cultural factors and beliefs..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 bg-therapy-secondary/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Clinical Assessment & Plan</h3>
          
          <FormField
            control={form.control}
            name="diagnostic_impressions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnostic Impressions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Clinical impressions and potential diagnoses..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treatment_recommendations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment Recommendations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Recommended treatment approach and interventions..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Specific, measurable treatment goals..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Assessment
        </Button>
      </form>
    </Form>
  );
}