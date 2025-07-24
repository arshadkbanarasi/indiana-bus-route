import { Bus, MapPin, Clock, Shield } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[60vh] bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Bus className="h-16 w-16" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Your Journey,
          <br />
          <span className="text-yellow-200">Our Priority</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Book bus tickets across India with ease. From bustling cities to peaceful villages, 
          we connect you to every destination.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold">500+ Routes</div>
              <div className="text-sm">Covering major cities</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Real-time Tracking</div>
              <div className="text-sm">Live bus locations</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-white/90">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Secure Payments</div>
              <div className="text-sm">Safe & reliable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}