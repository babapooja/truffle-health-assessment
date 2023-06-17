import React from 'react'

const InputField = ({ label, type, id, placeholder, required, min, val, onChange, accept, error }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label} {required && <span className='text-red-600'>*</span>}
        </label>
      </div>
      <input
        accept={accept}
        onChange={onChange}
        value={val}
        min={min}
        id={id}
        type={type}
        required={required}
        className={`w-full px-3 py-2 font-normal border rounded-md placeholder:opacity-60 ${!error ? 'border-slate-300' :'border-red-600'}`}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputField