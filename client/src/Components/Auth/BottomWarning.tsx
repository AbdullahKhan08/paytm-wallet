import React from 'react'
import { Link } from 'react-router-dom'
import { BottomWarningProps } from '../../utils/types'

const BottomWarning: React.FC<BottomWarningProps> = ({
  label,
  buttonText,
  to,
}) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link to={to} className="pointer underline pl-1 cursor-pointer">
        {buttonText}
      </Link>
    </div>
  )
}

export default BottomWarning