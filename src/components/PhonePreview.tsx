import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface PhonePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhonePreview = ({ isOpen, onClose }: PhonePreviewProps) => {
  if (!isOpen) return null;

  // Get user data from localStorage
  const userType = localStorage.getItem('userType') || 'creator';
  const selectedNiche = localStorage.getItem('selectedNiche') || 'Fashion';
  const selectedSocials = JSON.parse(localStorage.getItem('selectedSocials') || '{}');
  const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
  
  const name = profileData.name || 'Ava Justin';
  const bio = profileData.bio || 'Fashion & lifestyle creator passionate about sharing style tips';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-80 h-[640px] bg-black rounded-[3rem] p-2">
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Phone Screen Content */}
            <div className="h-full flex flex-col">
              {/* Status Bar */}
              <div className="h-8 bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Profile Section */}
              <div className="flex-1 p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{bio}</p>
                  <Badge className="bg-brand-blue text-white">{selectedNiche}</Badge>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  {Object.entries(selectedSocials).filter(([_, url]) => url).map(([platform, url]) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="w-full justify-between"
                      asChild
                    >
                      <a href={url as string} target="_blank" rel="noopener noreferrer">
                        <span>{platform}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  ))}
                  
                  {/* Mock creator links */}
                  <Button variant="outline" className="w-full justify-between">
                    <span>Latest Blog Post</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Shop My Favorites</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Book a Collaboration</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-500">Powered by BUZZGEN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 bg-white border shadow-md"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhonePreview;