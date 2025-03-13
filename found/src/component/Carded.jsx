import React from 'react'
import useAccess from '../hook/useAccess';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Phone } from 'lucide-react';
const Carded = ({prop:e,index}) => {
const navigate = useNavigate();
 
  return (
    <div>
  
      <div key={index} className={`w-[300px] bg-[#FFF7FC] border hover:cursor-pointer transition-all  hover:-translate-y-1   p-5 rounded-xl text-black flex-shrink-0 relative`} 
      onClick={()=> navigate('/view/'+e._id)}>
    <div className="w-[150px] h-[150px] flex justify-self-center">
      <img src={`http://localhost:3000${e.images}`}  alt="" className="object-fit rounded-lg"/>
    </div>
    <div className="flex text-start flex-col  space-y-2">
      <h1 className="font-bold text-xl text-[#FB923C]">{e.itemName}</h1>
      <p className="text-[12px] text-[#3a3a3a]">{e.location} {new Date(e.dateLostOrFound).getMonth()+1} {new Date(e.dateLostOrFound).getFullYear()}</p>


        <div className="flex items-center mt-2 space-x-4 bg-[#ededed] py-2 px-1 rounded-lg">
            <div className="flex gap-2 w-full items-center">
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<p className="text-[12px]">{e.reportedBy.name}</p>
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
    </div>
  )
}

export default Carded
