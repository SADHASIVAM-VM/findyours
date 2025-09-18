import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send,HeartHandshake, Globe, Users  } from "lucide-react";

const points = [
  {
    icon: <HeartHandshake className="w-7 h-7 text-[#e5ff75]" />,
    title: "Our Mission",
    desc: "To create a trustworthy digital space where people can reunite with their lost belongings through community-driven support.",
  },
  {
    icon: <Globe className="w-7 h-7 text-[#e5ff75]" />,
    title: "Our Vision",
    desc: "A world where no lost item stays unclaimed — every person, everywhere, has access to an easier and safer way to recover what matters.",
  },
  {
    icon: <Users className="w-7 h-7 text-[#e5ff75]" />,
    title: "Our Values",
    desc: "We believe in empathy, community trust, and transparency as the foundation of every successful recovery.",
  },
];

export default function AboutPage() {
  return (

    <>
       <div className="bg-black h-72 w-full flex-col flex items-center justify-center">
        <h2 className="text-5xl text-center   md:text-6xl font-medium mb-4 bg-gradient-to-b from-gray-100 via-gray-300 to-[#e5ff75] text-clip text-transparent bg-clip-text">
          About</h2>
  <p className="text-gray-300 max-w-4xl mx-auto text-center text-lg leading-relaxed">
            Lost & Found is a platform dedicated to helping people reunite with their
            lost belongings. Whether you’ve lost an item or found something
            valuable, our community-driven platform connects people to return
            lost items to their rightful owners.
          </p>
          
      </div>

    <div className=" p-6 space-y-8 lg:grid  lg:grid-cols-3 gap-5 lg:grid-rows-2  min-h-screen">

   

     

     <div className="col-span-2 row-span-2 space-y-5">
       <Card className="shadow-lg bg-[#1c1c1c]  rounded-md border  border-[#4e4e4e] p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-300">How It Helps Others</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2  text-gray-400 text-lg leading-relaxed">
            <li>Report lost items quickly and efficiently.</li>
            <li>Finders can list found items to return them.</li>
            <li>Community-driven approach increases chances of recovery.</li>
            <li>Secure messaging system for safe communication.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg  rounded-md bg-[#1c1c1c]  border-[#4e4e4e] p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-transparent text-gray-300">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lg text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail color="yellow" size={'28px'} className="text-primary border border-[#3b3b3b] rounded-full p-1" />
              <span>support@lostandfound.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone color="yellow" size={'28px'} className="border border-[#3b3b3b] rounded-full p-1 text-primary" />
              <span>+123 456 7890</span>
            </div>
          </div>
        </CardContent>
      </Card>

 
     </div>

      <Card className="shadow-lg col-span-1 bg-[#1c1c1c] row-span-2 rounded-2xl  border-[#4e4e4e] p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-300">Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="text" placeholder="Your Name" className="w-full text-lg p-2 border border-[#4e4e4e] rounded-md" />
            <Input type="email" placeholder="Your Email" className="w-full text-lg p-2 border border-[#4e4e4e] rounded-md" />
            <textarea placeholder="Your Message" className="w-full text-lg p-2 border border-[#4e4e4e] rounded-md" />
            <Button className="flex items-center space-x-2  text-white py-2 px-4 bg-transparent border border-[#4e4e4e] rounded-md hover:bg-primary-dark transition">
              <Send className="w-4 h-4" />
              <span>Send Feedback</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
        <MissionVision/>
        </>
  );
}

export const MissionVision = () => {
  return (
    <section className="py-24 bg-white" id="mission-vision">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs sm:text-sm rounded-full bg-gray-900 border shadow-sm">
            Who We Are
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl  text-black text-center mt-6">
          More than a platform — <br /> we’re a movement of trust
        </h2>
        <p className="text-center text-gray-800 mt-4 max-w-2xl mx-auto">
          Lost & Found is not just about missing items. It’s about kindness, 
          community, and making the world feel a little smaller, one recovery at a time.
        </p>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {points.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white border rounded-2xl shadow-sm p-8 hover:shadow-md transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#353535] mb-4">
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">{p.title}</h3>
              <p className="text-sm md:text-md text-gray-800">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
