import React from "react";
import FeatureCard from "../component/FeatureCard";
import Navbar from "../component/Navbar";
import phone from "../assets/phone.png";
import { ArrowRightCircle, MessageCircleMore, Phone, SearchCode } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import useAccess from "../hook/useAccess";
import Carded from '../component/Carded'
//import { HowItWorksStep } from "components/HowItWorksStep";


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

const sampleitems = [
  {
    "itemName": "iPhone 13",
    "itemType": "lost",
    "description": "Lost near the city mall on 10th March. The phone has a black case and a cracked screen protector.",
    "category": "electronic",
    "contactOwner": "+91 9876543210",
    "images": ["https://rukminim2.flixcart.com/image/832/832/ktketu80/mobile/6/n/d/iphone-13-mlpg3hn-a-apple-original-imag6vpyghayhhrh.jpeg?q=70&crop=false"]
  },
  {
    "itemName": "Gold Ring",
    "itemType": "found",
    "description": "Found a gold ring in the park near the fountain. It has an engraved letter 'S' inside.",
    "category": "jewellery",
    "contactOwner": "+91 9123456789",
    "images": ["https://rukminim2.flixcart.com/image/832/832/l0lbrm80/precious-ring/g/j/5/si-14kt-3-41-mr-np-0098373-kisna-original-imag2zmttpxuszhm.jpeg?q=70&crop=false"]
  },
  {
    "itemName": "Driving License",
    "itemType": "lost",
    "description": "Lost my wallet containing my driving license near the metro station. Name on the license: Arjun Kumar.",
    "category": "document",
    "contactOwner": "+91 9871234567",
    "images": ["https://rukminim2.flixcart.com/image/832/832/xif0q/travel-document-holder/g/b/s/two-wheeler-car-document-holder-vehicle-document-storage-wallet-original-imagpuzygvr2bubu.jpeg?q=70&crop=false"]
  },
  {
    "itemName": "Smartwatch",
    "itemType": "found",
    "description": "Found a black smartwatch in the food court of the shopping mall. The screen is locked with a passcode.",
    "category": "electronic",
    "contactOwner": "+91 8765432109",
    "images": ["https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70&crop=false"]
  }
]


