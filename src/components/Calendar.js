import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {

  let eventArr= []
  let eventGuid = 0;

  function createEventId() {
    return String(eventGuid++)
  }

  const handleClick = (selectInfo) => {
    alert('Clicked on: ' + selectInfo.dateStr);
    console.log(selectInfo.dateStr);
    
    //   info.dayEl.style.backgroundColor = 'red';
    //2020-08-23T07:00:00+02:00
    //localStorage.setItem('pickDate', JSON.stringify(selectInfo.dateStr))
    let calendarApi = selectInfo.view.calendar;
    calendarApi.addEvent({
      id: createEventId(),
      start: selectInfo.dateStr

    })
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin , timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      businessHours= {{
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

        startTime: '07:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      }}
      duration='00:30:00'
      allDaySlot={false}
      editable={true}
      slotMinTime="07:00:00"
      slotMaxTime="18:00:00"
      dateClick={handleClick}
      // eventsSet={handleEvents} 
     
    />
  )
}