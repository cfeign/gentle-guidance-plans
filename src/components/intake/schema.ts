import { z } from "zod";

export const baseIntakeFormSchema = z.object({
	presenting_problems: z.string().min(1, "Please describe your current concerns"),
	medical_history: z.string().min(1, "Please provide your medical history"),
	family_background: z.string().min(1, "Please provide your family background"),
	current_functioning: z.string().min(1, "Please describe your current functioning"),
});

export const clientIntakeFormSchema = baseIntakeFormSchema.extend({
	age_group: z.string(),
});

export const biopsychosocialFormSchema = baseIntakeFormSchema.extend({
	onset_duration: z.string().min(1, "Please describe when symptoms began"),
	severity: z.enum(["mild", "moderate", "severe"]),
	medications: z.string(),
	sleep_patterns: z.string(),
	appetite_changes: z.string(),
	substance_use: z.string(),
	mental_health_history: z.string(),
	previous_treatment: z.string(),
	coping_mechanisms: z.string(),
	trauma_history: z.string(),
	suicide_risk: z.boolean(),
	support_systems: z.string(),
	education_employment: z.string(),
	cultural_factors: z.string(),
	diagnostic_impressions: z.string().min(1, "Please provide diagnostic impressions"),
	treatment_recommendations: z.string().min(1, "Please provide treatment recommendations"),
	goals: z.string().min(1, "Please specify treatment goals"),
});

export type BaseIntakeFormSchema = z.infer<typeof baseIntakeFormSchema>;
export type ClientIntakeFormSchema = z.infer<typeof clientIntakeFormSchema>;
export type BiopsychosocialFormSchema = z.infer<typeof biopsychosocialFormSchema>;