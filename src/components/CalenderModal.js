import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import Calendar from './Calendar';

export default function CalenderModal() {

  const [showCalender, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);


  return (
    <>
      <div className="create-laundryitem-btn">
      <Button className="general-btn" onClick={handleOpen} >Appointment</Button>
      </div>
      <Modal centered show={showCalender} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Choose a pick up and delivery date</Modal.Title>
        </Modal.Header>
        
         <Calendar />
         
      </Modal>
    </>
  )
}
