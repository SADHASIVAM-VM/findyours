import React from "react";
import { Search, MapPin, Bell, Users } from "lucide-react";

const features = [
  {
    icon: <Search className="w-6 h-6 text-[#e5ff75]" />,
    title: "Quick Search",
    desc: "Easily browse lost or found items using smart filters and categories.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#e5ff75]" />,
    title: "Location-Based",
    desc: "Pinpoint where items were last seen or found for faster recovery.",
  },
  {
    icon: <Bell className="w-6 h-6 text-[#e5ff75]" />,
    title: "Instant Alerts",
    desc: "Get notified instantly when an item similar to yours is reported.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#e5ff75]" />,
    title: "Community Driven",
    desc: "A trusted community helping each other reunite with their belongings.",
  },
];

const HowItHelps = () => {
  return (
    <section className="py-24  text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs sm:text-sm rounded-full bg-[#2a2a2a] border border-white/10 shadow-sm">
            How it Helps
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-6">
          How FindYour’s makes it easier <br /> for the public
        </h2>
        <p className="text-sm md:text-md md:text-lg text-center max-w-2xl mx-auto text-gray-300 mt-4">
          From posting lost items to reconnecting with their owners, FindYour’s streamlines the process with a simple, modern, and trustworthy platform.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2   gap-6 mt-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="shadow-[#505050ef] border text-center border-white/10 rounded-2xl shadow-sm p-6 flex flex-col items-center
               hover:bg-[#2a2a2a] transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#333] mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItHelps;
