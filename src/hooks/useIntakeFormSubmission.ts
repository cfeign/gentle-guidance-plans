import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BaseIntakeFormSchema } from "@/components/intake/schema";

type IntakeFormStatus = "submitted" | "reviewed" | "in_progress";

interface UseIntakeFormSubmissionProps {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

interface IntakeFormSubmission {
	client_id: string;
	status: IntakeFormStatus;
	therapist_notes?: string;
}

export function useIntakeFormSubmission({ onSuccess, onError }: UseIntakeFormSubmissionProps = {}) {
	const { toast } = useToast();

	const submitIntakeForm = async <T extends BaseIntakeFormSchema>(
		formData: T,
		status: IntakeFormStatus = "submitted"
	) => {
		try {
			const { data: profile } = await supabase
				.from("profiles")
				.select("id")
				.single();

			if (!profile?.id) {
				throw new Error("Please sign in to submit a form");
			}

			const submission: IntakeFormSubmission = {
				client_id: profile.id,
				status,
				therapist_notes: status === "reviewed" ? JSON.stringify(formData) : undefined,
			};

			const { error } = await supabase
				.from("intake_forms")
				.insert({ ...formData, ...submission });

			if (error) throw error;

			toast({
				title: "Success",
				description: "Form submitted successfully",
			});

			onSuccess?.();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Failed to submit form";
			
			console.error("Error submitting form:", error);
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});

			onError?.(error instanceof Error ? error : new Error(errorMessage));
		}
	};

	return { submitIntakeForm };
}