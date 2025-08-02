import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Instagram, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

const AutoReplyBot = () => {
  const [isActive, setIsActive] = useState(false);
  
  const mockTemplates = [
    { id: 1, trigger: "price", response: "Hey! Thanks for asking about pricing. Check out my link in bio for all current rates! 💕" },
    { id: 2, trigger: "collaboration", response: "Hi! I'd love to work with you. Please email me at hello@avajustin.com for collaborations! ✨" },
    { id: 3, trigger: "outfit", response: "Thanks for loving my outfit! You can find similar pieces linked in my bio 👗" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto-Reply Bot</h1>
          <p className="text-gray-600">Automatically respond to common questions on your posts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bot Status */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Bot Status</h2>
                <Switch 
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
              
              <div className="text-center">
                <Bot className={`w-16 h-16 mx-auto mb-4 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
                <Badge variant={isActive ? "default" : "secondary"} className="mb-4">
                  {isActive ? "Active" : "Inactive"}
                </Badge>
                <p className="text-sm text-gray-600">
                  {isActive ? "Your bot is monitoring comments" : "Bot is currently disabled"}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Connected Platform</p>
                  <div className="flex items-center justify-center mt-2">
                    <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                    <span className="font-medium">@ava.justin</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Replies sent today</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response rate</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg response time</span>
                  <span className="font-medium">2 min</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Templates */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Response Templates</h2>
                <Button className="bg-brand-blue hover:bg-brand-blue/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Template
                </Button>
              </div>

              <div className="space-y-4">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">Trigger Keywords</h3>
                        <Badge variant="outline">{template.trigger}</Badge>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Auto Response</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start">
                          <MessageCircle className="w-4 h-4 text-brand-blue mr-2 mt-1 flex-shrink-0" />
                          <p className="text-sm">{template.response}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Add New Template */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Create New Template</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Trigger Keywords</label>
                  <Input placeholder="e.g., price, cost, how much" />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple keywords with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Response Message</label>
                  <Textarea 
                    placeholder="Enter your auto-response message..."
                    className="min-h-20"
                  />
                </div>
                
                <Button className="bg-brand-lime hover:bg-brand-lime/90 text-black">
                  Save Template
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoReplyBot;