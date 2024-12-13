import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTreatmentSuggestions(section: string, ageGroup: string, modality: string) {
  return useQuery({
    queryKey: ["treatment-suggestions", section, ageGroup, modality],
    queryFn: async () => {
      console.log("Fetching suggestions for:", { section, ageGroup, modality });
      
      const { data, error } = await supabase
        .from("treatment_suggestions")
        .select("suggestions")
        .eq("section", section)
        .eq("age_group", ageGroup)
        .eq("modality", modality);

      if (error) {
        console.error("Error fetching suggestions:", error);
        return [];
      }

      // Return the first row's suggestions if found, otherwise empty array
      return data?.[0]?.suggestions || [];
    },
  });
}