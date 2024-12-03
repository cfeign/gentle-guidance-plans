import { Card } from "@/components/ui/card";
import { Brain, Dog, Users, Waves, Heart, Leaf, BookOpen, Smile, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

const availableModalities = ["emdr", "animal-assisted"];

export function TherapyModality({ name, description, type, isSelected }: TherapyModalityProps) {
  const Icon = modalityIcons[type] || BookOpen;
  const isAvailable = availableModalities.includes(type);

  return (
    <Card 
      className={`p-6 transition-all duration-300 animate-fade-up border-2 relative ${
        isSelected 
          ? "border-therapy-primary bg-therapy-secondary/10" 
          : isAvailable
          ? "border-therapy-secondary hover:border-therapy-primary hover:shadow-lg bg-white cursor-pointer"
          : "border-gray-100 bg-gray-50 opacity-75"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${
          isSelected 
            ? "bg-therapy-primary" 
            : isAvailable
            ? "bg-therapy-secondary"
            : "bg-gray-200"
        }`}>
          <Icon className={`w-6 h-6 ${
            isSelected 
              ? "text-white" 
              : isAvailable
              ? "text-therapy-primary"
              : "text-gray-400"
          }`} />
        </div>
        <div>
          <h3 className={`font-semibold text-lg ${
            isAvailable ? "text-gray-800" : "text-gray-500"
          }`}>{name}</h3>
          <p className={`text-sm ${
            isAvailable ? "text-gray-600" : "text-gray-400"
          }`}>{description}</p>
        </div>
      </div>
      
      {!isAvailable && (
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-therapy-soft text-gray-500 font-medium"
        >
          Coming Soon
        </Badge>
      )}
      
      {isAvailable && (
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-[#F2FCE2] text-green-600 font-medium"
        >
          Available
        </Badge>
      )}
    </Card>
  );
}