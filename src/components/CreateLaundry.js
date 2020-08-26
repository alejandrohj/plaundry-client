import React, {useState} from 'react';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';

export default function CreateLaundry(props) {

  const [showCreate, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <Button onClick={handleOpen} className="btn">Create a new item</Button>
      <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title >Create a new item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={props.onCreate} >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" placeholder="Enter description" />
            </Form.Group>
        
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" type="number" placeholder="Enter Price" />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" as="select">
                  <option>Bags</option>
                  <option>Bedding</option>
                  <option>Business</option>
                  <option>Clothing</option>
                  <option>Towels</option>
                </Form.Control>
              </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.File name="image" id="exampleFormControlFile1" label="Add an image" />
            </Form.Group>

            <Button style={{height: '50px'}} variant="primary" type="submit">
              Create Item
            </Button>
          </Form>

        </Modal.Body>
        
      </Modal>
    </div>
  )
}
