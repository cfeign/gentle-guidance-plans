export type AgeGroup = 'adults' | 'teens' | 'children';
export type Section = 'presenting_problems' | 'diagnostic_impressions' | 'treatment_recommendations';
export type Modality = string;

export interface FormFieldProps {
	name: string;
	label: string;
	placeholder: string;
	ageGroup?: AgeGroup;
	modality?: string;
	className?: string;
}

export interface SuggestionProps {
	content: string;
	onClick?: () => void;
	className?: string;
}

export interface FormSectionProps {
	section: Section;
	ageGroup: AgeGroup;
	modality: Modality;
}