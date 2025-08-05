import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="font-poppins font-bold text-2xl text-gray-900">BUZZGEN</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started!</h1>
          <p className="text-gray-600">Get started in 30 seconds. No passwords, no stress. Just instant tools to grow your creator brand.</p>
        </div>

        <Card className="p-6 space-y-4">
          <Button variant="outline" className="w-full flex items-center justify-center space-x-2" asChild>
            <Link to="/onboarding">
              <FaGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </Link>
          </Button>

          <Button variant="outline" className="w-full flex items-center justify-center space-x-2" asChild>
            <Link to="/onboarding">
              <FaApple className="w-5 h-5" />
              <span>Continue with Apple</span>
            </Link>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button className="bg-brand-blue hover:bg-brand-blue/90" asChild>
                <Link to="/onboarding">
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="flex space-x-2">
              <Input placeholder="Phone number" type="tel" className="flex-1" />
              <Button className="bg-brand-lime hover:bg-brand-lime/90 text-black" asChild>
                <Link to="/onboarding">
                  <Phone className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth" className="text-brand-blue hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;