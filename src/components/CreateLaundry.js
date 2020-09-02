import React, {useState} from 'react';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';


export default function CreateLaundry(props) {

  let categories = ['bags', 'bedding', 'business', 'clothing',  'towels']

  const [showCreate, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Create, edit and delete your laundryitems.</p>
      <div className="create-laundryitem-btn">
      <Button onClick={handleOpen} className="general-btn createbtn">Create a new item</Button>
      </div>
      <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Create a new item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={props.onCreate} >
            <Form.Group>
              <Form.Label className="admin-card-title">Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="admin-card-title">Description</Form.Label>
              <Form.Control name="description" type="text" placeholder="Enter description" />
            </Form.Group>
        
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="admin-card-title">Price</Form.Label>
                  <Form.Control name="price" min='0' max='50' step ='0.01' type="number" />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Category</Form.Label>
                <Form.Control name="category" as="select">
                  <option>Choose a category</option>
                  {
                    categories.map((elem, i) => {
                    return <option key={'category' + i} value={elem}>{elem}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label className="admin-card-title">Add an image</Form.Label>
              <Form.File name="image" id="exampleFormControlFile1" />
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            } 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
              Create Item
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
