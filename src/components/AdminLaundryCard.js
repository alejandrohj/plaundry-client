import React from 'react';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';

export default function AdminLaundryCard(props) {

  const {name, description, price, image, category} = props.item;

  return (
    <Card>
      <Form style={{display: 'flex'}}>

      <div style={{width: '70%', margin: '10px'}}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" defaultValue={name}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" type="text" defaultValue={description}></Form.Control>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" defaultValue={price}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            {/* To Do: auto-select the right value here */}
            <Form.Control name="category" as="select">
              <option>Bags</option>
              <option>Bedding</option>
              <option>Business</option>
              <option>Clothing</option>
              <option>Towels</option>
            </Form.Control>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group>
            <Form.File name="image" id="exampleFormControlFile1" label="Add an image" />
          </Form.Group>
          </Col>
        </Row>
      </div>

      <div style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Button style={{height: '50px'}} variant="primary">
          Save Changes
        </Button>
        <Button onClick={props.onDelete} style={{height: '50px'}} variant="danger">
          Delete
        </Button>
      </div>
      </Form>
    </Card>
  )
}
