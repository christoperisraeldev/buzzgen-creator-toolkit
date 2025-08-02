import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, CreditCard, ExternalLink, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const Shop = () => {
  const mockProducts = [
    { 
      id: 1, 
      name: "Creator Starter Pack", 
      price: "$29", 
      description: "Essential templates and tools for new creators",
      status: "available",
      image: "placeholder"
    },
    { 
      id: 2, 
      name: "Premium Link Templates", 
      price: "$19", 
      description: "Beautiful, customizable link-in-bio templates",
      status: "available",
      image: "placeholder"
    },
    { 
      id: 3, 
      name: "AI Caption Pack", 
      price: "$15", 
      description: "1000 AI-generated captions for all occasions",
      status: "coming-soon",
      image: "placeholder"
    },
    { 
      id: 4, 
      name: "Brand Kit Bundle", 
      price: "$49", 
      description: "Complete branding package with logos & assets",
      status: "coming-soon",
      image: "placeholder"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Creator Shop</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium templates, tools, and resources to elevate your creator brand. 
            More products launching soon!
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-accent rounded-lg p-6 mb-8 text-center">
          <Clock className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Shop Launch Coming Soon!</h2>
          <p className="text-white/90 mb-4">
            We're putting the finishing touches on our creator marketplace. 
            Get early access and special launch pricing.
          </p>
          <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
            Join Waitlist
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="h-48 bg-gradient-subtle flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <Badge variant={product.status === "available" ? "default" : "secondary"}>
                    {product.status === "available" ? "Available" : "Coming Soon"}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <Button 
                    disabled={product.status !== "available"}
                    className="bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50"
                  >
                    {product.status === "available" ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Integration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Integration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Stripe</h3>
                    <p className="text-sm text-gray-600">Accept credit cards globally</p>
                  </div>
                </div>
                <Button variant="outline" disabled>
                  <Clock className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-sm text-gray-600">Secure PayPal payments</p>
                  </div>
                </div>
                <Button variant="outline" disabled>
                  <Clock className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shop Features</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-lime rounded-full mr-3"></div>
                <span className="text-sm">Digital product delivery</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-lime rounded-full mr-3"></div>
                <span className="text-sm">Instant download links</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-lime rounded-full mr-3"></div>
                <span className="text-sm">Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-lime rounded-full mr-3"></div>
                <span className="text-sm">Mobile-optimized checkout</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-lime rounded-full mr-3"></div>
                <span className="text-sm">Customer support integration</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Early Access CTA */}
        <Card className="p-8 text-center bg-gradient-hero">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Early Access</h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Be the first to know when our shop launches and get exclusive early bird pricing on all products.
          </p>
          <div className="flex max-w-md mx-auto space-x-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              Join Waitlist
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Shop;