import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import Calendar from './Calendar';
import {Link} from 'react-router-dom'

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
          <Modal.Title >Choose a pick up and deliver date</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        
         <Calendar />
         
        </Modal.Body>
        <Modal.Footer>
          <Link to="/checkout"><Button className="general-btn">Go to checkout</Button></Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}
