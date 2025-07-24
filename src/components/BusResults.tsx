import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, IndianRupee, Star, Users } from "lucide-react";

interface Bus {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  busType: string;
  rating: number;
  driver: {
    name: string;
    phone: string;
  };
}

interface BusResultsProps {
  from: string;
  to: string;
  date: Date;
  buses: Bus[];
  onBookBus: (busId: string) => void;
}

// Mock bus data - in real app this would come from API
const MOCK_BUSES: Bus[] = [
  {
    id: "1",
    operator: "Shree Travels",
    departureTime: "06:00",
    arrivalTime: "10:30",
    duration: "4h 30m",
    price: 450,
    seatsAvailable: 12,
    busType: "AC Sleeper",
    rating: 4.2,
    driver: { name: "राम कुमार", phone: "+91 98765 43210" }
  },
  {
    id: "2", 
    operator: "Rajasthan Roadways",
    departureTime: "08:15",
    arrivalTime: "12:45",
    duration: "4h 30m",
    price: 320,
    seatsAvailable: 8,
    busType: "Non-AC Seater",
    rating: 3.8,
    driver: { name: "सुरेश पटेल", phone: "+91 87654 32109" }
  },
  {
    id: "3",
    operator: "MP Transport",
    departureTime: "14:30",
    arrivalTime: "19:00",
    duration: "4h 30m", 
    price: 380,
    seatsAvailable: 15,
    busType: "AC Seater",
    rating: 4.0,
    driver: { name: "अजय शर्मा", phone: "+91 76543 21098" }
  }
];

export function BusResults({ from, to, date, buses = MOCK_BUSES, onBookBus }: BusResultsProps) {
  if (buses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-destructive mb-4">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Buses Available</h3>
        <p className="text-muted-foreground mb-4">
          Sorry, no buses are available for the route <strong>{from}</strong> to <strong>{to}</strong> on{" "}
          {date.toLocaleDateString('en-IN')}
        </p>
        <p className="text-sm text-muted-foreground">
          Please try a different date or check nearby cities.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {from} → {to}
        </h2>
        <p className="text-muted-foreground">
          {date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Bus Operator */}
              <div className="lg:col-span-3">
                <h3 className="font-semibold text-lg">{bus.operator}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{bus.busType}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{bus.rating}</span>
                  </div>
                </div>
              </div>

              {/* Timing */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{bus.departureTime}</div>
                    <div className="text-sm text-muted-foreground">Departure</div>
                  </div>
                  <div className="flex-1">
                    <div className="border-t border-dashed border-muted-foreground"></div>
                    <div className="text-center text-sm text-muted-foreground mt-1">
                      {bus.duration}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{bus.arrivalTime}</div>
                    <div className="text-sm text-muted-foreground">Arrival</div>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="lg:col-span-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Driver: {bus.driver.name}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {bus.driver.phone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {bus.seatsAvailable} seats available
                  </div>
                </div>
              </div>

              {/* Price & Book */}
              <div className="lg:col-span-3 text-right">
                <div className="flex items-center justify-end gap-1 mb-3">
                  <IndianRupee className="h-5 w-5" />
                  <span className="text-2xl font-bold">{bus.price}</span>
                </div>
                <Button 
                  onClick={() => onBookBus(bus.id)}
                  className="w-full lg:w-auto bg-gradient-primary hover:opacity-90"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}