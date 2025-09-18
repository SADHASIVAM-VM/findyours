import React from "react";
import { ShieldCheck, Lock, Users, ThumbsUp } from "lucide-react";

const trustPoints = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#e5ff75]" />,
    title: "Verified Reports",
    desc: "Each post goes through a quick verification check to reduce spam and fraud.",
  },
  {
    icon: <Lock className="w-7 h-7 text-[#e5ff75]" />,
    title: "Secure Messaging",
    desc: "Connect safely with owners and finders without exposing personal details.",
  },
  {
    icon: <Users className="w-7 h-7 text-[#e5ff75]" />,
    title: "Community Moderation",
    desc: "Our community-driven system flags and removes suspicious activity instantly.",
  },
  {
    icon: <ThumbsUp className="w-7 h-7 text-[#e5ff75]" />,
    title: "Trusted by Thousands",
    desc: "Thousands of successful recoveries show the reliability of our platform.",
  },
];

const TrustSection = () => {
  return (
    <section className="md:py-24  text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs sm:text-sm rounded-full bg-[#2a2a2a] border border-white/10 shadow-sm">
            Trust & Safety
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font text-center mt-6">
          A platform built on <br /> trust and safety
        </h2>
        <p className="text-center text-sm md:text-md text-gray-300 mt-4 max-w-2xl mx-auto">
          We know your belongings matter. That’s why FindYour’s prioritizes safety, transparency, 
          and accountability at every step.
        </p>

        {/* Trust Points Grid */}
        <div className="grid md:grid-cols-2  gap-8 mt-16">
          {trustPoints.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center shadow-[#505050ef]  border border-white/10 rounded-2xl shadow-sm p-8 hover:bg-[#2a2a2a] transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#333] mb-4">
                {t.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-gray-300">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
