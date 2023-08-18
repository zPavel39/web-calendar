import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';

const RCalendar = ({ ...props }) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    props.setDateSelect(date)
  }, [date])

  return (
    <>
      <div>ВЫБЕРЕТЕ ПЕРИОД ДЕЙСТВИЯ КАТЕГОРИИ
        <Calendar onChange={setDate} value={date} selectRange={true} />
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Начало:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>Конец:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
    </>
  )
}

export default RCalendar;