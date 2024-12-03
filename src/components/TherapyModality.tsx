import { Card } from "@/components/ui/card";
import { Brain, Dog, Users, Waves, Heart, Leaf, BookOpen, Smile, Sun } from "lucide-react";

interface TherapyModalityProps {
  name: string;
  description: string;
  type: string;
  isSelected?: boolean;
}

const modalityIcons: { [key: string]: any } = {
  cbt: Brain,
  "animal-assisted": Dog,
  "family-therapy": Users,
  emdr: Waves,
  "art-therapy": Heart,
  "nature-therapy": Leaf,
  "psychodynamic": BookOpen,
  "positive-psychology": Smile,
  "mindfulness": Sun,
};

export function TherapyModality({ name, description, type, isSelected }: TherapyModalityProps) {
  const Icon = modalityIcons[type] || BookOpen;

  return (
    <Card 
      className={`p-6 hover:shadow-lg transition-all duration-300 animate-fade-up border-2 ${
        isSelected 
          ? "border-therapy-primary bg-therapy-secondary/10" 
          : "border-therapy-secondary hover:border-therapy-primary bg-white"
      } cursor-pointer`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${
          isSelected ? "bg-therapy-primary" : "bg-therapy-secondary"
        }`}>
          <Icon className={`w-6 h-6 ${
            isSelected ? "text-white" : "text-therapy-primary"
          }`} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}