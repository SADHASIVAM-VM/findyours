import React from 'react';
import { useNavigate } from "react-router-dom";
import { Clock, Grid2X2, MapPin, Phone } from 'lucide-react';

const Carded = ({ prop: e, index }) => {
  const navigate = useNavigate();

  const formatDate = (postDate) => {
    const date = new Date(postDate);
    return new Intl.DateTimeFormat('en-GB', {
      day: "2-digit",
      month: "short"
    }).format(date);
  };

  return (
   
      <div 
        key={index} 
        className="bsg-[#1F2937] bg-black border border-[#535353] hover:cursor-pointer transition-all hover:-translate-y-1 p-3 rounded-md text-white flex-shrink-0 relative shadow-lg hover:shadow-xl" 
        onClick={() => navigate('/view/' + e._id)}
      >
        <div className="w-[180px] h-[180px] flex justify-center mx-auto rounded-lg overflow-hidden">
          <img src={`http://localhost:3000${e.images}`} alt="Item" className="object-cover w-full h-full" loading='lazy' onError={(e)=> e.target.src='https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg'}/>
        </div>
        <div className="flex flex-col text-start space-y-3 mt-4 bg-[#232323] p-2 rounded-lg">
          <h1 className="font-bold text-xl text-[#FACC15] truncate">{e.itemName}</h1>
<div className="flex justify-between">
<p className='flex gap-2 items-center text-gray-300'><Grid2X2 size={'18px'} color='black' className='bg-[#f4f4f4] p-1 rounded-full '/> {e.category}</p>
<p className='text-[12px] flex items-center gap-2 mr-3'><Clock color='green' size={'18px'} className='bg-[#f4f4f4] p-1 rounded-full '/> {formatDate(e.updatedAt)}</p>
</div>
          <div className="flex gap-2 items-center">
          <MapPin size={'18px'} color='red' className='bg-[#f4f4f4] rounded-full p-1'/> 
          <p className="text-sm text-gray-300 ">{e.location.length > 30 ?e.location.slice(0,30)+'....':e.location}</p>
        
       
          </div>

          
          <p className={`${e.itemType === "lost" ? 'bg-red-500 border-red-700' : 'bg-green-500 border-green-700'} text-white font-semibold px-3 py-1 rounded-md top-2 right-2 absolute text-[10px] shadow-md`}> 
            {e.itemType.toUpperCase()} 
          </p>
        </div>
      </div>
  );
};

export default Carded;
