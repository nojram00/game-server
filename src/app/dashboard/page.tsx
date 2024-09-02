import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import React from 'react'

export default function dashboard() {
  return (
    <div>
        <Navbar headerName='Dashboard'/>
        <Sidebar />
    </div>
  )
}
