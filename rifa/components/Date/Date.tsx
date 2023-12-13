import React, { useState } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/pt-br'

import 'react-datetime/css/react-datetime.css'

interface CalendarProps {
  showCalendar: boolean
}

export function DateCalendar({ showCalendar }: CalendarProps) {
  return (
    <div className="flex items-center mt-2">
      <Datetime
        open={showCalendar}
        locale="pt-BR"
        className="w-60 shadow border rounded py-3 px-2 text-gray-darker"
      />
    </div>
  )
}
