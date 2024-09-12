'use client'
import { Section } from '@main/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Selector() {

  const [sections, setSections] = useState<Array<Section>>([])
  useEffect(() => {
    axios.get('/api/sections').then((res) => {
      const { data } = res

      let a : Array<Object> = []

      data.forEach((d : any) => {
        a.push(d)
      });

      setSections(a)

    })


  }, [])
  return (
    <select className="select w-full max-w-xs">
        <option className='font-20' defaultValue={0}>Section</option>
        {typeof sections !== "undefined" && sections.map((section, i) => (
          <option value={typeof section.sectionId !== "undefined" || section.sectionId !== null ? section.sectionId : ""} key={i}>{section.sectionName}</option>
        ))}
    </select>
  )
}
