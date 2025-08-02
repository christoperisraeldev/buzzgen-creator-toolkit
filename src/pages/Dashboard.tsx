import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, BarChart3, QrCode, MessageSquare, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const mockLinks = [
    { name: "My Instagram", url: "instagram.com/ava.justin", clicks: 1247 },
    { name: "YouTube Channel", url: "youtube.com/avajustin", clicks: 890 },
    { name: "Shop My Looks", url: "shop.buzzgen.ai/ava", clicks: 567 },
    { name: "Book a Call", url: "cal.com/avajustin", clicks: 234 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ava!</h1>
          <p className="text-gray-600">Manage your links and grow your brand</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Link Manager */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Links</h2>
                <Button className="bg-brand-blue hover:bg-brand-blue/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{link.name}</h3>
                      <p className="text-sm text-gray-500">{link.url}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{link.clicks} clicks</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Tools */}
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Quick Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/toolkit">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    AI Toolkit
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <QrCode className="w-6 h-6 mb-2" />
                  QR Code
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <MessageSquare className="w-6 h-6 mb-2" />
                  Contact Form
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Coffee className="w-6 h-6 mb-2" />
                  Tip Jar
                </Button>
              </div>
            </Card>
          </div>

          {/* Analytics & Profile */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Clicks</span>
                    <span className="font-semibold">5.6k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-blue h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Mobile Traffic</span>
                    <span className="font-semibold">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-lime h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tip Jar</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">QR Generator</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contact Form</span>
                  <Switch />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Customize Theme
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;