import React, { useEffect, useState } from "react";
import { useCon } from "../controller/ContextController";
import { CheckCircle, CircleX, Eye, LogOut, LucideView, MessageCircle, MessageCircleHeart, MessageCircleMore, MessageCircleMoreIcon, User2, View, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useAccess from "../hook/useaccess";
import { Link, useNavigate, useLocation } from "react-router-dom";
import menu from '../assets/icon/menu.png'
import x from '../assets/icon/x.png'


 
const Navbar = () => {
  const navigate = useNavigate()
  const {logout, user} = useCon()
  const {data} = useAccess('notify')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()

  const {pathname} =useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


const menuItem =[
  {
  path:'all',
  link:'/all'
},
  {
  path:'dashboard',
  link:'/dashboard'
},
  {
  path:'report',
  link:'/report'
},
  {
  path:'about',
  link:'/about'
},




]


  return (
    <nav className={``}>
      <div className="max-w-8xl  mx-auto md:rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Div 1 - Logo */}
          <div className="flex-shrink-0 text-md logoh1 font-bold text-yellow-400">
           <Link to={'/'} className="flex items-center"><img src="/lg0.png" className="h-16 rounded-full object-contain" /> </Link> 
          </div>

          {/* Div 2 - Menu Items */}
          <div className="hidden md:flex space-x-6">
          {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} className={`hover:text-blue-600 font-medium ${selectedMenu == e.link ? "text-[#e5ff75]":'text-white '}`} 
                   >{e.path}</a>

                  ))
              }
          </div>


          {/* mobile */}
          {
            isOpen && <div className=" bg-black flex justify-center absolute top-15 left-0  w-full z-50 py-10 w-f md:hidden space-x-6">
            
            <div className=" space-y-3 z-10 flex flex-col justify-center ">
              {
               menuItem.map((e)=>(
                    <a href={e.link} key={e.link} 
                    className={`hover:text-red-600 font-medium ${selectedMenu == pathname ? "text-[#e5ff75]":'text-white '}`} onClick={()=> setSelectedMenu(e.link)}>{e.path}</a>

                  ))
              }

<button className="px-6 py-3 bg-[#FFD000] text-black rounded-lg hover:bg-[#FFD000]/90 transition-colors font-medium text-sm" onClick={logout}>
           <p className="text-[14px] flex items-center gap-2" ><User2 size={'18px'}/>{user?"logout":"login"}</p>
            </button>

            </div>
            
          </div>
          }


          {/* Div 3 - Login & Notification */}
          <div className="flex items-center space-x-3">
          
{/* message Icon */}
            <div className=" hover:-translate-y-1 hover:border-[#ababab] transition-all " onClick={()=> navigate('/chat')}>
         <svg xmlns="http://www.w3.org/2000/svg" color="white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>


            </div>
            {/* Notification Icon */}
            <div className="relative  hover:-translate-y-1 mt-2 hover:border-red-300 transition-all ">
            <Sheet>
      <SheetTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

      </SheetTrigger>
      <SheetContent className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-gray-800">Notifications</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-4 overflow-scroll h-[80vh] p-2">
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

  <button className="text-white gap-2 items-center hidden md:flex p-1 rounded-md border hover:-translate-y-1 hover:border-red-300 transition-all " onClick={logout}>
           
           <p className="text-[14px] p-1 font-bold">{user?"logout":"login"}</p>
            </button>
          </div>
        </div>
      </div>
     

    </nav>
  );
};

export default Navbar;
