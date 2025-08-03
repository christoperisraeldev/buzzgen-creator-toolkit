import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Instagram, Youtube, Music, Edit } from "lucide-react";
import Navbar from "@/components/Navbar";
import PhonePreview from "@/components/PhonePreview";
import ProfileEditDialog from "@/components/ProfileEditDialog";

const MediaKit = () => {
  const [showPhonePreview, setShowPhonePreview] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ava Justin',
    bio: 'Fashion enthusiast and lifestyle creator passionate about sharing affordable style tips and beauty discoveries. I love connecting with my community and helping them feel confident in their own style journey.',
    email: 'hello@avajustin.com',
    manager: 'partnerships@buzzgen.ai'
  });

  useEffect(() => {
    // Load profile data from localStorage
    const stored = localStorage.getItem('profileData');
    if (stored) {
      setProfileData(JSON.parse(stored));
    }
  }, []);

  const handleProfileSave = (newProfileData: any) => {
    setProfileData(newProfileData);
  };

  const exportToPDF = () => {
    // Simple PDF export using browser print
    const mediaKitContent = document.querySelector('.media-kit-content');
    if (mediaKitContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Media Kit - ${profileData.name}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .header { text-align: center; margin-bottom: 40px; }
                .profile { border: 1px solid #ddd; padding: 20px; margin: 20px 0; }
                .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
                .stat { text-align: center; border: 1px solid #ddd; padding: 15px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Media Kit</h1>
                <h2>${profileData.name}</h2>
              </div>
              <div class="profile">
                <h3>About</h3>
                <p>${profileData.bio}</p>
                <p><strong>Email:</strong> ${profileData.email}</p>
                <p><strong>Manager:</strong> ${profileData.manager}</p>
              </div>
              <div class="stats">
                <div class="stat">
                  <h4>Instagram</h4>
                  <p>125k followers</p>
                  <p>4.2% engagement</p>
                </div>
                <div class="stat">
                  <h4>YouTube</h4>
                  <p>45k followers</p>
                  <p>6.8% engagement</p>
                </div>
                <div class="stat">
                  <h4>TikTok</h4>
                  <p>230k followers</p>
                  <p>8.1% engagement</p>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

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
            <Button variant="outline" onClick={() => setShowPhonePreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview Live
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6 media-kit-content">
          {/* Creator Profile */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600 mb-2">{localStorage.getItem('selectedNiche') || 'Fashion'} & Lifestyle Creator</p>
                  <div className="flex space-x-2">
                    <Badge>{localStorage.getItem('selectedNiche') || 'Fashion'}</Badge>
                    <Badge>Beauty</Badge>
                    <Badge>Lifestyle</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowProfileEdit(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">About Me</h3>
              <p className="text-gray-600">
                {profileData.bio}
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
                <p className="text-gray-600">Email: {profileData.email}</p>
                <p className="text-gray-600">Manager: {profileData.manager}</p>
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

      {/* Phone Preview Modal */}
      <PhonePreview isOpen={showPhonePreview} onClose={() => setShowPhonePreview(false)} />
      
      {/* Profile Edit Dialog */}
      <ProfileEditDialog 
        isOpen={showProfileEdit} 
        onClose={() => setShowProfileEdit(false)} 
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default MediaKit;