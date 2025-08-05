import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Smartphone, BarChart3, Zap, Play } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
import phoneMockup from "@/assets/phone-mockup.png";

const images = [
  "/images/WhatsApp Image 2025-07-29 at 3.35.34 AM (1).jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.34 AM (2).jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.34 AM.jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.35 AM (1).jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.35 AM (2).jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.35 AM (3).jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.35 AM.jpeg",
  "/images/WhatsApp Image 2025-07-29 at 3.35.36 AM.jpeg",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-white/20 text-gray-800 border-white/30">
                ✨ AI-Powered Creator Tools
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
                Your All-in-One
                <span className="bg-gradient-accent bg-clip-text text-transparent"> Creator Toolkit</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Build stunning link-in-bio pages, grow your audience with AI tools, 
                and monetize your content — all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-lg px-8">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <img 
                src={phoneMockup} 
                alt="BUZZGEN Creator Profile on Phone" 
                className="w-40 h-auto drop-shadow-2xl"
              />
              
              {/* Floating Chat Bubbles */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <div className="text-xs text-gray-600">💬 "Where's your outfit from?"</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                <div className="text-xs text-gray-600">🔥 "Love your content!"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From link-in-bio pages to AI-powered content creation, 
              BUZZGEN has all the tools to grow your creator business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Link-in-Bio Pages</h3>
              <p className="text-gray-600">
                Create stunning, mobile-optimized pages that showcase all your content in one place.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-lime/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Tools</h3>
              <p className="text-gray-600">
                Generate captions, hashtags, and content ideas with our advanced AI toolkit.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
              <p className="text-gray-600">
                Track your performance and understand your audience with detailed analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Showcase */}
      <section className="bg-gradient-subtle py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Trusted by 50,000+ Creators
            </h2>
            <p className="text-xl text-gray-600">Join the community of creators growing their brands with BUZZGEN</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"
              >
                <img
                  src={src}
                  alt={`Creator ${index + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Creators Are Saying</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Fashion Influencer", text: "BUZZGEN helped me organize all my links and doubled my conversion rate!" },
              { name: "Mike K.", role: "Fitness Creator", text: "The AI tools save me hours of content planning every week. Game changer!" },
              { name: "Emma L.", role: "Lifestyle Blogger", text: "Best investment I've made for my creator business. Everything I need in one place." }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-accent py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-poppins">
            Ready to Level Up Your Creator Game?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of creators who are already growing their brands with BUZZGEN.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8">
              View Pricing
            </Button>
          </div>
          
          {/* App Store Badges */}
          <div className="flex justify-center space-x-4 mt-12">
            <div className="bg-black rounded-lg px-6 py-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="text-white">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </div>
            <div className="bg-black rounded-lg px-6 py-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="text-white">
                <div className="text-xs">Get it on</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="font-bold text-xl">BUZZGEN</span>
              </div>
              <p className="text-gray-400">
                The ultimate toolkit for content creators and influencers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/toolkit" className="block text-gray-400 hover:text-white transition-colors">AI Toolkit</Link>
                <Link to="/planner" className="block text-gray-400 hover:text-white transition-colors">Content Planner</Link>
                <Link to="/media-kit" className="block text-gray-400 hover:text-white transition-colors">Media Kit</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BUZZGEN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
