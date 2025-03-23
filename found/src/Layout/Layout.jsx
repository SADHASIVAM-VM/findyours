import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'

const Layout = () => {
  return (
<>
    <nav>
       <div className="mb-5 md:w-[90vw] mx-auto ">
       <Navbar/>
       </div>
    </nav>
    <main >
      <Outlet/>
    </main>
    </>
  )
}

export default Layout
