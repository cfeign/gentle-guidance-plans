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

export function AssessmentsList() {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) return [];

      const { data } = await supabase
        .from("assessments")
        .select(`
          *,
          client:client_id(id, client_name)
        `)
        .eq("therapist_id", profile.id)
        .order("session_date", { ascending: false });

      return data || [];
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