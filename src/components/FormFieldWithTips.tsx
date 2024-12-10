import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SampleSuggestions } from "./SampleSuggestions";
import { InsuranceCompliance } from "./InsuranceCompliance";
import { UseFormReturn } from "react-hook-form";

interface FormFieldWithTipsProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  ageGroup?: string;
  modality?: string;
  className?: string;
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
          <div className="flex gap-2 flex-wrap">
            <SampleSuggestions
              section={name}
              ageGroup={ageGroup}
              modality={modality}
            />
            <InsuranceCompliance section={name} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}