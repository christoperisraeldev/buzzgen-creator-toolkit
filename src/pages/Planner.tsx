import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Instagram, Youtube, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const Planner = () => {
  const mockPosts = [
    { id: 1, content: "Morning workout routine", platform: "Instagram", time: "08:00", status: "scheduled" },
    { id: 2, content: "OOTD - Spring vibes", platform: "TikTok", time: "12:00", status: "scheduled" },
    { id: 3, content: "YouTube: Day in my life", platform: "YouTube", time: "18:00", status: "draft" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Planner</h1>
            <p className="text-gray-600">Schedule and manage your content across platforms</p>
          </div>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Scheduled Post
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">This Week</h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center p-2 font-medium text-gray-600">
                    {day}
                  </div>
                ))}
                {Array.from({length: 7}, (_, i) => (
                  <div key={i} className="border border-gray-200 rounded h-32 p-2 hover:bg-gray-50">
                    <span className="text-sm text-gray-500">{i + 1}</span>
                    {i === 2 && (
                      <div className="mt-1 space-y-1">
                        <div className="bg-brand-blue/10 text-brand-blue text-xs p-1 rounded flex items-center">
                          <Instagram className="w-3 h-3 mr-1" />
                          8:00
                        </div>
                        <div className="bg-brand-lime/10 text-green-700 text-xs p-1 rounded">
                          TikTok 12:00
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Scheduled Posts */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {mockPosts.map((post) => (
                  <div key={post.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={post.status === "scheduled" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {post.status}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.time}
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-2">{post.content}</p>
                    <div className="flex items-center">
                      {post.platform === "Instagram" && <Instagram className="w-4 h-4 text-pink-500 mr-1" />}
                      {post.platform === "YouTube" && <Youtube className="w-4 h-4 text-red-500 mr-1" />}
                      <span className="text-xs text-gray-600">{post.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram Insights
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;