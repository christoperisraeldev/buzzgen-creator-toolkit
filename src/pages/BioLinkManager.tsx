import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  ExternalLink, 
  QrCode, 
  BarChart3, 
  Settings, 
  Copy,
  Eye,
  Star,
  TrendingUp,
  Download,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import LinkManager from "@/components/LinkManager";

interface BioLinkSettings {
  title: string;
  description: string;
  backgroundColor: string;
  accentColor: string;
  showVerifiedBadge: boolean;
  showAnalytics: boolean;
  customDomain: string;
}

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  topSources: Array<{ source: string; clicks: number; percentage: number }>;
  clicksByDay: Array<{ day: string; clicks: number }>;
}

const BioLinkManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("links");
  const [links, setLinks] = useState([
    {
      id: "1",
      title: "🎯 BUZZGEN AI Toolkit",
      url: "/toolkit",
      clicks: 1247
    },
    {
      id: "2",
      title: "📅 Free Content Calendar",
      url: "/toolkit?download=calendar",
      clicks: 892
    }
  ]);

  const [settings, setSettings] = useState<BioLinkSettings>({
    title: "Ava Justin",
    description: "Fashion & lifestyle creator passionate about sharing style tips ✨",
    backgroundColor: "#ffffff",
    accentColor: "#3b82f6",
    showVerifiedBadge: true,
    showAnalytics: true,
    customDomain: ""
  });

  const [analytics] = useState<AnalyticsData>({
    totalViews: 15420,
    totalClicks: 3847,
    topSources: [
      { source: "Instagram Bio", clicks: 2341, percentage: 60.8 },
      { source: "TikTok Bio", clicks: 925, percentage: 24.1 },
      { source: "YouTube About", clicks: 581, percentage: 15.1 }
    ],
    clicksByDay: [
      { day: "Mon", clicks: 420 },
      { day: "Tue", clicks: 385 },
      { day: "Wed", clicks: 620 },
      { day: "Thu", clicks: 580 },
      { day: "Fri", clicks: 720 },
      { day: "Sat", clicks: 850 },
      { day: "Sun", clicks: 680 }
    ]
  });

  const bioLinkUrl = `https://buzzgen.app/bio/${settings.title.toLowerCase().replace(/\s+/g, '')}`;

  const copyBioLink = () => {
    navigator.clipboard.writeText(bioLinkUrl + "?utm_source=instagram_bio&utm_medium=bio_link");
    toast({
      title: "Bio Link Copied!",
      description: "Your bio link with tracking has been copied to clipboard",
    });
  };

  const generateQRCode = () => {
    // In a real app, integrate with QR code generation service
    toast({
      title: "QR Code Generated",
      description: "QR code for your bio link has been created",
    });
  };

  const previewBioLink = () => {
    window.open('/bio-link?preview=true', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Link in Bio Manager</h1>
          <p className="text-gray-600">Create and manage your professional bio link page</p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={copyBioLink} variant="outline" className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copy Bio Link
          </Button>
          <Button onClick={generateQRCode} variant="outline" className="flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </Button>
          <Button onClick={previewBioLink} variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <div className="ml-auto">
            <Badge variant="outline" className="text-green-600 border-green-600">
              ✓ Live
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="links">Links</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="links" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Manage Links</h3>
                    <Badge className="bg-primary/10 text-primary">
                      {links.length} active links
                    </Badge>
                  </div>
                  <LinkManager />
                </Card>

                {/* Link Performance */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Link Performance</h3>
                  <div className="space-y-4">
                    {links.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{link.title}</h4>
                          <p className="text-sm text-gray-500">{link.url}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">{link.clicks}</div>
                          <div className="text-sm text-gray-500">clicks</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Customize Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Page Title</Label>
                      <Input
                        id="title"
                        value={settings.title}
                        onChange={(e) => setSettings({...settings, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Bio Description</Label>
                      <Textarea
                        id="description"
                        value={settings.description}
                        onChange={(e) => setSettings({...settings, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bg-color">Background Color</Label>
                        <Input
                          id="bg-color"
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <Input
                          id="accent-color"
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                      </div>
                      <Eye className="w-8 h-8 text-blue-500" />
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Clicks</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalClicks.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Click Rate</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-500" />
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                  <div className="space-y-4">
                    {analytics.topSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-medium">{source.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{source.clicks}</div>
                          <div className="text-sm text-gray-500">{source.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Advanced Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Verified Badge</Label>
                        <p className="text-sm text-gray-500">Show verification checkmark</p>
                      </div>
                      <Switch
                        checked={settings.showVerifiedBadge}
                        onCheckedChange={(checked) => setSettings({...settings, showVerifiedBadge: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Public Analytics</Label>
                        <p className="text-sm text-gray-500">Show click counts to visitors</p>
                      </div>
                      <Switch
                        checked={settings.showAnalytics}
                        onCheckedChange={(checked) => setSettings({...settings, showAnalytics: checked})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-domain">Custom Domain (Pro)</Label>
                      <Input
                        id="custom-domain"
                        placeholder="yourdomain.com"
                        value={settings.customDomain}
                        onChange={(e) => setSettings({...settings, customDomain: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">UTM Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Your bio link automatically includes UTM parameters for tracking:
                  </p>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    {bioLinkUrl}?utm_source=instagram_bio&utm_medium=bio_link
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Customize UTM parameters for different platforms to track performance accurately.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Bio Link</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Label className="text-xs text-gray-500">URL</Label>
                  <p className="font-mono text-sm break-all">{bioLinkUrl}</p>
                </div>
                <Button onClick={copyBioLink} className="w-full" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">2,847 views</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Day</span>
                  <span className="font-semibold">Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Top Link</span>
                  <span className="font-semibold">AI Toolkit</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pro Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>Use emojis in link titles to increase click rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Update links regularly to keep content fresh</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>Pin your most important link to the top</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioLinkManager;