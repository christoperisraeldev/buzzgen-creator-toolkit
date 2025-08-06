import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navigate } from "react-router-dom";
import { Wand2, Lightbulb, Hash, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Toolkit = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("captions");
  const [inputText, setInputText] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedIdea, setSelectedIdea] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userType = profile?.user_type || 'creator';

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-toolkit', {
        body: {
          type: activeTab,
          prompt: activeTab === 'hashtags' ? selectedIdea : inputText,
          topic: inputText,
          userType
        }
      });

      if (error) throw error;

      if (activeTab === 'ideas') {
        // Parse the numbered list into an array
        const ideas = data.generatedContent
          .split('\n')
          .filter((line: string) => line.trim() && /^\d+/.test(line.trim()))
          .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());
        
        setGeneratedIdeas(ideas);
        setGeneratedContent(data.generatedContent);
      } else {
        setGeneratedContent(data.generatedContent);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
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
                    disabled={isGenerating || !inputText.trim()}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Caption'}
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
                    disabled={isGenerating || !inputText.trim()}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Ideas'}
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
                    disabled={isGenerating || !selectedIdea}
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Hashtags'}
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