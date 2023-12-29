import {
  LocalizationProvider,
  DateTimePicker,
  DatePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'

interface CalendarProps {
  value: Date | dayjs.Dayjs
  shouldDisableFuture?: boolean
  shouldDisablePast?: boolean
  handleChange: (value: dayjs.Dayjs | null) => void
}

export function DateInput({
  value,
  shouldDisableFuture = false,
  shouldDisablePast = false,
  handleChange,
}: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <DatePicker
          value={dayjs(value)}
          disableFuture={shouldDisableFuture}
          disablePast={shouldDisablePast}
          onChange={(value) => handleChange(value)}
        />
      </div>
    </LocalizationProvider>
  )
}
