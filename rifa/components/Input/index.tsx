import React from 'react'
import {
  FaGift,
  FaCartFlatbed,
  FaShoePrints,
  FaTicket,
  FaDollarSign,
} from 'react-icons/fa6'

const iconTypes = {
  cart: <FaCartFlatbed />,
  flamb: <FaShoePrints />,
  gift: <FaGift />,
  money: <FaDollarSign />,
  ticket: <FaTicket />,
}

interface InputProps {
  register: any
  errors: any
  label: string
  name: string
  placeholder: string
  icon?: keyof typeof iconTypes
}

const InputLabel = React.forwardRef(
  (
    { register, errors, label, name, placeholder, icon }: Readonly<InputProps>,
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
          <div className="bg-slate-300 py-3 px-3 border-r border-red-300">
            {iconTypes[icon]}
          </div>
        )}
        <input
          {...register(name)}
          name={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-300"
          id={name}
          type="text"
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">Esse campo é obrigatório</p>
      )}
    </div>
  ),
)
InputLabel.displayName = 'InputLabel'

export default InputLabel
