'use client'
import { Section, Student } from '@main/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Props{
  data? : Array<Section>
}

export default function Selector(props : Props) {

  return (
    <select className="select w-full max-w-xs" name='section'>
        <option className='font-20' defaultValue={0}>Section</option>
        {props.data && props.data.map((section, i) => (
          <option value={(section.sectionId as string)} key={i}>{section.sectionName}</option>
        ))}
    </select>
  )
}
