import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Wand2, Lightbulb, Hash, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";

const Toolkit = () => {
  const userType = localStorage.getItem('userType') || 'creator';
  const [activeTab, setActiveTab] = useState("captions");
  const [inputText, setInputText] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedIdea, setSelectedIdea] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);

  const mockCaptions = [
    "Just dropped my latest look! ✨ Who else is obsessed with this color combo? #OOTD #Fashion",
    "Monday motivation: You're capable of amazing things! 💪 What's one goal you're crushing this week?",
    "Behind the scenes of today's shoot 📸 The magic happens when you least expect it! #BTS"
  ];

  const getContentIdeas = (topic: string) => {
    const ideas = {
      "fashion": [
        "Morning style routine that changed my wardrobe",
        "Rating viral fashion trends on TikTok",
        "Day in my life as a fashion creator",
        "My favorite affordable fashion finds under $50",
        "Styling one piece 5 different ways",
        "Fashion mistakes I made in my 20s",
        "Building a capsule wardrobe on a budget",
        "Thrifting haul and styling tips"
      ],
      "beauty": [
        "My 5-minute morning skincare routine",
        "Testing viral makeup hacks from TikTok",
        "Get ready with me for a night out",
        "Drugstore vs high-end makeup comparison",
        "My skincare journey and what actually worked",
        "Makeup mistakes that age you",
        "Holy grail products that changed my skin",
        "No-makeup makeup look tutorial"
      ],
      "lifestyle": [
        "My productive morning routine",
        "Rating productivity apps I use daily",
        "A realistic day in my life",
        "Self-care Sunday routine",
        "Healthy habits that improved my life",
        "Budget-friendly home organization tips",
        "Weekend reset routine",
        "How I stay motivated and focused"
      ],
      "fitness": [
        "15-minute morning workout routine",
        "What I eat in a day for energy",
        "Workout gear favorites under $30",
        "My fitness journey and what I learned",
        "Quick healthy meal prep ideas",
        "At-home workout equipment essentials",
        "Stretching routine for better sleep",
        "Fitness motivation tips that actually work"
      ]
    };
    
    return ideas[topic.toLowerCase() as keyof typeof ideas] || ideas.lifestyle;
  };

  const mockHashtags = [
    "#fashion", "#style", "#ootd", "#trendy", "#chic", "#fashionista", 
    "#styleinspo", "#outfit", "#fashionblogger", "#instafashion"
  ];

  const generateContent = () => {
    if (activeTab === "captions") {
      const randomCaption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
      setGeneratedContent(randomCaption);
    } else if (activeTab === "ideas") {
      if (!inputText.trim()) {
        setGeneratedContent("Please enter a topic to generate content ideas.");
        return;
      }
      const ideas = getContentIdeas(inputText.trim());
      const randomIdeas = ideas.sort(() => 0.5 - Math.random()).slice(0, 5);
      setGeneratedIdeas(randomIdeas);
      setGeneratedContent(randomIdeas.map((idea, index) => `${index + 1}. ${idea}`).join("\n"));
    } else {
      if (!selectedIdea) {
        setGeneratedContent("Please select a content idea first to generate relevant hashtags.");
        return;
      }
      setGeneratedContent(mockHashtags.join(" "));
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'creator' ? 'Creator AI Toolkit' : 'Brand AI Toolkit'}
          </h1>
          <p className="text-gray-600">
            {userType === 'creator' 
              ? 'Let AI help you create amazing content for your audience' 
              : 'AI-powered tools to create compelling brand content and campaigns'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Tools</h2>
              <div className="space-y-2">
                <Button
                  variant={activeTab === "captions" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("captions")}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Caption Writer
                </Button>
                <Button
                  variant={activeTab === "ideas" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("ideas")}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Content Ideas
                </Button>
                <Button
                  variant={activeTab === "hashtags" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("hashtags")}
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Hashtag Generator
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6">
              {activeTab === "captions" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Caption Writer</h2>
                  <Textarea
                    placeholder="Describe your post or upload an image..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-24"
                  />
                  <Button 
                    onClick={generateContent}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Caption
                  </Button>
                </div>
              )}

              {activeTab === "ideas" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Content Ideas</h2>
                  <Textarea
                    placeholder="Enter a topic (e.g., fashion, beauty, lifestyle, fitness)..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-16"
                  />
                  <Button 
                    onClick={generateContent}
                    className="bg-brand-lime hover:bg-brand-lime/90 text-black"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </Button>
                </div>
              )}

              {activeTab === "hashtags" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Hashtag Generator</h2>
                  {generatedIdeas.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Select a content idea:</p>
                      <div className="space-y-2">
                        {generatedIdeas.map((idea, index) => (
                          <Badge 
                            key={index}
                            variant={selectedIdea === idea ? "default" : "outline"}
                            className="cursor-pointer hover:bg-gray-50 mr-2 mb-2"
                            onClick={() => setSelectedIdea(idea)}
                          >
                            {idea}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {generatedIdeas.length === 0 && (
                    <p className="text-sm text-gray-500">Generate content ideas first to get relevant hashtags.</p>
                  )}
                  <Button 
                    onClick={generateContent}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                    disabled={!selectedIdea}
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    Generate Hashtags
                  </Button>
                </div>
              )}

              {generatedContent && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Generated Content</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{generatedContent}</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolkit;