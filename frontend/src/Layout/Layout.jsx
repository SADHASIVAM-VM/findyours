import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'

const Layout = () => {
  return (
<>
    <nav>
       <div className="mb-2 md:w-[90vw] mx-auto ">
       <Navbar/>
       </div>
    </nav>
    <main className='' >
      <Outlet/>
    </main>

    <footer className="py-12 bg-black rounded-t-2xl text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lg0.png" className='w-24  ' alt="" />
              </div>
              <p className="text-gray-300 text-sm md:text-md max-w-md">
                Helping people find and recover lost items through a community-driven platform.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm md:text-lg font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm md:text-lg font-medium mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Safety Tips</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-md">Community Guidelines</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">&copy; {new Date().getFullYear()} FindYour's. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
