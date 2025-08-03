import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon, Instagram, Youtube, Clock, Eye } from "lucide-react";
import { format, isSameDay } from "date-fns";
import Navbar from "@/components/Navbar";
import ScheduledPostManager from "@/components/ScheduledPostManager";

const Planner = () => {
  const userType = localStorage.getItem('userType') || 'creator';
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Initialize scheduled posts from localStorage
  const getInitialPosts = () => {
    const stored = localStorage.getItem('scheduledPosts');
    if (stored) {
      return JSON.parse(stored).map((post: any) => ({
        ...post,
        date: new Date(post.date)
      }));
    }
    
    // Default posts
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (userType === 'creator') {
      return [
        { id: "1", content: "Morning workout routine", platform: "Instagram", date: today, time: "08:00", status: "scheduled" },
        { id: "2", content: "OOTD - Spring vibes", platform: "TikTok", date: tomorrow, time: "12:00", status: "scheduled" },
        { id: "3", content: "YouTube: Day in my life", platform: "YouTube", date: tomorrow, time: "18:00", status: "draft" },
      ];
    } else {
      return [
        { id: "1", content: "Product launch announcement", platform: "Instagram", date: today, time: "09:00", status: "scheduled" },
        { id: "2", content: "Behind the scenes video", platform: "TikTok", date: tomorrow, time: "14:00", status: "scheduled" },
        { id: "3", content: "Brand campaign video", platform: "YouTube", date: tomorrow, time: "17:00", status: "draft" },
      ];
    }
  };

  const [scheduledPosts, setScheduledPosts] = useState(getInitialPosts);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scheduledPosts', JSON.stringify(scheduledPosts));
  }, [scheduledPosts]);

  const handlePostsChange = (newPosts: any[]) => {
    setScheduledPosts(newPosts);
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => isSameDay(post.date, date));
  };

  const getTodaysPosts = () => {
    return getPostsForDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userType === 'creator' ? 'Content Planner' : 'Campaign Planner'}
            </h1>
            <p className="text-gray-600">
              {userType === 'creator' 
                ? 'Schedule and manage your content across platforms' 
                : 'Plan and schedule your brand campaigns and content'
              }
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{format(currentTime, "MMMM d, yyyy")}</span>
              <span>{format(currentTime, "h:mm a")}</span>
            </div>
          </div>
          <ScheduledPostManager posts={scheduledPosts} onPostsChange={handlePostsChange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border w-full"
                modifiers={{
                  hasPost: (date) => getPostsForDate(date).length > 0
                }}
                modifiersStyles={{
                  hasPost: { 
                    backgroundColor: 'hsl(var(--brand-blue) / 0.1)',
                    color: 'hsl(var(--brand-blue))',
                    fontWeight: 'bold'
                  }
                }}
              />
              
              {/* Posts for selected date */}
              {selectedDate && getPostsForDate(selectedDate).length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">
                    Posts for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  <div className="space-y-2">
                    {getPostsForDate(selectedDate).map((post) => (
                      <div key={post.id} className="p-3 border rounded-lg bg-gray-50">
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
                </div>
              )}
            </Card>
          </div>

          {/* Today's Schedule & Actions */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {getTodaysPosts().length > 0 ? (
                  getTodaysPosts().map((post) => (
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
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No posts scheduled for today</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram Insights
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Content
                </Button>
              </div>
            </Card>

            {/* Weekly Stats */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">This Week</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="font-semibold">{scheduledPosts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Scheduled</span>
                  <span className="font-semibold text-green-600">
                    {scheduledPosts.filter(p => p.status === 'scheduled').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Drafts</span>
                  <span className="font-semibold text-yellow-600">
                    {scheduledPosts.filter(p => p.status === 'draft').length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;