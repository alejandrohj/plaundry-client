import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {

  const [eventArr, setEventArr] = useState([]);
  let eventGuid = 0;
  let calendarApi;

  function createEventId() {
    return String(eventGuid++)
  }

  const handleClick = (selectInfo) => {
    alert('Clicked on: ' + selectInfo.dateStr);
    let clonedEventArr = JSON.parse(JSON.stringify(eventArr))
    //   info.dayEl.style.backgroundColor = 'red';
    //2020-08-23T07:00:00+02:00
    //localStorage.setItem('pickDate', JSON.stringify(selectInfo.dateStr))
    calendarApi = selectInfo.view.calendar;
    calendarApi.addEvent({
      id: createEventId(),
      start: selectInfo.dateStr,
    })
    clonedEventArr.push(selectInfo.dateStr)
    setEventArr(clonedEventArr);
    localStorage.setItem('dates', JSON.stringify(clonedEventArr))
  }

  var today = new Date()


  return (
 
    <FullCalendar 
      plugins={[ dayGridPlugin , timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
      weekends={false}
      validRange={{
        start: {today},
        
      }}
      businessHours= {{
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

        startTime: '08:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      }}
      allDaySlot={false}
      //editable={true}
      slotMinTime="07:00:00"
      slotMaxTime="18:00:00"
      dateClick={handleClick}
      defaultTimedEventDuration='00:30'
      
   
    />
   
  )
}