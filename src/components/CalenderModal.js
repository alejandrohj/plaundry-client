import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import Calendar from './Calendar';
import {PUBLIC_URL} from '../config';

export default function CalenderModal() {

  const [showCalender, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);


  return (
    <>
      <div >
      <Button className="general-btn" onClick={handleOpen} >Book your appointment <img src={`${PUBLIC_URL}/next.png`} style={{height: '15px'}} alt="button"/></Button>
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
