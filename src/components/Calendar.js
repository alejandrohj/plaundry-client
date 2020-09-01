import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import axios from 'axios';
import {API_URL} from '../config';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function Calendar() {

  const [eventArr, setEventArr] = useState([]);
  let eventGuid = 0;
  let calendarApi;
  const [pickedDates, setPickedDates] = useState([]);
  
  useEffect(() => {
  axios.get(`${API_URL}/orders`, {withCredentials: true})
    .then((result) => {
      let orderArr = result.data;
      let pickClone = JSON.parse(JSON.stringify(pickedDates))
      orderArr.map((order) => {
        pickClone.push(order.pickUp)
        pickClone.push(order.delivery)
      })
      setPickedDates(pickClone)
    })
  }, [])
  
  let usedDates = pickedDates.map((date) => {
    return JSON.parse(JSON.stringify({
      title: 'Busy',
      start: date,
      color: 'red',
    }))
  })

  function createEventId() {
    return String(eventGuid++)
  }
  
  const [clickAmount, setAmount] = useState(1)
  const [err, setErr] = useState(false)

  const handleClick = (selectInfo) => {
    setAmount(clickAmount + 1)
    if (clickAmount > 2) {
      setErr(true)
    } else if (clickAmount === 1) {
      make('pickup', selectInfo)
    } else if (clickAmount === 2) {
   
        //let firstDate = new Date(eventArr[0])
        let secondDate = new Date(eventArr[0])
        secondDate.setDate(secondDate.getDate() +1)
        //console.log(firstDate, 'test', secondDate ) //2020-09-01T10:00:00+02:00

        let clonedEventArr = JSON.parse(JSON.stringify(eventArr))
        calendarApi = selectInfo.view.calendar;
        calendarApi.addEvent({
          id: createEventId(),
          start: selectInfo.dateStr,
          color: '#46C5FF',
          title: 'delivery',
          // Doesn't work
          //constraint: {startDate: secondDate}
        })
        clonedEventArr.push(selectInfo.dateStr)
        setEventArr(clonedEventArr);
        localStorage.setItem('dates', JSON.stringify(clonedEventArr))
      
    }
  }

  function make(sort, info) {
    let clonedEventArr = JSON.parse(JSON.stringify(eventArr))
    calendarApi = info.view.calendar;
    calendarApi.addEvent({
      id: createEventId(),
      start: info.dateStr,
      color: '#46C5FF',
      title: sort,
    })
    clonedEventArr.push(info.dateStr)
    setEventArr(clonedEventArr);
    localStorage.setItem('dates', JSON.stringify(clonedEventArr))
  }

  const hide = (currentDate) => {
    const startDate = new Date(currentDate.valueOf())
    startDate.setDate(startDate.getDate() + 1)
    const endDate = new Date(currentDate.valueOf())
    // One month
    endDate.setDate(endDate.getDate() + 31)
    return {
      start: startDate,
      end: endDate
    }
  }

  return (
    <>
    {
      err ? <p>You can only pick two dates</p> : null
    }
    <div id="fullcalendar">
    <FullCalendar 
      plugins={[ dayGridPlugin , timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
      weekends={false}
      validRange={hide}
      businessHours= {{
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '08:00', 
        endTime: '18:00', 
      }}
      allDaySlot={false}
      slotMinTime="08:00:00"
      slotMaxTime="18:00:00"
      dateClick={handleClick}
      defaultTimedEventDuration='00:30'
      events={usedDates}
   
    />
    </div>

        <Modal.Footer>
          {
            clickAmount < 3 ? <Button disabled={true} id="general-btn">Go to checkout</Button> :
          <Link to="/checkout"><Button className="general-btn">Go to checkout</Button></Link>
          }
        </Modal.Footer>
   </>
  )
}