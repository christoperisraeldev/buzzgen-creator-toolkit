import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Instagram, Youtube, Music } from "lucide-react";
import Navbar from "@/components/Navbar";

const MediaKit = () => {
  const socialStats = [
    { platform: "Instagram", followers: "125k", engagement: "4.2%", icon: Instagram, color: "text-pink-500" },
    { platform: "YouTube", followers: "45k", engagement: "6.8%", icon: Youtube, color: "text-red-500" },
    { platform: "TikTok", followers: "230k", engagement: "8.1%", icon: Music, color: "text-black" },
  ];

  const testimonials = [
    { brand: "FashionCo", text: "Ava delivered exceptional results with 15% conversion rate!", rating: 5 },
    { brand: "BeautyBrand", text: "Professional, creative, and great to work with. Highly recommended!", rating: 5 },
    { brand: "LifestyleCorp", text: "Our campaign reach exceeded expectations by 200%", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Kit</h1>
            <p className="text-gray-600">Professional media kit for brand partnerships</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Live
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Creator Profile */}
          <Card className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">AJ</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Ava Justin</h2>
                <p className="text-gray-600 mb-2">Fashion & Lifestyle Creator</p>
                <div className="flex space-x-2">
                  <Badge>Fashion</Badge>
                  <Badge>Beauty</Badge>
                  <Badge>Lifestyle</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">About Me</h3>
              <p className="text-gray-600">
                Fashion enthusiast and lifestyle creator passionate about sharing affordable style tips 
                and beauty discoveries. I love connecting with my community and helping them feel 
                confident in their own style journey.
              </p>
            </div>
          </Card>

          {/* Social Media Stats */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Social Media Reach</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socialStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.platform} className="text-center p-4 border rounded-lg">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <h4 className="font-semibold">{stat.platform}</h4>
                    <p className="text-2xl font-bold text-gray-900">{stat.followers}</p>
                    <p className="text-sm text-gray-500">Avg. Engagement: {stat.engagement}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Demographics */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Audience Demographics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-blue">75%</p>
                <p className="text-sm text-gray-600">Female</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-lime">18-34</p>
                <p className="text-sm text-gray-600">Primary Age</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-blue">89%</p>
                <p className="text-sm text-gray-600">US Based</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-lime">$50k+</p>
                <p className="text-sm text-gray-600">Income</p>
              </div>
            </div>
          </Card>

          {/* Recent Campaigns */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Campaign Results</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Summer Collection Launch</h4>
                  <p className="text-sm text-gray-600">Fashion brand partnership • June 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">850k Reach</p>
                  <p className="text-sm text-green-600">+12% engagement</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Beauty Product Review</h4>
                  <p className="text-sm text-gray-600">Skincare brand • May 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">420k Reach</p>
                  <p className="text-sm text-green-600">+18% sales conversion</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonials */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Brand Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{testimonial.brand}</span>
                    <div className="flex">
                      {Array.from({length: testimonial.rating}).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Let's Collaborate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-gray-600">Email: hello@avajustin.com</p>
                <p className="text-gray-600">Manager: partnerships@buzzgen.ai</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Partnership Types</h4>
                <div className="space-y-1">
                  <Badge variant="outline">Sponsored Posts</Badge>
                  <Badge variant="outline">Product Reviews</Badge>
                  <Badge variant="outline">Brand Ambassadorships</Badge>
                  <Badge variant="outline">Event Coverage</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MediaKit;