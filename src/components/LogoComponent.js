import React from 'react'
import logo from "../assets/android-chrome-192x192.png"

const LogoComponent = () => {
  return (
    <div>
      <img src={logo} style={{ marginLeft:"45%", height:"35px", width:"40px"}} alt='daily-planet-logo'/>
    </div>
  )
}

export default LogoComponent
