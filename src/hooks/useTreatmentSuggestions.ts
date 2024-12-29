import { useState, useEffect } from "react";
import { AgeGroup, Section, Modality } from "@/types/forms";


const mockSuggestions: Record<Section, Record<AgeGroup, string[]>> = {
  presenting_problems: {
    adults: [
      "Client reports experiencing persistent anxiety with physical symptoms including racing heart, sweating, and difficulty breathing.",
      "Symptoms of depression including low mood, decreased interest in activities, and disrupted sleep patterns for the past 3 months.",
      "Recent life transitions causing significant stress and adjustment difficulties.",
    ],
    teens: [
      "Adolescent experiencing academic pressure and social anxiety affecting school performance.",
      "Reports of conflict with parents regarding boundaries and independence.",
      "Difficulty managing emotions and expressing feelings appropriately.",
    ],
    children: [
      "Child displaying behavioral difficulties at home and school, including difficulty following rules.",
      "Separation anxiety affecting school attendance and social activities.",
      "Recent changes in family structure impacting emotional well-being.",
    ],
  },
  diagnostic_impressions: {
    adults: [
      "Meets criteria for Generalized Anxiety Disorder (F41.1) with persistent worry and physical symptoms.",
      "Major Depressive Disorder, single episode, moderate (F32.1) with significant impact on daily functioning.",
      "Adjustment Disorder with mixed anxiety and depressed mood (F43.23) related to recent life changes.",
    ],
    teens: [
      "Social Anxiety Disorder (F40.10) primarily manifesting in academic and peer settings.",
      "Parent-Child Relational Problem (Z62.820) affecting family dynamics.",
      "Unspecified Anxiety Disorder (F41.9) with features of perfectionism.",
    ],
    children: [
      "Attention-Deficit/Hyperactivity Disorder, combined presentation (F90.2).",
      "Separation Anxiety Disorder (F93.0) affecting school attendance.",
      "Adjustment Disorder with disturbance of conduct (F43.24).",
    ],
  },
  treatment_recommendations: {
    adults: [
      "Weekly individual therapy using CBT approach to address anxiety and develop coping strategies.",
      "Combination of supportive therapy and behavioral activation for depression.",
      "Solution-focused therapy to address adjustment difficulties and build resilience.",
    ],
    teens: [
      "Individual therapy focusing on social skills and anxiety management.",
      "Family therapy sessions to address communication and boundary issues.",
      "CBT and mindfulness techniques for emotion regulation.",
    ],
    children: [
      "Play therapy to address behavioral issues and emotional expression.",
      "Parent coaching sessions to develop consistent behavioral strategies.",
      "Gradual exposure therapy for separation anxiety.",
    ],
  },
};

export function useTreatmentSuggestions(
  section: Section,
  ageGroup: AgeGroup,
  modality: Modality
) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        if (!mounted) return;

        if (!mockSuggestions[section]) {
          throw new Error(`Invalid section: ${section}`);
        }

        if (!mockSuggestions[section][ageGroup]) {
          throw new Error(`Invalid age group: ${ageGroup}`);
        }

        const sectionSuggestions = mockSuggestions[section][ageGroup];
        setSuggestions(sectionSuggestions);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setSuggestions([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [section, ageGroup, modality]);

  return { suggestions, isLoading, error };
}