import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link, Navigate } from "react-router-dom";
import { Plus, ExternalLink, BarChart3, QrCode, MessageSquare, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import LinkManager from "@/components/LinkManager";
import AccountManager from "@/components/AccountManager";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useLinks } from "@/hooks/useLinks";
import { useAnalytics } from "@/hooks/useAnalytics";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { links, loading: linksLoading } = useLinks();
  const { analytics, trackPageView } = useAnalytics();

  useEffect(() => {
    if (user) {
      trackPageView();
    }
  }, [user]);

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
  const selectedNiche = profile?.selected_niche || 'Content Creator';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.display_name || (userType === 'creator' ? 'Creator' : 'Brand Manager')}!
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
              {linksLoading ? (
                <div>Loading links...</div>
              ) : (
                <LinkManager />
              )}
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
                    <span className="font-semibold">{analytics.totalClicks.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-blue h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Active Links</span>
                    <span className="font-semibold">{links.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-lime h-2 rounded-full" style={{width: `${Math.min((links.length / 10) * 100, 100)}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="font-semibold">{analytics.totalViews.toLocaleString()}</span>
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
                  <span className="font-medium">{analytics.totalViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Total Clicks</span>
                  <span className="font-medium">{analytics.totalClicks.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Click Rate</span>
                  <span className="font-medium text-green-600">
                    {analytics.totalViews > 0 ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1) : 0}%
                  </span>
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