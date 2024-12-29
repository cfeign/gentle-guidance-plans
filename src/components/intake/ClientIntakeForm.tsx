import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientIntakeFormSchema, clientIntakeFormSchema } from "./schema";
import { useIntakeFormSubmission } from "@/hooks/useIntakeFormSubmission";
import { AgeGroup } from "@/types/forms";

interface ClientIntakeFormProps {
  ageGroup?: AgeGroup;
}

export function ClientIntakeForm({ ageGroup = 'adults' }: ClientIntakeFormProps) {
  const navigate = useNavigate();
  const { submitIntakeForm } = useIntakeFormSubmission({
    onSuccess: () => navigate("/"),
  });

  const form = useForm<ClientIntakeFormSchema>({
    resolver: zodResolver(clientIntakeFormSchema),
    defaultValues: {
      presenting_problems: "",
      medical_history: "",
      family_background: "",
      current_functioning: "",
      age_group: ageGroup,
    },
  });
  const onSubmit = (data: ClientIntakeFormSchema) => {
    submitIntakeForm(data);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="presenting_problems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What brings you in today?</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Please describe your current concerns and what you hope to address in therapy..."
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
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Please share any relevant medical history, including current medications..."
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
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Please tell us about your family history and current family dynamics..."
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
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="How are you managing daily activities? Any changes in sleep, appetite, or energy levels?"
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
  );
}