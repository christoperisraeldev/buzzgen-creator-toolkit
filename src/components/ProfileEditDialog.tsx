import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Save } from "lucide-react";

interface ProfileEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: any) => void;
}

const ProfileEditDialog = ({ isOpen, onClose, onSave }: ProfileEditDialogProps) => {
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    email: '',
    manager: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Load existing profile data
      const existing = JSON.parse(localStorage.getItem('profileData') || '{}');
      setProfileData({
        name: existing.name || 'Ava Justin',
        bio: existing.bio || 'Fashion enthusiast and lifestyle creator passionate about sharing affordable style tips and beauty discoveries. I love connecting with my community and helping them feel confident in their own style journey.',
        email: existing.email || 'hello@avajustin.com',
        manager: existing.manager || 'partnerships@buzzgen.ai'
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-3 border rounded-md"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full p-3 border rounded-md h-24"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-3 border rounded-md"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Manager Email</label>
              <input
                type="email"
                value={profileData.manager}
                onChange={(e) => setProfileData({ ...profileData, manager: e.target.value })}
                className="w-full p-3 border rounded-md"
                placeholder="manager@example.com"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileEditDialog;