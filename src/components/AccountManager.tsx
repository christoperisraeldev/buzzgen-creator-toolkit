import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut, UserX, Pause, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AccountManager = () => {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear all localStorage data
    localStorage.clear();
    
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out",
    });
    
    // Redirect to landing page
    navigate('/');
    setShowSignOutDialog(false);
  };

  const handleDeleteAccount = () => {
    // Clear all localStorage data
    localStorage.clear();
    
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted",
      variant: "destructive",
    });
    
    // Redirect to landing page
    navigate('/');
    setShowDeleteDialog(false);
  };

  const handleSuspendAccount = () => {
    // Set account as suspended
    localStorage.setItem('accountSuspended', 'true');
    
    toast({
      title: "Account Suspended",
      description: "Your account has been suspended. Contact support to reactivate.",
    });
    
    // Redirect to landing page
    navigate('/');
    setShowSuspendDialog(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Account Management</h3>
      <div className="space-y-4">
        {/* Sign Out */}
        <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Out</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to sign out? You'll need to log in again to access your account.</p>
              <div className="flex space-x-2">
                <Button onClick={handleSignOut} className="flex-1">
                  Sign Out
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSignOutDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Suspend Account */}
        <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
              <Pause className="w-4 h-4 mr-2" />
              Suspend Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suspend Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Suspending your account will temporarily disable access. You can contact support to reactivate it later.
                </AlertDescription>
              </Alert>
              <p>Are you sure you want to suspend your account?</p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSuspendAccount} 
                  variant="destructive"
                  className="flex-1"
                >
                  Suspend Account
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSuspendDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Account */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
              <UserX className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This action cannot be undone. This will permanently delete your account and all associated data.
                </AlertDescription>
              </Alert>
              <p>Are you absolutely sure you want to delete your account?</p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleDeleteAccount} 
                  variant="destructive"
                  className="flex-1"
                >
                  Delete Forever
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default AccountManager;