import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import img from "../assets/phone.png"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, MessageCircle, MessageCircleMore } from "lucide-react";
import useAccess from "../hook/useAccess";
import Carded from "../component/Carded";

const View = () => {
  const { id } = useParams();

 const {data, loading}=useAccess('item/i/'+id);
 const {data:similar}=useAccess('item');
console.log(similar)
  return (
    <>
    {
      loading ? <div className="w-full h-screen flex justify-center items-center">
      <p className="loader"></p> </div>
      :
      <div className="min-h-screen bg-[#fdf7ff] py-10 px-6">
      <div className=" md:max-w-8xl  bg-white">
        {/* Breadcrumb */}
       
        {data.length !== 0 ? data&&data.map((e,index)=>(

<Card className=" rounded-lg p-6" key={index}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Images */}
            <div className="border border-gray-400 p-5 rounded-lg">
              <img
                src={'http://localhost:3000'+e.images}
                alt={e.itemName}
                className="w-full h-64 object-contain rounded-lg"
              />
              {/* <div className="flex mt-2 space-x-2">
                {item.similarItems.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Similar item"
                    className="w-16 object-contain h-16 border border-[#b5b5b5] rounded-lg cursor-pointer hover:opacity-80"
                  />
                ))}
              </div> */}
            </div>
            
            {/* Right: Details */}
            <div>
              <div className="flex justify-between">
              <p className="">
             <Badge className={`${e.itemType == "lost" ?"bg-[#ffc8c8] text-red-600":"bg-[#c8ffcd] text-green-600" } p-1 rounded-full px-2 border  text-[12px]`}>
                {e.itemType}
              </Badge >
              <span className="text-[12px] text-black ml-2">posted 2 days ago</span>
             </p>
              <Badge className={`${e.status !== "Open" ?"bg-[#ffc8c8] text-red-600":"bg-[#c8ffcd] text-green-600" } p-1 rounded-full px-2 border  text-[12px]`}>
              <CheckCircle/> {e.status}
              </Badge>
              </div>
             
              <h2 className="text-2xl font-bold mt-2 text-black">{e.itemName
              }</h2>
      
              <div className="mt-4 space-y-2 text-gray-700 grid grid-cols-2">

                <div className="">
                <p className="text-gray-400">Category:</p>
                <p>{e.category}</p>
                </div>

                <div className="">
                <p className="text-gray-400">Location:</p>
                <p>{e.location}</p>
                </div>

                <div className="">
                <p className="text-gray-400">Date Lost:</p>
                <p>{e.dateLostOrFound}</p>
                </div>

                <div className="">
                <p className="text-gray-400">reward:</p>
                <p className="text-green-600 font-semibold">{e.reward&&e.reward}</p>
                </div>

              </div>
             
             <div className="">
                <p className="text-gray-400">Description</p>
             <p className="text-gray-600 mt-1 text-sm">{e.description}</p>
              
             </div>
              <div className="flex items-center mt-6 space-x-4 bg-gray-100 py-2 px-1 rounded-lg">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm text-black ">{e.contactNumber}</p>
                  <p className="text-gray-500 text-[12px]">{e.reportedBy.name}</p>
                </div>
              </div>
              
              <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Contact Owner
              </Button>
            </div>
          </div>
        </Card>
        ))
        :<p className="text-xl font-bold p-5">No Item Found <span className="text-sm">{useLocation().pathname}</span></p>
          
        }
      </div>


      <div className="grid mt-10 lg:grid-cols-4 md:grid-cols-2 place-content-center gap-5">
        <h1 className="text-xl font-bold text-black my-3">Similar Items</h1>

        {
        similar.map((e,index)=>(
          <Carded prop={e} index={index}/>
        ))
      }</div>
    </div>
    }
    
    </>
   
  );
};

export default View;
