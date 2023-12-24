import React from 'react'
import InputMask from 'react-input-mask'

import {
  FaGift,
  FaCartFlatbed,
  FaShoePrints,
  FaTicket,
  FaDollarSign,
  FaSignature,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa6'

const iconTypes = {
  cart: <FaCartFlatbed />,
  flamb: <FaShoePrints />,
  gift: <FaGift />,
  money: <FaDollarSign />,
  ticket: <FaTicket />,
  signature: <FaSignature />,
  phone: <FaPhone />,
  envelope: <FaEnvelope />,
}

interface InputProps {
  register: any
  errors: any
  label: string
  name: string
  placeholder: string
  icon?: keyof typeof iconTypes
  mask?: string
}

const InputLabel = React.forwardRef(
  (
    {
      register,
      errors,
      label,
      name,
      placeholder,
      icon,
      mask,
    }: Readonly<InputProps>,
    ref,
  ) => (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-1 mt-3"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="flex items-center">
        {icon && (
          <div className="flex h-12 items-center bg-slate-50 px-3 border border-r-0 rounded-lg rounded-r-none border-slate-300">
            {iconTypes[icon]}
          </div>
        )}
        {mask ? (
          <InputMask
            mask={mask}
            maskChar="-"
            {...register(name)}
            name={name}
            className={`${
              icon
                ? ' roundedrouded-l-none focus:outline-none'
                : 'rounded focus:outline-green-300'
            }block appearance-none border border-slate-300 w-full h-12 px-3 text-gray-700 leading-tight`}
            id={name}
            type="text"
            placeholder={placeholder}
          />
        ) : (
          <input
            {...register(name)}
            name={name}
            className={`${
              icon
                ? ' roundedrouded-l-none focus:outline-none'
                : 'rounded focus:outline-green-300'
            }block appearance-none border border-slate-300 w-full h-12 px-3 text-gray-700 leading-tight`}
            id={name}
            type="text"
            placeholder={placeholder}
          />
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  ),
)
InputLabel.displayName = 'InputLabel'

export default InputLabel
