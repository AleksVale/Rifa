import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'

interface CalendarProps {
  value: Date | dayjs.Dayjs
  shouldDisableFuture?: boolean
  shouldDisablePast?: boolean
}

export function DateCalendar({
  value,
  shouldDisableFuture = false,
  shouldDisablePast = false,
}: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <DateTimePicker
          value={dayjs(value)}
          disableFuture={shouldDisableFuture}
          disablePast={shouldDisablePast}
        />
      </div>
    </LocalizationProvider>
  )
}
