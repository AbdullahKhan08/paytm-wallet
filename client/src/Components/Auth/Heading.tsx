import React from 'react'
import { HeadingProps } from '../../utils/types'

const Heading: React.FC<HeadingProps> = ({ label }) => {
  return <div className="font-bold text-center pt-6 text-4xl">{label}</div>
}

export default Heading
