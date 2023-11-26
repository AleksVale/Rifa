import React from 'react'

interface InputProps {
  register: any
  errors: any
  label: string
  name: string
  placeholder: string
}

const InputLabel = React.forwardRef(
  (
    { register, errors, label, name, placeholder }: Readonly<InputProps>,
    ref,
  ) => (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-1 mt-3"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...register(name)}
        name={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-300"
        id={name}
        type="text"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">Esse campo é obrigatório</p>
      )}
    </div>
  ),
)
InputLabel.displayName = 'InputLabel'

export default InputLabel
