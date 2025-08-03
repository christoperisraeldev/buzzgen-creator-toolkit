import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Calendar as CalendarIcon, Clock, Instagram, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  date: Date;
  time: string;
  status: "scheduled" | "draft" | "published";
}

interface ScheduledPostManagerProps {
  posts: ScheduledPost[];
  onPostsChange: (posts: ScheduledPost[]) => void;
}

const ScheduledPostManager = ({ posts, onPostsChange }: ScheduledPostManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [time, setTime] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !platform || !selectedDate || !time) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content: content.trim(),
      platform,
      date: selectedDate,
      time,
      status: "scheduled",
    };

    onPostsChange([...posts, newPost]);
    
    toast({
      title: "Post Scheduled",
      description: `Your ${platform} post has been scheduled for ${format(selectedDate, "MMM d, yyyy")} at ${time}`,
    });

    // Reset form
    setContent("");
    setPlatform("");
    setSelectedDate(undefined);
    setTime("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Scheduled Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's your post about?"
              className="min-h-20"
            />
          </div>
          
          <div>
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instagram">
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                    Instagram
                  </div>
                </SelectItem>
                <SelectItem value="YouTube">
                  <div className="flex items-center">
                    <Youtube className="w-4 h-4 mr-2 text-red-500" />
                    YouTube
                  </div>
                </SelectItem>
                <SelectItem value="TikTok">
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 bg-black rounded-sm"></div>
                    TikTok
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Schedule Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduledPostManager;