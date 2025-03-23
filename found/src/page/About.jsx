import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 font-[\'Playfair Display\', serif]  min-h-screen">
      <Card className="shadow-lg rounded-md bg-transparent border border-[#4e4e4e] p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-300">About Lost & Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-lg leading-relaxed">
            Lost & Found is a platform dedicated to helping people reunite with their
            lost belongings. Whether you’ve lost an item or found something
            valuable, our community-driven platform connects people to return
            lost items to their rightful owners.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-md border bg-transparent border-[#4e4e4e] p-6">
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

      <Card className="shadow-lg rounded-md bg-transparent border-[#4e4e4e] p-6">
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

      <Card className="shadow-lg rounded-2xl bg-transparent border-[#4e4e4e] p-6">
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
  );
}
