import React from "react";
import { ChevronRight, Clock, Grid2X2, MapPin, Phone } from "lucide-react";
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
    <h3 className="text-md md:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

// Item Card Component
const ItemCard = ({ item }) => (

  <div 
        key={item} 
        className="bsg-[#1F2937] bg-black border border-[#535353] hover:cursor-pointer transition-all hover:-translate-y-1 p-3 rounded-md text-white flex-shrink-0 relative shadow-lg hover:shadow-xl" 
      >
        <div className="w-[180px] h-[180px] flex justify-center mx-auto rounded-lg overflow-hidden">
          <img src={`http://localhost:3000${item.images}`} alt="Item" className="object-cover w-full h-full" loading='lazy' onError={(e)=> e.target.src='https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg'}/>
        </div>
        <div className="flex flex-col text-start space-y-3 mt-4 bg-[#232323] p-2 rounded-lg">
          <h1 className="font-bold text-xl text-[#FACC15] truncate">{item.itemName}</h1>
<div className="flex justify-between">
<p className='flex gap-2 items-center text-gray-300'><Grid2X2 size={'18px'} color='black' className='bg-[#f4f4f4] p-1 rounded-full '/> {item.category}</p>
<p className='text-[12px] flex items-center gap-2 mr-3'><Clock color='green' size={'18px'} className='bg-[#f4f4f4] p-1 rounded-full '/> 20/04/2024</p>
</div>
          <div className="flex gap-2 items-center">
          <MapPin size={'18px'} color='red' className='bg-[#f4f4f4] rounded-full p-1'/> 
          <p className="text-sm text-gray-300 ">salem,TN</p>
        
       
          </div>

          
          <p className={`${item.itemType === "lost" ? 'bg-red-500 border-red-700' : 'bg-green-500 border-green-700'} text-white font-semibold px-3 py-1 rounded-md top-2 right-2 absolute text-[10px] shadow-md`}> 
            {item.itemType.toUpperCase()} 
          </p>
        </div>
      </div>
);


// Main App Component
const FindYoursApp = () => {
  const navigate = useNavigate()
  // Icons
  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="red" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );

  const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Reunite with Your Lost Items</h1>
            <p className="text-xl md:text-2xl font-bold text-white/40 mb-8">
              FindYour's creates a trustworthy community platform where you can post lost or found items and help each other recover what matters most.
            </p>
            <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" onClick={()=> navigate('/report')}>
              Lost
            </button>
              
            <button className="px-6 py-3  border border-[#FFD000] rounded-md hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" onClick={()=> navigate('/report')}>
              Found
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lost/Found Sections */}
      <section className="py-14">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Found Item */}
          <div className=" rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-center">
            <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
            Found Something? Help It Find Its Way Back!
            </h1>
            <p className="text-[#F5F5F5]/60 text-base md:text-lg leading-relaxed">
              Found something that isn't yours? A small act of kindness can make a big difference! 
              Someone might be searching for it desperately. Report found items on <span className="font-semibold">FindYour's</span> and help bring smiles to those in need!
            </p>
          </div>

<div className="divder border border-white/50"></div>
          {/* Lost Item */}
          <div className="rounded-xl p-6 md:p-8 flex flex-col gap-4 justify-center">
            <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
            Lost Something? Let's Help You Find It! 
            </h1>
            <p className="text-[#F5F5F5]/60 text-base md:text-lg leading-relaxed">
              Losing something can be stressful, but don't worry—FindYour's has your back! Post your lost item and 
              let the community help you get it back. Stay hopeful—your item might be closer than you think.
            </p>
          </div>

        </div>
      </div>
    </section>

      {/* Stats Section */}
      <section className="md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">Success Rate</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 max-w-3xl mx-auto">
            <div className="text-center p-6 ">
              <p className="text-4xl font-bold text-[#ffc306] mb-2">1000+</p>
              <p className="text-gray-300">Items Recovered</p>
            </div>
            <div className="text-center p-6 ">
              <p className="text-4xl font-bold mb-2 text-[#ffc306]">500+</p>
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
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">Recent Found Items</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 8 mx-auto w-full md:w-[80vw]">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Features</h2>
            <p className="text-xl md:text-2xl font-bold text-white/40 mb-8">
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
              icon={<CommunityIcon/>}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find What You've Lost?</h2>
            <p className="text-xl md:text-2xl font-bold text-white/40 mb-8">
              Join thousands of users who have successfully recovered their belongings with FindYour's.
            </p>
            <button className="px-4 py-2 md:px-6 md:py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>);};
export default FindYoursApp;