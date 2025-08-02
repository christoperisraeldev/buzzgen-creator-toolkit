import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, Gift, Share2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "buzzgen.ai/ref/avajustin";
  
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewardTiers = [
    { referrals: 5, reward: "Premium Templates Pack", unlocked: true },
    { referrals: 10, reward: "AI Caption Credits (100)", unlocked: true },
    { referrals: 25, reward: "Custom Domain", unlocked: false },
    { referrals: 50, reward: "Advanced Analytics", unlocked: false },
    { referrals: 100, reward: "1 Year Pro Free", unlocked: false },
  ];

  const recentReferrals = [
    { name: "Sarah M.", joined: "2 days ago", status: "Active" },
    { name: "Mike K.", joined: "1 week ago", status: "Active" },
    { name: "Emma L.", joined: "2 weeks ago", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Program</h1>
          <p className="text-gray-600">Invite friends and unlock exclusive rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Referral Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
              <div className="flex space-x-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="flex-1"
                />
                <Button 
                  onClick={copyLink}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Share this link with friends to start earning rewards
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reward Tiers</h2>
              <div className="space-y-4">
                {rewardTiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      tier.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tier.unlocked ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {tier.unlocked ? <Check className="w-4 h-4" /> : tier.referrals}
                      </div>
                      <div>
                        <p className="font-medium">{tier.reward}</p>
                        <p className="text-sm text-gray-600">{tier.referrals} referrals needed</p>
                      </div>
                    </div>
                    <Badge variant={tier.unlocked ? "default" : "secondary"}>
                      {tier.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Referrals</h2>
              <div className="space-y-3">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-sm text-gray-600">Joined {referral.joined}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{referral.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Stats & Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Total Referrals</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progress to next reward</span>
                  <span className="text-sm font-medium">12/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-blue h-2 rounded-full" style={{width: '48%'}}></div>
                </div>
                <p className="text-xs text-gray-500">13 more referrals to unlock Custom Domain</p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Share & Earn</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Instagram
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Gift className="w-4 h-4 mr-2" />
                  Email Friends
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Program Benefits</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Earn rewards for each signup</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>No limit on referrals</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Instant reward activation</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Track progress in real-time</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;