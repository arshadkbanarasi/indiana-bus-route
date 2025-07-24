import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Shield, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuth = (action: "login" | "signup", type: "user" | "admin") => {
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    if (action === "signup" && (!formData.name || !formData.phone)) {
      toast({
        variant: "destructive", 
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    // Mock authentication - in real app this would call an API
    const actionText = action === "login" ? "Logged in" : "Signed up";
    toast({
      title: `${actionText} Successfully!`,
      description: `Welcome ${type === "admin" ? "Admin" : "User"}!`
    });

    // Navigate based on user type
    if (type === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 text-white">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Bus className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bus Booking System</h1>
          <p className="text-white/80">Choose your account type to continue</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
                <CardDescription>
                  Choose your account type and enter your credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button
                    variant={userType === "user" ? "default" : "outline"}
                    onClick={() => setUserType("user")}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    User
                  </Button>
                  <Button
                    variant={userType === "admin" ? "default" : "outline"}
                    onClick={() => setUserType("admin")}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => handleAuth("login", userType)}
                >
                  Login as {userType === "admin" ? "Admin" : "User"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Create New Account</CardTitle>
                <CardDescription>
                  Choose your account type and fill in your details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button
                    variant={userType === "user" ? "default" : "outline"}
                    onClick={() => setUserType("user")}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    User
                  </Button>
                  <Button
                    variant={userType === "admin" ? "default" : "outline"}
                    onClick={() => setUserType("admin")}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => handleAuth("signup", userType)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign up as {userType === "admin" ? "Admin" : "User"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Access Demo Buttons */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-white/80 text-sm text-center mb-3">Quick Demo Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate("/dashboard")}
            >
              Demo User
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate("/admin")}
            >
              Demo Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}