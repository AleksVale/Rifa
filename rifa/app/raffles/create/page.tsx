'use client'
import React, { useState } from 'react'
import { FaTicket } from 'react-icons/fa6'

const CreateRaffle: React.FC = () => {
  return (
    <div className="flex-grow">
      <div className="py-8 px-4 sm:px-8 container">
        <h1 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <FaTicket size="40" /> <span className="ml-1">Criar Campanha</span>
        </h1>
      </div>
    </div>
  )
}

export default CreateRaffle
