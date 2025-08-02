import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Music, Dumbbell, Utensils, Gamepad2, Palette, BookOpen } from "lucide-react";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<string>("");
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
    { name: "Technology", icon: BookOpen },
    { name: "Travel", icon: Camera },
    { name: "Beauty", icon: Palette },
    { name: "Business", icon: BookOpen },
    { name: "Health", icon: Dumbbell },
    { name: "Photography", icon: Camera },
    { name: "Comedy", icon: Music },
  ];

  const socials = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Twitch"];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save user data to localStorage and navigate to dashboard
      localStorage.setItem('userType', userType);
      localStorage.setItem('selectedNiche', selectedNiche);
      localStorage.setItem('selectedSocials', JSON.stringify(selectedSocials));
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
              {[1, 2, 3, 4].map((step) => (
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
              <h2 className="text-2xl font-semibold text-center">Are you a creator or a brand?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setUserType("creator")}
                  className={`p-6 rounded-lg border-2 transition-all text-center ${
                    userType === "creator"
                      ? "border-brand-blue bg-brand-blue/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-16 h-16 bg-brand-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Creator</h3>
                  <p className="text-sm text-gray-600">I create content and want to grow my personal brand</p>
                </button>
                <button
                  onClick={() => setUserType("brand")}
                  className={`p-6 rounded-lg border-2 transition-all text-center ${
                    userType === "brand"
                      ? "border-brand-blue bg-brand-blue/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-16 h-16 bg-brand-lime/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Brand</h3>
                  <p className="text-sm text-gray-600">I represent a company and want to connect with creators</p>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
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

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center">Connect your socials</h2>
              <div className="space-y-3">
                {socials.map((social) => (
                  <div
                    key={social}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{social}</span>
                      {selectedSocials.includes(social) && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">Your link:</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              buzzgen.ai/yourname
                            </code>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Copy
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
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

          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-semibold">You're all set!</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Profile</h3>
                  <Badge className="mr-2 mb-2">{userType}</Badge>
                  <Badge className="mr-2 mb-2">{selectedNiche}</Badge>
                  {selectedSocials.map((social) => (
                    <Badge key={social} variant="outline" className="mr-2 mb-2">
                      {social}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600">
                  Ready to start building your {userType === "creator" ? "creator" : "brand"} toolkit?
                </p>
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
              disabled={
                (currentStep === 1 && !userType) ||
                (currentStep === 2 && !selectedNiche)
              }
            >
              {currentStep === 4 ? "Go to Dashboard" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;