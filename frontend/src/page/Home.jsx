import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Bell, Users, Slack, Slash, Eye } from "lucide-react";
import Testimonials from "../component/Testimonial";
import HowItHelps from "../component/Features";
import TrustSection from "../component/Trust";
import { useNavigate } from "react-router-dom";
import {MissionVision} from '../page/About'

const FloatingCard = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`bg-[#0f0f0f] shadow-lg rounded-xl p-5 border border-[#454545] ${className}`}
  >
    {children}
  </motion.div>
);

const FindYoursApp = () => {
const navigate = useNavigate()

  return (
    <div className="bg-black text-white font-sans">
      {/* Hero */}
      <section className="relative text-center bg-[url('/herobg.svg')] md:py-24 px-6 overflow-hidden">
        <h2 className="text-2xl sm:text-4xl  md:text-6xl lg:text-8xl font-medium mb-4 bg-gradient-to-b from-gray-100 via-gray-300 to-[#e5ff75] text-clip text-transparent bg-clip-text">
          Lost it? Found it? <br /> <span className="font">Get it back, together.</span>
        </h2>
        <p className="md:text-md md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          FindYour’s is the simplest way to reunite people with their lost belongings. 
          Over <span className="font-semibold text-[#e5ff75]">1000+ items</span> returned successfully.
        </p>
       
       <div className=" gap-3 flex mx-auto justify-center items-center">
         <button className="text-sm md:text-md  px-6 py-3 bg-[#1b1b1b] hover:bg-[#e5ff75] hover:text-black font-semibold rounded-md  transition" onClick={()=> navigate('/report')}>
          Lost
        </button>
<Slack className="text-[#75ffcf]"/>
 <button className="text-sm md:text-md  px-6 py-3 bg-[#1b1b1b] hover:text-black font-semibold rounded-md hover:bg-[#e5ff75] transition" onClick={()=> navigate('/report')}>
          Found
        </button>

       </div>
        {/* Floating Cards */}
        <div className="hidden lg:block">
          <div className="absolute inset-0 flex justify-between pointer-events-none">
          <FloatingCard className="absolute top-16 left-6">
            <p className="text-sm font-semibold text-white">Wallet Reported</p>
            <span className="text-xs text-gray-300 flex items-center justify-center gap-1"><MapPin size={14}/>Near Central Park</span>
          </FloatingCard>
          <FloatingCard className="absolute top-32 right-12">
            <p className="text-sm font-semibold text-white">Phone Found</p>
            <span className="text-xs text-gray-300 flex items-center justify-center gap-1"><MapPin size={14}/>Mall, 2nd Floor</span>
          </FloatingCard>
          <FloatingCard className="absolute bottom-24 left-10">
            <p className="text-sm font-semibold text-white">ID Card Returned ✅</p>
            <span className="text-xs text-gray-300 flex items-center justify-center gap-1"><MapPin size={14}/> University Office</span>
          </FloatingCard>
          <FloatingCard className="absolute bottom-20 right-20">
            <p className="text-sm font-semibold text-white">500+ Active Reports 🔥</p>
            <span className="text-xs text-gray-300 flex items-center justify-center gap-1"><Eye size={14}/>Live Now</span>
          </FloatingCard>
        </div>
        </div>
      </section>

<HowItHelps/>


      {/* Stories (Testimonials) */}
      <section id="stories" className="py-24 ">
        <MissionVision/>
       <Testimonials/>
      </section>

<TrustSection/>
      {/* CTA */}
      <section className="py-20 my-5 bg-white text-center px-3">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">Ready to reunite items?</h2>
        <p className="text-sm md:text-md text-gray-800 mb-6">
          Join thousands of people who trust FindYour’s to recover what matters most.
        </p>
        <button className="text-sm md:text-md px-6 py-3 bg-[#e5ff75] text-black font-semibold rounded-md hover:bg-lime-200 transition">
          Contribute Now /.
        </button>
      </section>


    </div>
  );
};


export default FindYoursApp;
