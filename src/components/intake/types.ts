export interface BaseIntakeFormData {
  presenting_problems: string;
  medical_history: string;
  family_background: string;
  current_functioning: string;
}

export interface ClientIntakeFormData extends BaseIntakeFormData {
  age_group: string;
}

export interface BiopsychosocialFormData extends BaseIntakeFormData {
  onset_duration: string;
  severity: "mild" | "moderate" | "severe";
  medications: string;
  sleep_patterns: string;
  appetite_changes: string;
  substance_use: string;
  mental_health_history: string;
  previous_treatment: string;
  coping_mechanisms: string;
  trauma_history: string;
  suicide_risk: boolean;
  support_systems: string;
  education_employment: string;
  cultural_factors: string;
  diagnostic_impressions: string;
  treatment_recommendations: string;
  goals: string;
}

export type IntakeFormStatus = "submitted" | "reviewed" | "in_progress";

export interface IntakeFormSubmission {
  client_id: string;
  status: IntakeFormStatus;
  therapist_notes?: string;
}