import React from 'react'
import { HeadingProps } from '../../utils/types'

const SubHeading: React.FC<HeadingProps> = ({ label }) => {
  return <div className="text-slate-500 text-md pt-1 pb-4 px-4">{label}</div>
}

export default SubHeading
