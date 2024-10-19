import { getSession, isAdmin } from '@main/libs/Session'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default async function Sidebar() {

  const session = await getSession()
  const navs = [
    {
        name: "Dashboard",
        link : "/dashboard",
        icon_src : "/icons/dashboard.png"
    },
    {
        name: "Scores",
        link: "/scores",
        icon_src : "/icons/score.png"
    },
    {
        name : "Progress",
        link : "/progress",
        icon_src : "/icons/growth.png"
    },
    {
        name : "Classes",
        link: "/classes",
        icon_src : "/icons/class.png"
    },
    {
        name : "Account Settings",
        link : "/account-settings",
        icon_src : "/icons/settings.png"
    }
]

  if(session && session.isAdmin){
    const admin_navs = [
        {
            name : "Add Teacher",
            link : "/add-teacher",
            icon_src : "/icons/profile.png"
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
            <ul className="menu bg-base-200 text-base-content min-h-full w-56 p-4 gap-5">
            {/* Sidebar content here */}
            { navs.map((item, id) => (
                <li key={id} className=''>
                    
                    <Link href={item.link} className='p-3'>
                        <Image src={typeof item.icon_src === 'string' ? item.icon_src : ''} width={50} height={50} alt={item.name + "-icon"} />
                        {item.name}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
