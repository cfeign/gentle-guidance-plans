import { Card } from "@/components/ui/card";
import { Brain, Dog, Users, Waves, Heart, Leaf, BookOpen, Smile, Sun } from "lucide-react";

interface TherapyModalityProps {
  name: string;
  description: string;
  type: string;
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

export function TherapyModality({ name, description, type }: TherapyModalityProps) {
  const Icon = modalityIcons[type] || BookOpen;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-up bg-white border-therapy-secondary hover:border-therapy-primary cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-therapy-secondary rounded-full">
          <Icon className="w-6 h-6 text-therapy-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}