import React, {useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';


export default function CreateDeliverer(props) {

  const [showCreate, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <p style={{textAlign: 'center', paddingTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Deliverers Management view</p>
      <div className="create-laundryitem-btn">
      <Button onClick={handleOpen} className="general-btn createbtn">Create a new deliverer</Button>
      </div>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Create a new deliverer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate onSubmit={props.onCreateDeliverer} >
            <Form.Group>
              <Form.Label className="admin-card-title">Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
              <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Email address</Form.Label>
              <Form.Control  name="email" type="email" placeholder="Enter email" />
            </Form.Group>
        
            <Form.Group style={{width:'50%'}} controlId="formBasicPassword">
              <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
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

