import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useRole } from "../App";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IntakeFormData {
  presenting_problems: string;
  medical_history: string;
  family_background: string;
  current_functioning: string;
}

const IntakeForm = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { ageGroup } = location.state || { ageGroup: 'adults' };
  const isClientView = role === "client";

  const form = useForm<IntakeFormData>({
    defaultValues: {
      presenting_problems: "",
      medical_history: "",
      family_background: "",
      current_functioning: "",
    },
  });

  const onSubmit = async (data: IntakeFormData) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) {
        toast({
          title: "Error",
          description: "Please sign in to submit an intake form",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("intake_forms").insert({
        ...data,
        age_group: ageGroup,
        client_id: profile.id,
        status: "submitted",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your intake form has been submitted",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error submitting intake form:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your intake form",
        variant: "destructive",
      });
    }
  };

  if (!isClientView) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Therapist View</h2>
        <p className="text-gray-600">
          As a therapist, you can view and manage intake forms from your clients.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Initial Assessment Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="presenting_problems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What brings you in today?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your current concerns and what you hope to address in therapy..."
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
            name="medical_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share any relevant medical history, including current medications..."
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
            name="family_background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Background</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please tell us about your family history and current family dynamics..."
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
            name="current_functioning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Functioning</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How are you managing daily activities? Any changes in sleep, appetite, or energy levels?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit Assessment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IntakeForm;