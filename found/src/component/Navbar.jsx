import React, { useEffect, useState } from "react";
import { useCon } from "../controller/ContextController";
import { CheckCircle, CircleX, Eye, LogOut, LucideView, View, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useAccess from "../hook/useaccess";
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
  path:'dashboard',
  link:'/dashboard'
},
  {
  path:'about',
  link:'/about'
},
  {
  path:'Report',
  link:'/report'
},



]


  return (
    <nav className={``}>
      <div className="max-w-8xl  mx-auto md:rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Div 1 - Logo */}
          <div className="flex-shrink-0 text-md logoh1 font-bold text-yellow-400">
           <Link to={'/'} className="flex items-center"><img src="/logo.svg" className="w-10 h-10" /> <i>FoundYour's</i></Link> 
          </div>

          {/* Div 2 - Menu Items */}
          <div className="hidden md:flex space-x-6">
          {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} className="text-white hover:text-blue-600 font-medium">{e.path}</a>

                  ))
              }
          </div>


          {/* mobile */}
          {
            isOpen && <div className=" bg-black flex justify-center absolute top-15 left-0  w-full z-10 py-10 w-f md:hidden space-x-6">
            
            <div className=" space-y-3 z-10 flex flex-col justify-center ">
              {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} className="text-gray-300 hover:text-blue-600 font-medium">{e.path}</a>

                  ))
              }

<button className="px-6 py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" >
           <p className="text-[14px]">{user?"logout":"login"}</p>
            </button>

            </div>
            
          </div>
          }


          {/* Div 3 - Login & Notification */}
          <div className="flex items-center space-x-3">
            <button className="text-white gap-2 items-center hidden md:flex p-1 rounded-md border hover:-translate-y-1 hover:border-red-300 transition-all " onClick={logout}>
           
           <p className="text-[14px] p-1 font-bold">{user?"logout":"login"}</p>
            </button>

            {/* Notification Icon */}
            <div className="relative hover:-translate-y-1 mt-2 hover:border-red-300 transition-all ">
            <Sheet>
      <SheetTrigger>
        <svg
          className="w-6 h-6 text-gray-400 hover:text-blue-600 cursor-pointer transition duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.4-2.8a5 5 0 00-.6-4.2V7a6 6 0 00-12 0v3a5 5 0 00-.6 4.2L4 17h5m6 0a3 3 0 01-6 0"
          />
        </svg>
      </SheetTrigger>
      <SheetContent className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-gray-800">Notifications</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-4 h-full overflow-auto p-2">
              {data.length > 0 ? (
                data.map((e, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 p-4 rounded-lg shadow-sm relative bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="font-semibold text-gray-700">{e.message}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="bg-blue-500 text-white p-1 rounded-md text-sm hover:bg-blue-600 transition">
                        <Eye size={16} />
                      </button>
                      <button className="bg-green-400 text-white p-1 rounded-md hover:bg-green-600 transition">
                        <CheckCircle size={16} />
                      </button>
                      <button className="bg-red-500 text-white p-1 rounded-full absolute top-2 right-2 hover:bg-red-600 transition">
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No new notifications</p>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
              
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
