import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SampleSuggestions } from "./SampleSuggestions";
import { InsuranceCompliance } from "./InsuranceCompliance";
import { UseFormReturn } from "react-hook-form";
import { FormFieldProps, Section } from "@/types/forms";

interface FormFieldWithTipsProps extends FormFieldProps {
  form: UseFormReturn<any>;
}

export function FormFieldWithTips({
  form,
  name,
  label,
  placeholder,
  ageGroup = "adults",
  modality = "emdr",
  className,
}: FormFieldWithTipsProps) {
  // Only show suggestions and compliance tips for relevant sections
  const showTips = ['presenting_problems', 'diagnostic_impressions', 'treatment_recommendations'].includes(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          {showTips && (
            <div className="flex gap-2 flex-wrap">
              <SampleSuggestions
                section={name as Section}
                ageGroup={ageGroup}
                modality={modality}
              />
              <InsuranceCompliance section={name as Section} />
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}