import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTreatmentSuggestions(section: string, ageGroup: string, modality: string) {
  return useQuery({
    queryKey: ["treatment-suggestions", section, ageGroup, modality],
    queryFn: async () => {
      console.log("Fetching suggestions for:", { section, ageGroup, modality });
      
      try {
        const { data, error } = await supabase
          .from("treatment_suggestions")
          .select("suggestions")
          .eq("section", section)
          .eq("age_group", ageGroup)
          .eq("modality", modality)
          .maybeSingle();

        if (error) {
          console.error("Error fetching suggestions:", error);
          throw error;
        }

        if (!data) {
          console.log("No suggestions found for:", { section, ageGroup, modality });
          return [];
        }

        return data.suggestions || [];
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}