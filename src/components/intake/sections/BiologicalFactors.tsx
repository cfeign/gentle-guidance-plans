import { UseFormReturn } from "react-hook-form";
import { FormFieldWithTips } from "@/components/FormFieldWithTips";
import { BiopsychosocialFormData } from "../types";

interface BiologicalFactorsProps {
	form: UseFormReturn<BiopsychosocialFormData>;
}

export function BiologicalFactors({ form }: BiologicalFactorsProps) {
	return (
		<div className="space-y-6 bg-therapy-accent/20 p-6 rounded-lg">
			<h3 className="text-xl font-semibold">Biological Factors</h3>
			
			<FormFieldWithTips
				form={form}
				name="medical_history"
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

			<FormFieldWithTips
				form={form}
				name="substance_use"
				label="Substance Use History"
				placeholder="Current and past substance use..."
			/>
		</div>
	);
}