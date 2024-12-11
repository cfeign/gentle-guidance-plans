import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { IntakeFormFields } from "./IntakeFormFields";
import { IntakeFormData } from "./types";

export function ClientIntakeForm() {
  const { toast } = useToast();
  const form = useForm<IntakeFormData>();

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
        age_group: "adult", // Default to adult for now
        therapist_id: profile.id,
        status: "submitted",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Intake form has been saved",
      });
    } catch (error) {
      console.error("Error saving intake form:", error);
      toast({
        title: "Error",
        description: "Failed to save intake form",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <IntakeFormFields form={form} />
        <Button type="submit" className="w-full">
          Submit Intake Form
        </Button>
      </form>
    </Form>
  );
}