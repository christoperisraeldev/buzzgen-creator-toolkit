import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Wand2, Lightbulb, Hash, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";

const Toolkit = () => {
  const [activeTab, setActiveTab] = useState("captions");
  const [inputText, setInputText] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const mockCaptions = [
    "Just dropped my latest look! ✨ Who else is obsessed with this color combo? #OOTD #Fashion",
    "Monday motivation: You're capable of amazing things! 💪 What's one goal you're crushing this week?",
    "Behind the scenes of today's shoot 📸 The magic happens when you least expect it! #BTS"
  ];

  const mockIdeas = [
    "Morning routine that changed my life",
    "Rating viral TikTok trends",
    "Day in my life as a creator",
    "My favorite affordable finds",
    "Q&A with my followers"
  ];

  const mockHashtags = [
    "#fashion", "#style", "#ootd", "#trendy", "#chic", "#fashionista", 
    "#styleinspo", "#outfit", "#fashionblogger", "#instafashion"
  ];

  const generateContent = () => {
    if (activeTab === "captions") {
      const randomCaption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
      setGeneratedContent(randomCaption);
    } else if (activeTab === "ideas") {
      const randomIdeas = mockIdeas.slice(0, 3);
      setGeneratedContent(randomIdeas.join("\n• "));
    } else {
      setGeneratedContent(mockHashtags.join(" "));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Toolkit</h1>
          <p className="text-gray-600">Let AI help you create amazing content</p>
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
                  <div className="space-y-2">
                    <Badge>Fashion</Badge>
                    <Badge>Lifestyle</Badge>
                    <Badge>Beauty</Badge>
                  </div>
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
                  <div className="grid grid-cols-3 gap-2">
                    {["Fashion", "Beauty", "Lifestyle", "Fitness", "Food", "Travel"].map(category => (
                      <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-50">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={generateContent}
                    className="bg-brand-blue hover:bg-brand-blue/90"
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
                    <Button variant="ghost" size="sm">
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