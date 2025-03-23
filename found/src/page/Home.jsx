import React from "react";
import { ChevronRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Avatar Component
const Avatar = ({ src, fallback }) => (
  <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
    {src ? (
      <img src={src} alt="Avatar" className="w-full h-full object-cover" />
    ) : (
      <span className="text-xs font-medium text-gray-600">{fallback}</span>
    )}
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 transition-all hover:-translate-y-1">
    <div className="bg-gray-400/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

// Item Card Component
const ItemCard = ({ item }) => (
  <div className="w-64 bg-[#FFF7FC] border hover:cursor-pointer transition-all hover:-translate-y-1 p-5 rounded-xl text-black flex-shrink-0 relative">
    <div className="w-full h-36 mb-3 flex justify-center">
      <img src={item.images} alt={item.itemName} className="h-full object-cover rounded-lg" />
    </div>
    <div className="flex flex-col space-y-2">
      <h1 className="font-bold text-xl">{item.itemName}</h1>
      <p className="text-xs text-[#3a3a3a]">
        <span className="font-bold bg-yellow-300 px-2 py-1 rounded-md inline-block mb-1">{item.category}</span> 
        <span className="block mt-1 line-clamp-2">{item.description}</span>
      </p>

      <div className="flex items-center mt-2 space-x-4 bg-[#ededed] py-2 px-1 rounded-lg">
        <div className="flex gap-2 w-full items-center">
          <Avatar src="https://github.com/shadcn.png" fallback="CN" />
          <p className="text-xs">{item.contactOwner}</p>
        </div>
        <div className="border rounded-full bg-blue-200 border-blue-600 p-1 text-black">
          <Phone size={20} className="text-blue-600" />
        </div>
      </div>
      <div className={`${item.itemType === "lost" ? 'bg-red-300 border-red-600' : 'bg-green-300 border-green-500'} text-black font-bold p-2 rounded-md rounded-tr-xl top-1 right-1 absolute text-xs border-2`}>
        {item.itemType}
      </div>
    </div>
  </div>
);


// Main App Component
const FindYoursApp = () => {
  const navigate = useNavigate()
  // Icons
  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );

  const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  // Sample items
  const sampleItems = [
    {
      "itemName": "iPhone 13",
      "itemType": "lost",
      "description": "Lost near the city mall on 10th March. The phone has a black case and a cracked screen protector.",
      "category": "electronic",
      "contactOwner": "+91 9876543210",
      "images": "https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/6/n/d/iphone-13-mlpg3hn-a-apple-original-imag6vpyghayhhrh.jpeg?q=70&crop=false"
    },
    {
      "itemName": "Gold Ring",
      "itemType": "found",
      "description": "Found a gold ring in the park near the fountain. It has an engraved 'zigzag' inside.",
      "category": "jewellery",
      "contactOwner": "+91 9123456789",
      "images": "https://rukminim2.flixcart.com/image/832/832/l0lbrm80/precious-ring/g/j/5/si-14kt-3-41-mr-np-0098373-kisna-original-imag2zmttpxuszhm.jpeg?q=70&crop=false"
    },
    {
      "itemName": "Driving License",
      "itemType": "lost",
      "description": "Lost my wallet containing my driving license near the metro station. Name on the license: Arjun Kumar.",
      "category": "document",
      "contactOwner": "+91 9871234567",
      "images": "https://rukminim2.flixcart.com/image/832/832/xif0q/travel-document-holder/g/b/s/two-wheeler-car-document-holder-vehicle-document-storage-wallet-original-imagpuzygvr2bubu.jpeg?q=70&crop=false"
    },
    {
      "itemName": "Smartwatch",
      "itemType": "found",
      "description": "Found a black smartwatch in the food court of the shopping mall. The screen is locked with a passcode.",
      "category": "electronic",
      "contactOwner": "+91 8765432109",
      "images": "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70&crop=false"
    }
  ];

  return (
    <div className="min-h-screen HeroBackground text-white">
 
      
      {/* Hero Section */}
      <section className=" py-20 my-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Reunite with Your Lost Items</h1>
            <p className="text-2xl font-bold text-white/40 mb-8">
              FindYour's creates a trustworthy community platform where you can post lost or found items and help each other recover what matters most.
            </p>
            <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" onClick={()=> navigate('/report')}>
              Lost
            </button>
              
            <button className="px-6 py-3  border border-[#FFD000] rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" onClick={()=> navigate('/report')}>
              Found
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lost/Found Sections */}
      <section className="py-12">
        <div className="container mx-auto space-y-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1 rounded-xl p-5 flex items-center justify-center">
              <h1 className="text-2xl text-[#F8E71C] md:text-4xl font-bold flex items-center">
                Found item <ChevronRight size={22} />
              </h1>
            </div>
            <div className="md:col-span-2 bg-[#1E1E1E] rounded-xl p-5 md:p-8 flex items-center">
              <p className="text-[#F5F5F5]">
                <b>Found something that isn't yours?</b> A small act of kindness can make a big difference! Someone might be searching for it desperately. Report found items on FindYour's and help bring smiles to those in need!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 order-2 md:order-1 bg-[#1E1E1E] rounded-xl p-5 md:p-8 flex items-center">
              <p className="text-[#F5F5F5]">
                Losing something can be stressful, but don't be afraid—go and find it! Your lost item might be closer than you think. Stay hopeful and let FindYour's help you reconnect with what's missing. Post your lost item now and let the community help you!
              </p>
            </div>
            <div className="md:col-span-1 order-1 md:order-2 rounded-xl p-5 flex items-center justify-center">
              <h1 className="text-2xl text-[#F8E71C] md:text-4xl font-bold flex items-center">
                Lost item <ChevronRight size={22} />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-10">Success Rate</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 ">
              <p className="text-4xl font-bold text-[#ffc306] mb-2">10,000+</p>
              <p className="text-gray-300">Items Recovered</p>
            </div>
            <div className="text-center p-6 ">
              <p className="text-4xl font-bold mb-2 text-[#ffc306]">5,000+</p>
              <p className="text-gray-300">Happy Users</p>
            </div>
            <div className="text-center p-6 ">
              <p className="text-4xl font-bold text-[#ffc306] mb-2">95%</p>
              <p className="text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-10">Recent Found Items</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {sampleItems.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-center w-full mt-8">
            <button className="px-5 text-sm py-2 border border-[#3b3b3b] rounded-md hover:bg-[#1E1E1E] transition-colors" onClick={()=> navigate('/all')}>
              View All
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-2xl font-bold text-white/40 mb-8">
              Our platform offers everything you need to find lost items or return found ones to their rightful owners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<LocationIcon />}
              title="Location Mapping"
              description="Pinpoint exactly where items were lost or found with our interactive map."
            />
            <FeatureCard 
              icon={<SearchIcon />}
              title="Smart Search"
              description="Find relevant items quickly with our advanced filtering and search capabilities."
            />
            <FeatureCard 
              icon={<NotificationIcon />}
              title="Instant Alerts"
              description="Get notified immediately when someone finds an item matching your description."
            />
            <FeatureCard 
              icon={<CommunityIcon />}
              title="Community Trust"
              description="Our verification system ensures safe and secure interactions between users."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find What You've Lost?</h2>
            <p className="text-2xl font-bold text-white/40 mb-8">
              Join thousands of users who have successfully recovered their belongings with FindYour's.
            </p>
            <button className="px-6 py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1E1E1E] rounded-t-2xl text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#332941] font-bold">
                  <span>F</span>
                </div>
                <span className="text-xl font-bold">FindYour's</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Helping people find and recover lost items through a community-driven platform.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Safety Tips</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Community Guidelines</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} FindYour's. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FindYoursApp;