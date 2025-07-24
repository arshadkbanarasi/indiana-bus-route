import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ArrowLeftRight, Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Indian cities and routes data
const CITIES = {
  "Indore": ["Teen Imli", "Collectorate", "Rajwada", "Sarafa Bazaar", "Palasia", "Vijay Nagar"],
  "Bhopal": ["New Market", "MP Nagar", "Arera Colony", "Habibganj", "Berasia Road"],
  "Jabalpur": ["Russell Chowk", "Napier Town", "Civil Lines", "Cantt Area"],
  "Dewas": ["City Center", "Railway Station", "Collector Office", "Bus Stand"],
  "Ujjain": ["Mahakal Temple", "Railway Station", "Freeganj", "Agar Road"]
};

const INTERCITY_ROUTES = [
  "Indore to Bhopal", "Bhopal to Indore",
  "Indore to Jabalpur", "Jabalpur to Indore", 
  "Indore to Dewas", "Dewas to Indore",
  "Indore to Ujjain", "Ujjain to Indore",
  "Bhopal to Jabalpur", "Jabalpur to Bhopal"
];

interface RouteSearchProps {
  onSearch: (from: string, to: string, date: Date) => void;
}

export function RouteSearch({ onSearch }: RouteSearchProps) {
  const [fromCity, setFromCity] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [routeType, setRouteType] = useState<"intercity" | "local">("intercity");
  const { toast } = useToast();

  const handleSearch = () => {
    // Validation
    if (!date) {
      toast({
        variant: "destructive",
        title: "Date Required",
        description: "Please select a travel date",
      });
      return;
    }

    let fromValue = "";
    let toValue = "";

    if (routeType === "intercity") {
      if (!fromCity || !toCity) {
        toast({
          variant: "destructive",
          title: "Cities Required",
          description: "Please select both departure and destination cities",
        });
        return;
      }
      
      if (fromCity === toCity) {
        toast({
          variant: "destructive",
          title: "Invalid Route",
          description: "Departure and destination cities cannot be the same",
        });
        return;
      }

      fromValue = fromCity;
      toValue = toCity;
    } else {
      if (!fromLocation || !toLocation || !fromCity) {
        toast({
          variant: "destructive", 
          title: "Locations Required",
          description: "Please select both departure and destination locations",
        });
        return;
      }

      if (fromLocation === toLocation) {
        toast({
          variant: "destructive",
          title: "Invalid Route", 
          description: "Departure and destination locations cannot be the same",
        });
        return;
      }

      fromValue = `${fromLocation}, ${fromCity}`;
      toValue = `${toLocation}, ${fromCity}`;
    }

    onSearch(fromValue, toValue, date);
  };

  const swapLocations = () => {
    if (routeType === "intercity") {
      const tempCity = fromCity;
      setFromCity(toCity);
      setToCity(tempCity);
    } else {
      const tempLocation = fromLocation;
      setFromLocation(toLocation);
      setToLocation(tempLocation);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-lg">
      <div className="space-y-4">
        {/* Route Type Selection */}
        <div className="flex gap-2">
          <Button
            variant={routeType === "intercity" ? "default" : "outline"}
            onClick={() => setRouteType("intercity")}
            size="sm"
          >
            Intercity
          </Button>
          <Button
            variant={routeType === "local" ? "default" : "outline"}
            onClick={() => setRouteType("local")}
            size="sm"
          >
            Local Routes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* From Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            {routeType === "intercity" ? (
              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CITIES).map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <>
                <Select value={fromCity} onValueChange={(value) => {
                  setFromCity(value);
                  setFromLocation("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(CITIES).map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fromCity && (
                  <Select value={fromLocation} onValueChange={setFromLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES[fromCity as keyof typeof CITIES]?.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapLocations}
              className="rounded-full"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            {routeType === "intercity" ? (
              <Select value={toCity} onValueChange={setToCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CITIES).map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <>
                <Select value={toCity} onValueChange={(value) => {
                  setToCity(value);
                  setToLocation("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(CITIES).map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {toCity && (
                  <Select value={toLocation} onValueChange={setToLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES[toCity as keyof typeof CITIES]?.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleSearch}
            size="lg"
            className="bg-gradient-primary hover:opacity-90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Buses
          </Button>
        </div>
      </div>
    </Card>
  );
}