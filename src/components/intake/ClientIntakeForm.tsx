import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IntakeFormData {
  client_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  emergency_contact: string;
  emergency_phone: string;
  insurance_provider: string;
  insurance_id: string;
  presenting_problems: string;
  medical_history: string;
  family_background: string;
  current_functioning: string;
}

export function ClientIntakeForm() {
  const { toast } = useToast();
  const form = useForm<IntakeFormData>();

  const onSubmit = async (data: IntakeFormData) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .single();

      if (!profile?.id) {
        toast({
          title: "Error",
          description: "Please sign in to submit an intake form",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("intake_forms").insert({
        ...data,
        therapist_id: profile.id,
        status: "submitted",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Intake form has been saved",
      });
    } catch (error) {
      console.error("Error saving intake form:", error);
      toast({
        title: "Error",
        description: "Failed to save intake form",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Emergency contact phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insurance_provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Provider</FormLabel>
                <FormControl>
                  <Input placeholder="Insurance provider name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insurance_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance ID</FormLabel>
                <FormControl>
                  <Input placeholder="Insurance ID number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="presenting_problems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presenting Problems</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the primary reasons for seeking treatment..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medical_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Relevant medical history and current medications..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="family_background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Background</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Family history and current family dynamics..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current_functioning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Functioning</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Current daily functioning, including sleep, appetite, and energy levels..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Intake Form
        </Button>
      </form>
    </Form>
  );
}