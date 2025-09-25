import React from "react";
import { Play } from "lucide-react";

const testimonials = [
  {
    text: "I lost my wallet at a café. Thanks to FindYour’s, it was returned within 24 hours!",
    name: "Arjun K.",
    role: "Student",
    img: "https://i.pravatar.cc/100?img=12",
  },
  {
    text: "A stranger found my phone and posted it here. The system made it so easy to get it back.",
    name: "Priya S.",
    role: "Freelancer",
    img: "https://i.pravatar.cc/100?img=8",
  },
  {
    text: "Our office uses FindYour’s as the official lost & found platform. It saves time and builds trust.",
    name: "Daniel T.",
    role: "Operations Manager",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "I recovered my laptop from a bus station through this platform. Truly life-saving!",
    name: "Sarah W.",
    role: "Freelance Designer",
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "The alerts feature connected me instantly when my ID was reported. Smooth process!",
    name: "Sam J.",
    role: "Project Coordinator",
    img: "https://i.pravatar.cc/100?img=7",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Label */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs sm:text-sm rounded-full bg-gray-900 border shadow-sm">
            Testimonials
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-black font-semibold  text-center mt-6">
          People just like you <br />
          are already using <span className="text-[#e5ff75] bg-black px-2 rounded-md">FindYour’s</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 md:grid-rows-3 gap-6 mt-12">
          {/* Card 1 */}
          <div className="sticky md:relative top-2 bg-white border rounded-2xl row-span-2 shadow-sm p-6 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">
              “{testimonials[0].text}”
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[0].img}
                alt={testimonials[0].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-600 text-sm">{testimonials[0].name}</p>
                
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sticky md:relative top-2 bg-white border rounded-2xl row-span-1 shadow-sm p-6 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">
              “{testimonials[1].text}”
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[1].img}
                alt={testimonials[1].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold  text-gray-600 text-sm">{testimonials[1].name}</p>
            
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sticky md:relative top-2 bg-white border rounded-2xl row-span-1 shadow-sm p-6 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">
              “{testimonials[2].text}”
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[2].img}
                alt={testimonials[2].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-600 text-sm">{testimonials[2].name}</p>
            </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="sticky md:relative top-2 bg-white border rounded-2xl row-span-2 shadow-sm p-6 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">
              “{testimonials[3].text}”
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[3].img}
                alt={testimonials[3].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-600 text-sm">{testimonials[3].name}</p>
             </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="sticky md:relative top-2 bg-white border rounded-2xl row-span-2 shadow-sm p-6 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">
              “{testimonials[4].text}”
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[4].img}
                alt={testimonials[4].name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-600 text-sm">{testimonials[4].name}</p>
              </div>
            </div>
          </div>

          {/*card 6*/}
          <div className="sticky md:relative top-2 rounded-2xl flex-col py-7 gap-4 overflow-hidden shadow-md bg-black text-white flex items-center justify-center">
          <div className="flex gap-1">
            <h1 className="text-6xl font-bold">100+</h1>
            <p className="self-baseline mt-6 text-sm">testimonials</p>
          </div>
            <button className="relative bg-[#e5ff75] z-10 text-sm flex items-center gap-2  text-black px-4 py-2 rounded-full hover:bg-white transition">
            
              see all
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
