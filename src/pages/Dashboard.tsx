import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, BarChart3, QrCode, MessageSquare, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import LinkManager from "@/components/LinkManager";
import AccountManager from "@/components/AccountManager";

const Dashboard = () => {
  const userType = localStorage.getItem('userType') || 'creator';
  const selectedNiche = localStorage.getItem('selectedNiche') || 'Content Creator';
  
  // Initialize links from localStorage or use default
  const getInitialLinks = () => {
    const stored = localStorage.getItem('userLinks');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default links based on user type
    if (userType === 'creator') {
      return [
        { id: "1", title: "My Instagram", url: "https://instagram.com/ava.justin", clicks: 1247 },
        { id: "2", title: "YouTube Channel", url: "https://youtube.com/avajustin", clicks: 890 },
        { id: "3", title: "Shop My Looks", url: "https://shop.buzzgen.ai/ava", clicks: 567 },
        { id: "4", title: "Book a Call", url: "https://cal.com/avajustin", clicks: 234 },
      ];
    } else {
      return [
        { id: "1", title: "Brand Website", url: "https://mybrand.com", clicks: 2340 },
        { id: "2", title: "Product Catalog", url: "https://shop.mybrand.com", clicks: 1890 },
        { id: "3", title: "Partnership Form", url: "https://partner.mybrand.com", clicks: 856 },
        { id: "4", title: "Contact Us", url: "https://contact.mybrand.com", clicks: 423 },
      ];
    }
  };

  const [userLinks, setUserLinks] = useState(getInitialLinks);

  useEffect(() => {
    localStorage.setItem('userLinks', JSON.stringify(userLinks));
  }, [userLinks]);

  const handleLinksChange = (newLinks: any[]) => {
    setUserLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userType === 'creator' ? 'Creator' : 'Brand Manager'}!
          </h1>
          <p className="text-gray-600">
            {userType === 'creator' 
              ? `Manage your ${selectedNiche} content and grow your personal brand` 
              : 'Connect with creators and manage your brand partnerships'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Link Manager */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {userType === 'creator' ? 'Your Creator Links' : 'Your Brand Links'}
                </h2>
              </div>
              <LinkManager links={userLinks} onLinksChange={handleLinksChange} />
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
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/planner">
                    <QrCode className="w-6 h-6 mb-2" />
                    {userType === 'creator' ? 'Content Planner' : 'Campaign Planner'}
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/media-kit">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    {userType === 'creator' ? 'Media Kit' : 'Brand Kit'}
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/shop">
                    <Coffee className="w-6 h-6 mb-2" />
                    {userType === 'creator' ? 'Creator Shop' : 'Brand Shop'}
                  </Link>
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
                    <span className="font-semibold">{userLinks.reduce((sum, link) => sum + link.clicks, 0).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-blue h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Active Links</span>
                    <span className="font-semibold">{userLinks.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-lime h-2 rounded-full" style={{width: `${Math.min((userLinks.length / 10) * 100, 100)}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Mobile Traffic</span>
                    <span className="font-semibold">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-blue h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Link-in-Bio</h3>
                  <p className="text-gray-600 text-sm">Manage your bio link page</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm text-gray-500">Live</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Total Views</span>
                  <span className="font-medium">15,420</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Total Clicks</span>
                  <span className="font-medium">3,847</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Click Rate</span>
                  <span className="font-medium text-green-600">24.9%</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to="/bio-link-manager" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage
                    </Button>
                  </Link>
                  <Link to="/bio-link" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </Link>
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

            {/* Account Management */}
            <AccountManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;