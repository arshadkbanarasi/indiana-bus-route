import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Bus, 
  Plus, 
  Settings, 
  Users, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Phone,
  LogOut,
  Edit,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Bus {
  id: string;
  operator: string;
  busNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  busType: string;
  driver: {
    name: string;
    phone: string;
  };
}

interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  isActive: boolean;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: "1",
      operator: "Shree Travels",
      busNumber: "MP-09-1234",
      route: "Indore to Bhopal",
      departureTime: "06:00",
      arrivalTime: "10:30",
      price: 450,
      totalSeats: 40,
      busType: "AC Sleeper",
      driver: { name: "राम कुमार", phone: "+91 98765 43210" }
    }
  ]);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "1",
      from: "Indore",
      to: "Bhopal",
      distance: "190 km",
      estimatedTime: "4h 30m",
      isActive: true
    }
  ]);

  const [busForm, setBusForm] = useState({
    operator: "",
    busNumber: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
    busType: "",
    driverName: "",
    driverPhone: ""
  });

  const [routeForm, setRouteForm] = useState({
    from: "",
    to: "",
    distance: "",
    estimatedTime: ""
  });

  const handleAddBus = () => {
    if (!busForm.operator || !busForm.busNumber || !busForm.route) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    const newBus: Bus = {
      id: Date.now().toString(),
      operator: busForm.operator,
      busNumber: busForm.busNumber,
      route: busForm.route,
      departureTime: busForm.departureTime,
      arrivalTime: busForm.arrivalTime,
      price: parseInt(busForm.price),
      totalSeats: parseInt(busForm.totalSeats),
      busType: busForm.busType,
      driver: {
        name: busForm.driverName,
        phone: busForm.driverPhone
      }
    };

    setBuses([...buses, newBus]);
    setBusForm({
      operator: "",
      busNumber: "",
      route: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      totalSeats: "",
      busType: "",
      driverName: "",
      driverPhone: ""
    });

    toast({
      title: "Bus Added Successfully!",
      description: `${newBus.operator} bus has been added to the system`
    });
  };

  const handleAddRoute = () => {
    if (!routeForm.from || !routeForm.to) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in from and to locations"
      });
      return;
    }

    const newRoute: Route = {
      id: Date.now().toString(),
      from: routeForm.from,
      to: routeForm.to,
      distance: routeForm.distance,
      estimatedTime: routeForm.estimatedTime,
      isActive: true
    };

    setRoutes([...routes, newRoute]);
    setRouteForm({
      from: "",
      to: "",
      distance: "",
      estimatedTime: ""
    });

    toast({
      title: "Route Added Successfully!",
      description: `Route from ${newRoute.from} to ${newRoute.to} has been created`
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate("/auth");
  };

  const deleteBus = (busId: string) => {
    setBuses(buses.filter(bus => bus.id !== busId));
    toast({
      title: "Bus Deleted",
      description: "Bus has been removed from the system"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-white/80">Manage buses, routes, and bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate("/dashboard")}
            >
              <Users className="mr-2 h-4 w-4" />
              View as User
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

      <div className="container mx-auto p-6">
        <Tabs defaultValue="buses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buses">Manage Buses</TabsTrigger>
            <TabsTrigger value="routes">Manage Routes</TabsTrigger>
            <TabsTrigger value="bookings">View Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Manage Buses Tab */}
          <TabsContent value="buses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Manage Buses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Bus
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Bus</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="operator">Bus Operator *</Label>
                      <Input
                        id="operator"
                        placeholder="e.g., Shree Travels"
                        value={busForm.operator}
                        onChange={(e) => setBusForm({...busForm, operator: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="busNumber">Bus Number *</Label>
                      <Input
                        id="busNumber"
                        placeholder="e.g., MP-09-1234"
                        value={busForm.busNumber}
                        onChange={(e) => setBusForm({...busForm, busNumber: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="route">Route *</Label>
                      <Select value={busForm.route} onValueChange={(value) => setBusForm({...busForm, route: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          {routes.map(route => (
                            <SelectItem key={route.id} value={`${route.from} to ${route.to}`}>
                              {route.from} to {route.to}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="busType">Bus Type</Label>
                      <Select value={busForm.busType} onValueChange={(value) => setBusForm({...busForm, busType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bus type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC Sleeper">AC Sleeper</SelectItem>
                          <SelectItem value="AC Seater">AC Seater</SelectItem>
                          <SelectItem value="Non-AC Sleeper">Non-AC Sleeper</SelectItem>
                          <SelectItem value="Non-AC Seater">Non-AC Seater</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departureTime">Departure Time</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        value={busForm.departureTime}
                        onChange={(e) => setBusForm({...busForm, departureTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrivalTime">Arrival Time</Label>
                      <Input
                        id="arrivalTime"
                        type="time"
                        value={busForm.arrivalTime}
                        onChange={(e) => setBusForm({...busForm, arrivalTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="450"
                        value={busForm.price}
                        onChange={(e) => setBusForm({...busForm, price: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalSeats">Total Seats</Label>
                      <Input
                        id="totalSeats"
                        type="number"
                        placeholder="40"
                        value={busForm.totalSeats}
                        onChange={(e) => setBusForm({...busForm, totalSeats: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverName">Driver Name</Label>
                      <Input
                        id="driverName"
                        placeholder="राम कुमार"
                        value={busForm.driverName}
                        onChange={(e) => setBusForm({...busForm, driverName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverPhone">Driver Phone</Label>
                      <Input
                        id="driverPhone"
                        placeholder="+91 98765 43210"
                        value={busForm.driverPhone}
                        onChange={(e) => setBusForm({...busForm, driverPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddBus} className="bg-gradient-primary hover:opacity-90">
                    Add Bus
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            {/* Buses List */}
            <div className="space-y-4">
              {buses.map((bus) => (
                <Card key={bus.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-semibold">{bus.operator}</h3>
                          <Badge variant="secondary">{bus.busNumber}</Badge>
                          <Badge>{bus.busType}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{bus.route}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{bus.departureTime} - {bus.arrivalTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>₹{bus.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{bus.totalSeats} seats</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>Driver: {bus.driver.name} - {bus.driver.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteBus(bus.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Manage Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Manage Routes</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Route
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Route</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From *</Label>
                        <Input
                          id="from"
                          placeholder="e.g., Indore"
                          value={routeForm.from}
                          onChange={(e) => setRouteForm({...routeForm, from: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To *</Label>
                        <Input
                          id="to"
                          placeholder="e.g., Bhopal"
                          value={routeForm.to}
                          onChange={(e) => setRouteForm({...routeForm, to: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="distance">Distance</Label>
                        <Input
                          id="distance"
                          placeholder="e.g., 190 km"
                          value={routeForm.distance}
                          onChange={(e) => setRouteForm({...routeForm, distance: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estimatedTime">Estimated Time</Label>
                        <Input
                          id="estimatedTime"
                          placeholder="e.g., 4h 30m"
                          value={routeForm.estimatedTime}
                          onChange={(e) => setRouteForm({...routeForm, estimatedTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleAddRoute} className="bg-gradient-primary hover:opacity-90">
                    Add Route
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            {/* Routes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{route.from} → {route.to}</span>
                      <Badge variant={route.isActive ? "default" : "secondary"}>
                        {route.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. Time:</span>
                        <span>{route.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Booking Management</h2>
              <p className="text-muted-foreground mb-6">View and manage passenger bookings</p>
              <Card className="max-w-md mx-auto p-6">
                <p className="text-sm text-muted-foreground">
                  Booking management functionality will be implemented next. This will include:
                </p>
                <ul className="text-sm text-left mt-4 space-y-1">
                  <li>• View all bookings</li>
                  <li>• Passenger details</li>
                  <li>• Payment status</li>
                  <li>• Seat assignments</li>
                  <li>• Booking cancellations</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Analytics & Reports</h2>
              <p className="text-muted-foreground mb-6">Track your business performance</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Total Buses</h3>
                  <p className="text-3xl font-bold text-primary">{buses.length}</p>
                </Card>
                <Card className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Active Routes</h3>
                  <p className="text-3xl font-bold text-primary">{routes.filter(r => r.isActive).length}</p>
                </Card>
                <Card className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Total Bookings</h3>
                  <p className="text-3xl font-bold text-primary">0</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}