import React, {useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';


export default function CreatePostalCode(props) {

  const [showCreate, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <p style={{textAlign: 'center', paddingTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Availability</p>
      <div className="create-laundryitem-btn">
      <Button onClick={handleOpen} className="general-btn createbtn">Create a new service region</Button>
      </div>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Create a new Postal Code</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={props.onCreatePostalCode} >
            <Form.Group>
              <Form.Label className="admin-card-title">Postal Code</Form.Label>
              <Form.Control name="postalCode" type="text" placeholder="Enter name" />
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            } 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
              Create
            </Button>
            {
              props.createSucces ? <Button className="general-btn" onClick={handleClose}>Back to list</Button>: <></>
            }
            </div>
          </Form>

        </Modal.Body>
        
      </Modal>
    </div>
  )
}

