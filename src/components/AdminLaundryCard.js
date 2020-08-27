import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Card, Modal} from 'react-bootstrap';
import {API_URL} from '../config'
import axios from 'axios'

export default function AdminLaundryCard(props) {

  let categories = ['bags', 'bedding', 'business', 'clothing',  'towels'];

  const [laundryItem, setLaundryItem] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/laundry/${props.item._id}`,  {withCredentials: true})
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

  const handleCategoryChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
    updatedLaundry.category = e.currentTarget.value;
    setLaundryItem(updatedLaundry)
  }

  const [showDelete, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  if (!laundryItem){
    return <p>Loading ....</p>
  }

  return (
    <Card>

      <Form className="laundrycard-form" >

      <div className="laundrycard-input" >
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleNameChange} name="name" type="text" value={laundryItem.name}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleDescriptionChange} name="description" type="text" value={laundryItem.description}></Form.Control>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control onChange={handlePriceChange} name="price" type="number" value={laundryItem.price}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control onChange={handleCategoryChange} name="category" as="select"  defaultValue={laundryItem.category}>

              {
                categories.map((elem, i) => {
                  return <option key={'cat' + i}  value={elem} >{elem}</option>
                })
              }

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

        <Button onClick={handleOpen} variant="danger">Delete</Button>
        <Modal centered show={showDelete} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Are you sure you want to delete this item?</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={handleClose} style={{height: '50px', width: '100px'}} variant="primary">No</Button>
            <Button onClick={() => props.onDelete(laundryItem._id)} style={{height: '50px', width: '100px'}} variant="danger">Yes, delete</Button>
          </Modal.Body>
        </Modal>
       
      </div>
      </Form>
    </Card>
  )
}
