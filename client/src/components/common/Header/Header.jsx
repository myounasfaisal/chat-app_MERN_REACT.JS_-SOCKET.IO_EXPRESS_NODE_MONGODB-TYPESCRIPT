import React from 'react'
import Navbar from '../Navbar/Navbar'

function Header() {
  return (
    <><header
    className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
  ><Navbar/>
  </header>
  </>
  )
}

export default Header