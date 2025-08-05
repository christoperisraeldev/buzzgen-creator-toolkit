import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ExternalLink, 
  Star, 
  Clock, 
  Download, 
  Calendar,
  Users,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
  featured?: boolean;
}

interface BioProfile {
  name: string;
  bio: string;
  avatar: string;
  verified: boolean;
  followerCount: string;
  engagement: string;
}

const BioLink = () => {
  const [searchParams] = useSearchParams();
  const [profile] = useState<BioProfile>({
    name: "Ava Justin",
    bio: "Fashion & lifestyle creator passionate about sharing style tips ✨",
    avatar: "/placeholder.svg",
    verified: true,
    followerCount: "125K",
    engagement: "4.8%"
  });

  const [links] = useState<Link[]>([
    {
      id: "1",
      title: "🎯 BUZZGEN AI Toolkit - Transform Your Content",
      url: "/toolkit",
      clicks: 1247,
      featured: true
    },
    {
      id: "2", 
      title: "📅 Free Content Calendar Template",
      url: "/toolkit?download=calendar",
      clicks: 892,
      featured: true
    },
    {
      id: "3",
      title: "💼 Book a Strategy Call",
      url: "/toolkit?action=demo",
      clicks: 234
    },
    {
      id: "4",
      title: "Latest YouTube Video",
      url: "https://youtube.com",
      clicks: 567
    }
  ]);

  const [testimonials] = useState([
    {
      name: "Sarah M.",
      result: "Increased engagement by 40%",
      avatar: "/placeholder.svg"
    },
    {
      name: "Mike R.", 
      result: "Gained 10K followers in 2 months",
      avatar: "/placeholder.svg"
    }
  ]);

  // Track analytics
  useEffect(() => {
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');
    const campaign = searchParams.get('utm_campaign');
    
    // Track page view
    console.log('Bio Link View:', { source, medium, campaign, timestamp: new Date().toISOString() });
    
    // Send to analytics service (implement with your preferred analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bio_link_view', {
        source,
        medium,
        campaign
      });
    }
  }, [searchParams]);

  const handleLinkClick = (link: Link) => {
    // Track click analytics
    console.log('Link Click:', { 
      linkId: link.id, 
      title: link.title,
      url: link.url,
      timestamp: new Date().toISOString(),
      source: searchParams.get('utm_source')
    });

    // Update click count (implement with backend)
    link.clicks += 1;

    // Open link
    if (link.url.startsWith('/')) {
      window.location.href = link.url + `?utm_source=bio_link&utm_medium=click&utm_campaign=${link.id}`;
    } else {
      window.open(link.url + `?utm_source=bio_link&utm_medium=click&utm_campaign=${link.id}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Header with urgency banner */}
      <div className="bg-gradient-to-r from-primary to-primary-variant text-white text-center py-2 px-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Limited Beta Access • Join 100+ Creators</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {profile.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 bg-white rounded-full" />
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h1>
          <p className="text-gray-600 mb-4">{profile.bio}</p>
          
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="font-bold text-lg">{profile.followerCount}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{profile.engagement}</div>
              <div className="text-sm text-gray-500">Engagement</div>
            </div>
          </div>
        </div>

        {/* Quick Access Highlights */}
        <Card className="p-4 mb-6 bg-gradient-subtle border-primary/20">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 What You'll Find Here</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Growth Tools</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>Free Templates</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Content Calendar</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Community</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Proof */}
        <div className="mb-6">
          <h3 className="text-center font-semibold text-gray-900 mb-3">
            ⭐ Success Stories
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-3 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="text-xs bg-primary/10">
                      {testimonial.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-green-600">{testimonial.result}</div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Links */}
        <div className="space-y-4">
          {links.map((link) => (
            <Card 
              key={link.id} 
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                link.featured ? 'bg-gradient-primary text-white border-primary' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleLinkClick(link)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${link.featured ? 'text-white' : 'text-gray-900'}`}>
                    {link.title}
                  </h3>
                  <div className={`text-sm flex items-center gap-2 ${
                    link.featured ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    <span>{link.clicks} clicks</span>
                    {link.featured && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <ExternalLink className={`w-5 h-5 ${link.featured ? 'text-white' : 'text-gray-400'}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-8 space-y-3">
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90 text-white"
            onClick={() => handleLinkClick({
              id: 'cta-main',
              title: 'Access Toolkit Now',
              url: '/toolkit?utm_source=bio_cta&utm_medium=primary_button',
              clicks: 0
            })}
          >
            🚀 Access AI Toolkit Now
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              onClick={() => handleLinkClick({
                id: 'cta-download',
                title: 'Download Calendar',
                url: '/toolkit?download=calendar&utm_source=bio_cta&utm_medium=download_button',
                clicks: 0
              })}
            >
              <Download className="w-4 h-4 mr-2" />
              Free Calendar
            </Button>
            
            <Button 
              variant="outline"
              className="border-accent text-accent hover:bg-accent/5"
              onClick={() => handleLinkClick({
                id: 'cta-demo',
                title: 'Book Demo',
                url: '/toolkit?action=demo&utm_source=bio_cta&utm_medium=demo_button',
                clicks: 0
              })}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Demo
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Powered by <span className="font-semibold text-primary">BUZZGEN</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioLink;