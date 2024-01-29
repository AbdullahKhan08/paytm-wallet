import React from 'react'

const InputBox = ({ label, placeholder, value, onChange, type }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        type={type}
      ></input>
    </div>
  )
}

export default InputBox
