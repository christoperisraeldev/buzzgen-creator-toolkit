import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Music, Dumbbell, Utensils, Gamepad2, Palette, BookOpen } from "lucide-react";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState<string>("");
  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);

  const niches = [
    { name: "Fashion", icon: Camera },
    { name: "Fitness", icon: Dumbbell },
    { name: "Music", icon: Music },
    { name: "Food", icon: Utensils },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Art", icon: Palette },
    { name: "Education", icon: BookOpen },
  ];

  const socials = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Twitch"];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Let's set up your profile</h1>
          <p className="text-gray-600">This will help us personalize your experience</p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? "bg-brand-blue" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center">What's your niche?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {niches.map((niche) => {
                  const Icon = niche.icon;
                  return (
                    <button
                      key={niche.name}
                      onClick={() => setSelectedNiche(niche.name)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedNiche === niche.name
                          ? "border-brand-blue bg-brand-blue/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <span className="block text-sm font-medium">{niche.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center">Connect your socials</h2>
              <div className="space-y-3">
                {socials.map((social) => (
                  <div
                    key={social}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <span className="font-medium">{social}</span>
                    <Button
                      variant={selectedSocials.includes(social) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedSocials.includes(social)) {
                          setSelectedSocials(selectedSocials.filter(s => s !== social));
                        } else {
                          setSelectedSocials([...selectedSocials, social]);
                        }
                      }}
                    >
                      {selectedSocials.includes(social) ? "Connected" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-semibold">You're all set!</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Profile</h3>
                  <Badge className="mr-2">{selectedNiche}</Badge>
                  {selectedSocials.map((social) => (
                    <Badge key={social} variant="outline" className="mr-2">
                      {social}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600">Ready to start building your creator toolkit?</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" disabled={currentStep === 1}>
              Skip
            </Button>
            <Button
              onClick={handleNext}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              {currentStep === 3 ? "Go to Dashboard" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;