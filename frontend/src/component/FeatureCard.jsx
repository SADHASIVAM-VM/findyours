import React from "react";


export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-6 bg-[#151515] rounded-xl shadow-sm border border-[#686D76] hover:shadow-md transition-shadow">
      <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
      <p className=" text-center">{description}</p>
    </div>
  );
}
