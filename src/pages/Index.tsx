import { useState } from "react";
import { Hero } from "@/components/Hero";
import { RouteSearch } from "@/components/RouteSearch";
import { BusResults } from "@/components/BusResults";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<{
    from: string;
    to: string;
    date: Date;
    buses: any[];
  } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (from: string, to: string, date: Date) => {
    // Simulate API call with timeout
    toast({
      title: "Searching...",
      description: "Finding available buses for your route",
    });

    setTimeout(() => {
      // Mock logic to determine if route exists
      const routeExists = Math.random() > 0.3; // 70% chance route exists
      
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
        // BusResults component will show mock data
        setSearchResults({ from, to, date, buses: [] }); // Empty array will trigger mock data in BusResults
      }
    }, 1500);
  };

  const handleBookBus = (busId: string) => {
    toast({
      title: "Booking Initiated",
      description: "Redirecting to payment page...",
    });
    // Here you would redirect to booking/payment page
    console.log("Booking bus:", busId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Bus Booking System</div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            onClick={() => navigate("/auth")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login / Sign Up
          </Button>
        </div>
      </div>
      
      <Hero />
      
      {/* Search Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Your Bus</h2>
            <p className="text-muted-foreground">
              Search for intercity routes or local transportation within cities
            </p>
          </div>
          
          <RouteSearch onSearch={handleSearch} />
        </div>
      </div>

      {/* Results Section */}
      {searchResults && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <BusResults 
              from={searchResults.from}
              to={searchResults.to}
              date={searchResults.date}
              buses={searchResults.buses}
              onBookBus={handleBookBus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