export default function Home() {
const {data} = useAccess('item')
console.log(data)
  return (
    <div className="min-h-screen space-y-10 text-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Reunite with Your Lost Items</h1>
            <p className="text-md text-gray-300 mb-8">
              FindYour's creates a trustworthy community platform where you can post lost or found items and help each other recover what matters most.
            </p>
            <div className="flex  justify-center gap-4">
              <button 
                onClick={() => navigate("/")} 
                className="px-6 py-3 flex items-center gap-2 border-b  text-[#FFD000] hover:bg-primary/90 transition-colors font-medium text-lg  "
              >
                Find Now <SearchCode/> 
              </button>

            </div>
          </div>
        </div>
      </section>

{/* post a */}

<section>
  <div className="space-y-5 px-5">
    <div className="w-full md:h-[250px] gap-5 flex ">
      <div className="w-[30%]   rounded-xl p-5 items-center justify-center flex">
        <h1 className="text-2xl text-[#F8E71C] md:text-6xl font-bold  ">Found items</h1>
      </div>
      <div className="w-[70%]  bg-[#1E1E1E]  rounded-xl p-5 items-center flex text-md">
        <p className="text-[#F5F5F5]">
        <b>Found something that isn’t yours?</b> A small act of kindness can make a big difference! Someone might be searching for it desperately.Report found items on FindYour’s and help bring smiles to those in need!
        </p>
      </div>
    </div>

    <div className="w-full md:h-[250px] gap-5 flex">
    
      <div className="w-[70%]  bg-[#1E1E1E]   rounded-xl p-5 items-center flex">
        <p className="text-md text-[#F5F5F5]">
        Losing something can be stressful, but don’t be afraid—go and find it! Your lost item might be closer than you think. Stay hopeful and let FindYour’s help you reconnect with what’s missing.
Post your lost item now and let the community help you!
        </p>
      </div>
      <div className="w-[30%]     rounded-xl p-5 items-center flex">
        <h1 className="text-2xl text-[#F8E71C] md:text-6xl font-bold ">Lost items</h1>
      </div>
    </div>
  </div>
</section>





      {/* Stats Section */}
      <section className="py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Success Rate</h1>
        <div className=" px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold  text-[#ffc306] mb-2">10,000+</p>
              <p className="text-gray-300">Items Recovered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold  mb-2 text-[#ffc306] ">5,000+</p>
              <p className="text-gray-300">Happy Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#ffc306]  mb-2">95%</p>
              <p className="text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

{/* Recent items */}

<section>
  <h1 className="text-3xl font-bold text-center mb-10">Recent Found Items</h1>
<div className="flex  flex-wrap gap-5 w-full justify-center ">
  {
   sampleitems.map((e, index)=>
    <div key={index} className={`w-[300px] bg-[#FFF7FC] border hover:cursor-pointer transition-all  hover:-translate-y-1   p-5 rounded-xl text-black flex-shrink-0 relative`} >
 <div className="w-[150px] h-[150px] flex justify-self-center">
   <img src={e.images}  alt="" className="object-fit rounded-lg"/>
 </div>
 <div className="flex text-start flex-col  space-y-2">
   <h1 className="font-bold text-xl ">{e.itemName}</h1>
   <p className="text-[12px] text-[#3a3a3a] "><i className="font-bold bg-yellow-300 px-2 py-1 rounded-md">{e.category}</i> <span className="">{e.description}</span></p>


     <div className="flex items-center mt-2 space-x-4 bg-[#ededed] py-2 px-1 rounded-lg">
         <div className="flex gap-2 w-full items-center">
         <Avatar>
<AvatarImage src="https://github.com/shadcn.png" />
<AvatarFallback>CN</AvatarFallback>
</Avatar>
<p className="text-[12px]">{e.contactOwner}</p>
         </div>
           <p className="border rounded-full bg-blue-200 border-blue-600 p-1 text-black">
             <Phone size={"20px"} className="text-blue-600"/>
           </p>
        
   </div>
   <p className={`${e.itemType == "lost"?'bg-red-300 border-red-600':'bg-green-300'}  text-black font-bold p-2 rounded-md rounded-tr-xl top-1 border-2 border-green-500 right-1 absolute text-[12px]`}>
     {e.itemType}
   </p>
 </div>
</div>
  )
  }
</div>

</section>



      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-gray-300">
              Our platform offers everything you need to find lost items or return found ones to their rightful owners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* How It Works Section */}
      {/* <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300">
              Using FindYour's is simple and straightforward.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            <HowItWorksStep 
              number={1}
              title="Create an Account"
              description="Sign up for free and set up your profile with contact information."
            />
            <HowItWorksStep 
              number={2}
              title="Post Lost or Found Items"
              description="Add details and photos of the item along with the location information."
            />
            <HowItWorksStep 
              number={3}
              title="Connect and Arrange"
              description="Get matched with potential findings and securely arrange the recovery."
            />
            <HowItWorksStep 
              number={4}
              title="Recover Your Item"
              description="Meet safely to retrieve your lost belongings and mark the item as recovered."
            />
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find What You've Lost?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users who have successfully recovered their belongings with FindYour's.
            </p>
            <button 
              onClick={() => navigate("/register")} 
              className="px-6 py-3 bg-primary text-yellow-300 border rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#332941] rounded-t-2xl text-white ">
        <div className="px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold">
                  <span>F</span>
                </div>
                <span className="text-xl font-bold">FindYour's</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Helping people find and recover lost items through a community-driven platform.
              </p>
            </div>
            <div className="grid grid-cols-2  gap-8">
             
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
}
