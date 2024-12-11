import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface Assessment {
  id: string;
  session_date: string;
  session_type: string;
  symptom_status: string;
  client: {
    id: string;
    client_name: string;
  } | null;
}

export function AssessmentsList() {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) return [];

      const { data, error } = await supabase
        .from("assessments")
        .select(`
          id,
          session_date,
          session_type,
          symptom_status,
          client:profiles!assessments_client_id_fkey(id, client_name)
        `)
        .eq("therapist_id", profile.id)
        .order("session_date", { ascending: false });

      if (error) throw error;
      return (data || []) as Assessment[];
    },
  });

  if (isLoading) {
    return <div>Loading assessments...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments?.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell>
                {format(new Date(assessment.session_date), "PPp")}
              </TableCell>
              <TableCell>{assessment.client?.client_name}</TableCell>
              <TableCell>{assessment.session_type}</TableCell>
              <TableCell>{assessment.symptom_status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}