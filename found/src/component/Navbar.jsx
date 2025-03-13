import React, { useEffect, useState } from "react";
import { useCon } from "../controller/ContextController";
import { CheckCircle, CircleX, LogOut, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useAccess from "../hook/useAccess";
import { Link, useLocation } from "react-router-dom";
import menu from '../assets/icon/menu.png'
import x from '../assets/icon/x.png'
 
const Navbar = () => {
  const {logout, user} = useCon()
  const {data} = useAccess('notify')
  const [isOpen, setIsOpen] = useState(false)

  const {pathname} =useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


const menuItem =[
  {
  path:'All',
  link:'/all'
},
  {
  path:'Found Items',
  link:'/find'
},
  {
  path:'Lost Items',
  link:'/lost'
},
  {
  path:'Report',
  link:'/report'
},



]


  return (
    <nav className={``}>
      <div className="max-w-8xl bg-[#FFF7FC] mx-auto md:rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Div 1 - Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-green-500">
           <i><Link to={'/'}>FindYour’s</Link> </i>
          </div>

          {/* Div 2 - Menu Items */}
          <div className="hidden md:flex space-x-6">
          {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} className="text-gray-700 hover:text-blue-600 font-medium">{e.path}</a>

                  ))
              }
          </div>


          {/* mobile */}
          {
            isOpen && <div className="flex justify-center absolute top-15 left-0 bg-[#FFF7FC] w-full z-10 py-10 w-f md:hidden space-x-6">
            
            <div className=" space-y-3 z-10 flex flex-col justify-center ">
              {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} className="text-gray-700 hover:text-blue-600 font-medium">{e.path}</a>

                  ))
              }

            <button className="text-black p-2 items-center flex  rounded-md border hover:-translate-y-1 hover:border-red-300 transition-all " onClick={logout}>
          
           <p className="text-[14px]">{user?"logout":"login"}</p>
            </button>

            </div>
            
          </div>
          }


          {/* Div 3 - Login & Notification */}
          <div className="flex items-center space-x-3">
            <button className="text-black gap-2 items-center hidden md:flex p-1 rounded-md border hover:-translate-y-1 hover:border-red-300 transition-all " onClick={logout}>
           
           <p className="text-[14px] p-1 font-bold">{user?"logout":"login"}</p>
            </button>

            {/* Notification Icon */}
            <div className="relative hover:-translate-y-1 mt-2 hover:border-red-300 transition-all ">
            <Sheet>
  <SheetTrigger ><svg className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-2.8a5 5 0 00-.6-4.2V7a6 6 0 00-12 0v3a5 5 0 00-.6 4.2L4 17h5m6 0a3 3 0 01-6 0" />
              </svg></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="text-black text-xl font-bold">Notification</SheetTitle>
    
      <SheetDescription className=" ">
      <div className="flex gap-4 flex-col h-screen overflow-scroll ">
        {
          data.map((e, index)=> 
          (
            <div className=" border p-2 rounded-md relative " key={index}>
            <div className="">
            <p className="font-bold">{e.message}</p>
          <div className="flex gap-2 mt-5">
          <button className="bg-blue-200 p-1 rounded-md ">check it out</button>
            <button className="bg-green-200 p-1 rounded-md text-green-600"><CheckCircle/> </button>
    
            <button className="bg-red-300 rounded-full p-1 absolute top-1 right-1">
            <CircleX color="red" size={'18px'}/>
          </button>
          </div>
    
            </div>
    
           
           </div>
          ))
        }
      </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent></Sheet>
              
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </div>

{/* menu icon */}
            <div className="md:hidden cursor-pointer hover:scale-110">
              {
                !isOpen ?
                <img src={menu} alt="" className="w-[24px] " onClick={()=>setIsOpen(!isOpen)}/>
                :
                <img src={x} alt="" className="w-[24px] " onClick={()=>setIsOpen(!isOpen)} />
              }
            </div>

          </div>
        </div>
      </div>
     

    </nav>
  );
};

export default Navbar;
