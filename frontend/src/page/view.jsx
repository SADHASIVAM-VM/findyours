import {React, useEffect, useRef, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Info,Calendar, CheckCircle, Gift, Grid2X2, MapPin, CircleX, PhoneCall, UserCheck2 } from "lucide-react";
import useAccess from "../hook/useaccess";
import Carded from "../component/Carded";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ChatComponent from "../component/Chat";
import { useCon } from "../controller/ContextController";

const View = () => {
  const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false);
   
   const descriptionRef = useRef(null);
   const {currentUserId,user,currentUser, MessageId, setMessageId} = useCon()
  //  console.log("................=")
  //  console.log(MessageId)
  const { id } = useParams();
  const { data, loading } = useAccess("item/i/" + id);
  const { data: similar } = useAccess("item");
  console.log(data)
  var ctg;
  var loc;
  function formatDate(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - givenDate) / (1000* 60 * 60* 24));

    return diffInDays === 0 ? "Today" : diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  }
 
    useEffect(() => {
      currentUser()
      function handleClickOutside(event) {
        if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [user]);
   
  return (
    <div className="min-h-screen bg-black md:py-10 md:px-6">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto" >
          {data.length !== 0 ? (
            data.map((e, index) => {
               ctg = e.category;
               loc = e.location
               
              return(
                <>
                <Card key={e._id} className="p-5 rounded-none md:rounded-xl  w-full md:max-w-4xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/*  Image Section */}
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 flex justify-center items-center">
          <img
            src={`http://localhost:3000${e.images}`}
            alt={e.itemName}
            className="w-full h-auto max-h-64 object-contain rounded-lg"
            loading='lazy' onError={(e)=> e.target.src='https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg'}
          />
          
        </div>

        {/*  Details Section */}
        
        <div className="flex flex-col justify-between">
          
          {/* Badges (Status, Type, Date) */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <Badge className={`px-3 py-1 rounded-full text-xs font-semibold ${e.itemType === "lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
              {e.itemType}
            </Badge>
            <Badge className="px-3 py-1 rounded-full text-xs font-semibold">
              {formatDate(e.createdAt)}
            </Badge>
            <Badge className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${e.status !== "Open" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
              <CheckCircle className="w-4 h-4 mr-1" /> {e.status}
            </Badge>
          </div>

          {/*  Title & Updated Date */}
          <h2 className="text-xl md:text-3xl font-bold mt-3 text-gray-900">{e.itemName}</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            <span className="text-blue-600 px-2 py-1 bg-gray-200 rounded-full text-[10px]">Updated:</span> {formatDate(e.updatedAt)}
          </p>

          {/*  Category, Reward, Date, and Location */}
          <div className="">
                {
                  isOpen ?
                   (
                    <div className=" h-[250px] overflow-scroll p-5">
                      <div className="flex items-center justify-between mb-2">
                      <h1 className='font-bold '>Description:</h1>
                      <CircleX color="red" size={'18px'} className="cursor-pointer" onClick={()=>setIsOpen(false)}/>
                      </div>
                      <p className='text-sm'>{e.description}</p>
                    </div>
                   ):
                  <div className="mt-4 space-y-3 text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm flex gap-2 items-center"><Grid2X2 size={16} /> Category:</p>
                    <p className="text-gray-500">{e.category}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm flex gap-2 items-center"><Gift size={16} /> Reward:</p>
                    <p className="font-semibold">{e.reward ? `💲${e.reward}` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm flex gap-2 items-center"><Calendar size={14} /> Lost/Found:</p>
                    <p className="text-gray-500 text-sm">{ (new Date(e.dateLostOrFound)).getDate() +"/"+ (new Date(e.dateLostOrFound)).getMonth()+"/" +(new Date(e.dateLostOrFound)).getFullYear()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm flex gap-2 items-center"><MapPin size={16} /> Location:</p>
                    <p className="text-gray-500 text-sm">{e.location}</p>
                  </div>
                </div>
                }
                

          </div>
         

          {/* Description */}
          <div className="mt-4">
      
          <p className="font-medium text-sm flex gap-2 items-center"><Info size={16} /> Description 
          </p> 
                  
          <div className="flex gap-3 items-center">
        <p className="text-gray-700 mt-1 text-sm">{e.description.length < 40 ?(e.description) :(e.description.slice(0,40)+"....")} </p><button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:text-blue-600">
        <p className='text-[10px] cursor-pointer font-bold text-blue-400'>Read More</p>
      </button> 
        </div>
      
          </div>

          {/*  Contact Information */}
          <div className="flex items-center mt-6 justify-between bg-gray-50 py-3 px-4 rounded-lg shadow-sm">
        
             
              <p className="text-sm text-gray-900 flex gap-2 items-center"><UserCheck2 size={'22px'} color="white" className="bg-green-400 rounded-full p-1"/>{e.reportedBy?.name}</p>
      
          </div>

          {/*  Contact Button */}
          <div className="flex gap-2 items-center p-3">
          <Button className="text-sm flex-1 bg-transparent border hover:bg-white text-black border-gray-900 flex gap-2 items-center"><PhoneCall size={'22px'} />{e.contactNumber}</Button>
          <Button className=" flex-1 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md" onClick={()=>{
            
            setMessageId({userId:currentUserId[0]?._id, receiverId:e.user_id})
            navigate('/chat')
          }
        }>
            message
          </Button>
              </div>

        </div>


      </div>
    </Card>
   </>
              )
            })
          ) : (
            <p className="text-xl font-bold text-gray-700 p-5">
              No Item Found <span className="text-sm">{useLocation().pathname}</span>
            </p>
          )}
        </div>
      )}

      {/* Similar Items Section */}
      <div className="mt-10">
        <h1 className="text-xl font-bold text-white my-3">Similar Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-content-center w-full items-center p-2">
        {similar.filter((e)=> e.category == ctg).map((e, index) => (
            <Carded prop={e} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
