import { Button } from "@/components/ui/button";
import { useRole } from "../App";
import { UserRound, HeartHandshake } from "lucide-react";

export function RoleSelector() {
  const { role, setRole } = useRole();

  return (
    <div className="flex justify-end mb-4 gap-2">
      <Button
        variant={role === "client" ? "default" : "outline"}
        onClick={() => setRole("client")}
        className="gap-2"
      >
        <UserRound className="w-4 h-4" />
        Client View
      </Button>
      <Button
        variant={role === "therapist" ? "default" : "outline"}
        onClick={() => setRole("therapist")}
        className="gap-2"
      >
        <HeartHandshake className="w-4 h-4" />
        Therapist View
      </Button>
    </div>
  );
}