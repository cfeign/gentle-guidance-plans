import { UseFormReturn } from "react-hook-form";
import { FormFieldWithTips } from "@/components/FormFieldWithTips";
import { BiopsychosocialFormData } from "../types";

interface SocialFactorsProps {
	form: UseFormReturn<BiopsychosocialFormData>;
}

export function SocialFactors({ form }: SocialFactorsProps) {
	return (
		<div className="space-y-6 bg-therapy-primary/10 p-6 rounded-lg">
			<h3 className="text-xl font-semibold">Social & Environmental Factors</h3>
			
			<FormFieldWithTips
				form={form}
				name="family_background"
				label="Family Dynamics"
				placeholder="Current family situation and relationships..."
			/>

			<FormFieldWithTips
				form={form}
				name="support_systems"
				label="Support Systems"
				placeholder="Available social support networks and resources..."
			/>

			<FormFieldWithTips
				form={form}
				name="education_employment"
				label="Education & Employment"
				placeholder="Current educational/occupational status and history..."
			/>

			<FormFieldWithTips
				form={form}
				name="cultural_factors"
				label="Cultural Considerations"
				placeholder="Relevant cultural, spiritual, or religious factors..."
			/>
		</div>
	);
}