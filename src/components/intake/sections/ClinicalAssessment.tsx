import { UseFormReturn } from "react-hook-form";
import { FormFieldWithTips } from "@/components/FormFieldWithTips";
import { BiopsychosocialFormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ClinicalAssessmentProps {
	form: UseFormReturn<BiopsychosocialFormData>;
}

export function ClinicalAssessment({ form }: ClinicalAssessmentProps) {
	return (
		<div className="space-y-6 bg-therapy-secondary/20 p-6 rounded-lg">
			<h3 className="text-xl font-semibold">Clinical Assessment & Plan</h3>
			
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
					</FormItem>
				)}
			/>

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
	);
}