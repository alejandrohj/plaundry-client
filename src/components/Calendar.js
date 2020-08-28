import React from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function PlanCalendar() {

  const calendar = new Calendar({
    plugins: [ dayGridPlugin ]
  });

  return (
    <div>
      {calendar}
    </div>
  )
}
