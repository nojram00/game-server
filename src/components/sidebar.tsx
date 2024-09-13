import isAdmin from '@main/libs/GetRole'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function Sidebar() {

  const is_admin = await isAdmin()
  const navs = [
    {
        name: "Dashboard",
        link : "/dashboard"
    },
    {
        name: "Scores",
        link: "/scores"
    },
    {
        name : "Progress",
        link : "/progress"
    },
    {
        name : "Classes",
        link: "/classes"
    }
]

  if(is_admin){
    const admin_navs = [
        {
            name : "Add Teacher",
            link : "/add-teacher"
        }
    ]

    admin_navs.forEach((n) => {
        navs.push(n)
    })
  }


  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
            </label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-5">
            {/* Sidebar content here */}
            { navs.map((item, id) => (
                <li key={id} className=''>
                    <Link href={item.link} className='p-3'>{item.name}</Link>
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
