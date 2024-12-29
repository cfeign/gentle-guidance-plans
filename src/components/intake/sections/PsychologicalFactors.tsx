import { UseFormReturn } from "react-hook-form";
import { FormFieldWithTips } from "@/components/FormFieldWithTips";
import { BiopsychosocialFormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface PsychologicalFactorsProps {
	form: UseFormReturn<BiopsychosocialFormData>;
}

export function PsychologicalFactors({ form }: PsychologicalFactorsProps) {
	return (
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
				name="previous_treatment"
				label="Previous Treatment"
				placeholder="Past therapeutic interventions and their outcomes..."
			/>

			<FormFieldWithTips
				form={form}
				name="coping_mechanisms"
				label="Coping Mechanisms"
				placeholder="Current strategies for managing stress and emotions..."
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
							<FormLabel className="font-medium">
								Current Suicide Risk
							</FormLabel>
							<p className="text-sm text-muted-foreground">
								Check if there is any current suicidal ideation or risk
							</p>
						</div>
					</FormItem>
				)}
			/>
		</div>
	);
}