import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTreatmentSuggestions(section: string, ageGroup: string, modality: string) {
  return useQuery({
    queryKey: ["treatment-suggestions", section, ageGroup, modality],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("treatment_suggestions")
        .select("suggestions")
        .eq("section", section)
        .eq("age_group", ageGroup)
        .eq("modality", modality)
        .single();

      if (error) {
        console.error("Error fetching suggestions:", error);
        return [];
      }

      return data?.suggestions || [];
    },
  });
}