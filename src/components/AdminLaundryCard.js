import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import {API_URL} from '../config'
import axios from 'axios'

export default function AdminLaundryCard(props) {

  const [laundryItem, setLaundryItem] = useState(props.item);

  useEffect(() => {
    axios.get(`${API_URL}/laundry/${laundryItem._id}`)
      .then((result) => {
          setLaundryItem(result.data)
      })
  }, [])

  const handleNameChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
    updatedLaundry.name = e.currentTarget.value;
    setLaundryItem(updatedLaundry)
  }

  const handleDescriptionChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
    updatedLaundry.description = e.currentTarget.value;
    setLaundryItem(updatedLaundry)
  }

  const handlePriceChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
    updatedLaundry.price = e.currentTarget.value;
    setLaundryItem(updatedLaundry)
  }

  const {name, description, price} = laundryItem;

  return (
    <Card>
      <Form className="laundrycard-form" >

      <div className="laundrycard-input" >
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleNameChange} name="name" type="text" value={name}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleDescriptionChange} name="description" type="text" value={description}></Form.Control>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control onChange={handlePriceChange} name="price" type="number" value={price}></Form.Control>
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

      <div className="btn-container-laundrycard">
        <Button onClick={() => props.onEdit(laundryItem)} style={{height: '50px'}} variant="primary">
          Save Changes
        </Button>
        <Button onClick={() => props.onDelete(laundryItem._id)} style={{height: '50px'}} variant="danger">
          Delete
        </Button>
      </div>
      </Form>
    </Card>
  )
}
