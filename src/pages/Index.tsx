import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ClipboardList, FileText, Receipt } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Treatment Plans",
      description: "Create and manage personalized treatment plans for your clients",
      icon: ClipboardList,
      path: "/treatment-plan",
      isComingSoon: false,
    },
    {
      title: "Intake & Assessment",
      description: "Streamline your client onboarding process",
      icon: FileText,
      path: "/intake",
      isComingSoon: true,
    },
    {
      title: "Billing",
      description: "Manage invoices and payments efficiently",
      icon: Receipt,
      path: "/billing",
      isComingSoon: true,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Welcome to Your Practice Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative"
            onClick={() => !card.isComingSoon && navigate(card.path)}
          >
            <Card className={`p-6 h-full transition-all duration-300 ${
              !card.isComingSoon ? "hover:shadow-lg cursor-pointer" : "opacity-75"
            }`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-therapy-secondary">
                  <card.icon className="w-8 h-8 text-therapy-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </Card>
            
            {card.isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-lg backdrop-blur-[1px]">
                <span className="bg-therapy-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;