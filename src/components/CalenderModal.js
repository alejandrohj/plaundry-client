import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import Calendar from './Calendar';
import {Link} from 'react-router-dom'

export default function CalenderModal() {

  const [showCalender, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);


  return (
    <div>
      <div className="create-laundryitem-btn">
      <Button onClick={handleOpen} >Checkout</Button>
      </div>
      <Modal centered show={showCalender} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title >Choose a pick up and deliver date</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: '450px'}}>
        
          <Calendar />
         
        </Modal.Body>
        <Modal.Footer>
          <Link to="/checkout"><Button>Go to checkout</Button></Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
