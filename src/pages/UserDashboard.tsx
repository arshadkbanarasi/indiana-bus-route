import { useState } from "react";
import { Hero } from "@/components/Hero";
import { RouteSearch } from "@/components/RouteSearch";
import { BusResults } from "@/components/BusResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, History, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function UserDashboard() {
  const [searchResults, setSearchResults] = useState<{
    from: string;
    to: string;
    date: Date;
    buses: any[];
  } | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (from: string, to: string, date: Date) => {
    toast({
      title: "Searching...",
      description: "Finding available buses for your route",
    });

    setTimeout(() => {
      const routeExists = Math.random() > 0.3;
      
      if (!routeExists) {
        toast({
          variant: "destructive",
          title: "Route Not Available",
          description: `No buses found for ${from} to ${to} on ${date.toLocaleDateString('en-IN')}. Please try a different date or route.`,
        });
        setSearchResults({ from, to, date, buses: [] });
      } else {
        toast({
          title: "Buses Found!",
          description: `Found available buses for your journey`,
        });
        setSearchResults({ from, to, date, buses: [] });
      }
    }, 1500);
  };

  const handleBookBus = (busId: string) => {
    toast({
      title: "Booking Initiated",
      description: "Redirecting to payment page...",
    });
    console.log("Booking bus:", busId);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate("/auth");
  };

  // Mock booking history
  const bookingHistory = [
    {
      id: "1",
      route: "Indore to Bhopal",
      date: "2024-01-15",
      busOperator: "Shree Travels",
      status: "Completed",
      amount: 450
    },
    {
      id: "2", 
      route: "Teen Imli to Collectorate",
      date: "2024-01-10",
      busOperator: "Local Transport",
      status: "Completed", 
      amount: 25
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-white/80">Find and book your next journey</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate("/admin")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-primary">{bookingHistory.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">This Month</h3>
              <p className="text-3xl font-bold text-primary">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Total Spent</h3>
              <p className="text-3xl font-bold text-primary">₹475</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Find Your Bus</h2>
              <p className="text-muted-foreground">
                Search for intercity routes or local transportation within cities
              </p>
            </div>
            
            <RouteSearch onSearch={handleSearch} />

            {/* Results Section */}
            {searchResults && (
              <div className="mt-8">
                <BusResults 
                  from={searchResults.from}
                  to={searchResults.to}
                  date={searchResults.date}
                  buses={searchResults.buses}
                  onBookBus={handleBookBus}
                />
              </div>
            )}
          </div>

          {/* Booking History Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{booking.route}</h4>
                        <p className="text-sm text-muted-foreground">{booking.busOperator}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {booking.date}
                      </span>
                      <span className="font-medium">₹{booking.amount}</span>
                    </div>
                  </div>
                ))}
                
                {bookingHistory.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No bookings yet</p>
                    <p className="text-sm">Start by searching for a route above</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Popular Routes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}