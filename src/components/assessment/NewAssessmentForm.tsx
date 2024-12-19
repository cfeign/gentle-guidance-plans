import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AssessmentFormData {
  client_id: string;
  session_type: "in-person" | "telehealth";
  location: string;
  data_section: string;
  assessment_section: string;
  plan_section: string;
  diagnosis_notes: string;
  treatment_progress: string;
  symptom_status: "improved" | "maintained" | "escalated";
  risk_assessment: string;
  safety_plan: string;
  mental_status: {
    attention: string[];
    orientation: string[];
    appearance: string[];
    behavior: string[];
    speech: string[];
    affect: string[];
    mood: string[];
    thought_process: string[];
    thought_content: string[];
    judgment: string[];
    memory: string[];
  };
}

export function NewAssessmentForm({ onCancel }: { onCancel: () => void }) {
  const { toast } = useToast();
  const form = useForm<AssessmentFormData>();

  const onSubmit = async (data: AssessmentFormData) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) {
        toast({
          title: "Error",
          description: "Please sign in to create an assessment",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("assessments").insert({
        ...data,
        therapist_id: profile.id,
        session_date: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Assessment has been saved",
      });
      onCancel();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="session_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <label htmlFor="in-person">In Person</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="telehealth" id="telehealth" />
                      <label htmlFor="telehealth">Telehealth</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Session location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="data_section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data (D)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Client's presentation, symptoms, and objective observations..."
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
            name="assessment_section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment (A)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Clinical interpretation and evaluation..."
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
            name="plan_section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan (P)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Treatment plan, next steps, and recommendations..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="diagnosis_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnosis Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Current diagnosis and supporting information..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treatment_progress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment Progress</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Progress toward treatment goals..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symptom_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptom Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="improved">Improved</SelectItem>
                    <SelectItem value="maintained">Maintained</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="risk_assessment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Assessment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Current risk factors and assessment..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety_plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Safety Plan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Safety planning if risks are identified..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Assessment
          </Button>
        </div>
      </form>
    </Form>
  );
}