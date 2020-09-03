import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import './Calendar.css';
import axios from 'axios';
import {API_URL} from '../config';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function Calendar() {

  const [eventArr, setEventArr] = useState([]);
  let eventGuid = 0;
  const [pickedDates, setPickedDates] = useState([]);

  function createEventId() {
    return String(eventGuid++)
  }
  
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

    let pickUpDrag = document.getElementById('pickupDrag');
    let deliverDrag = document.getElementById('deliverDrag');
    new Draggable(pickUpDrag, {
      eventData: {
        title:'pick up',
        color: '#46C5FF',
        id: createEventId()
      } 
    })

    new Draggable(deliverDrag, {
      eventData: {
        title:'delivery',
        color: '#46C5FF',
        id: createEventId(), 
      }
    })

  }, [])
  
  let usedDates = pickedDates.map((date) => {
    return JSON.parse(JSON.stringify({
      title: 'Busy',
      start: date,
      color: '#ff8080',
      textColor: 'white',
      eventOverlap:false,
      editable:false,
    }))
  })

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
    <p style={{textAlign: 'center',color: '#036C9C', marginTop:'5px'}}>Drag the 'pick up' and 'delivery' buttons to the day and time you prefer. There has to be at least one day between pick up and delivery for us to be able to clean your clothes.</p>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {
        eventArr.length >= 1 ?  <p className="general-btn" style={{display: 'none'}} id="pickupDrag">Pick Up</p> :  <p className="general-btn" style={{width:'100px', borderRadius: '5px', color: 'white', textAlign: 'center', padding: '3px', margin: '5px'}} id="pickupDrag">Pick Up</p>
      }
      {
        eventArr.length >= 2 ?  <p className="general-btn" style={{display: 'none'}} id="deliverDrag">Delivery</p> :  <p className="general-btn" style={{width:'100px', borderRadius: '5px', color: 'white', textAlign: 'center', padding: '3px', margin: '5px'}} id="deliverDrag">Delivery</p>
      }
    </div>
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
      defaultTimedEventDuration='00:30'
      events={usedDates}
      editable={true}
      eventOverlap={false}
      droppable={true}
      longPressDelay='500'
      eventLongPressDelay='500'
      selectLongPressDelay='500'
      eventDurationEditable={false}
      drop={function(dropInfo) {
        let clonedEventArr = JSON.parse(JSON.stringify(eventArr))
        clonedEventArr.push(dropInfo.dateStr)
        setEventArr(clonedEventArr);
        localStorage.setItem('dates', JSON.stringify(clonedEventArr)) 
      }}
      eventAllow={function(dropInfo){   
        // Only let drop after a day
        
        if (eventArr[0]) {   
          let pickUpDate = new Date (eventArr[0]);
          pickUpDate.setDate(pickUpDate.getDate() + 1);
          return (pickUpDate.toISOString() >= dropInfo.startStr) ? false : true;
        } else if (!eventArr[0]){
          console.log('check')
          return true;
        } 
      }}

    />
    </div>

    <Modal.Footer>
      {
       eventArr.length < 2 ? <Button disabled={true} className="general-btn">Go to checkout</Button> : <Link to="/checkout"><Button className="general-btn">Go to checkout</Button></Link>
      }
      
    </Modal.Footer>
   </>
  )
}