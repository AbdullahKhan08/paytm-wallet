import React from 'react'
import { BalanceProps } from '../../utils/types'

const Balance: React.FC<BalanceProps> = ({ value }) => {
  return (
    <div className="flex mt-4 ml-4 py-2 px-2">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  )
}

export default Balance
