import React, {useState} from 'react';
import {Form, Button, Row, Col, Card, Modal} from 'react-bootstrap';
import {API_URL} from '../config'
import axios from 'axios'

export default function AdminLaundryCard(props) {

  let categories = ['bags', 'bedding', 'business', 'clothing',  'towels'];

  const [laundryItem, setLaundryItem] = useState(props.item);
  const [err, setErr] = useState(false)
 
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
    if (e.currentTarget.value < 0) {
      setErr(true);
    } else {
      let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
      updatedLaundry.price = e.currentTarget.value;
      setLaundryItem(updatedLaundry)
      setErr(false);
    }
  }

  const handleCategoryChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));
    updatedLaundry.category = e.currentTarget.value;
    setLaundryItem(updatedLaundry)
  }

  const handleImageChange = (e) => {
    let updatedLaundry = JSON.parse(JSON.stringify(laundryItem));  
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);
    axios.post(`${API_URL}/upload`, uploadData)
      .then((response) => {
        updatedLaundry.image = response.data.image;
        setLaundryItem(updatedLaundry);
      })
  }

  const [showDelete, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <Card className="adminlaundrycard">
      <img src={laundryItem.image} style={{height: '80%', width:'30%', alignSelf:'center'}} alt="laundry-img" className="laundrycard-img"/>

      <Form className="laundrycard-form">

        <Form.Group >
          <Form.Label className="admin-card-title">Name</Form.Label>
          <Form.Control onChange={handleNameChange} name="name" type="text" value={laundryItem.name}></Form.Control>
        </Form.Group>

        <Form.Group >
          <Form.Label className="admin-card-title">Description</Form.Label>
          <Form.Control onChange={handleDescriptionChange} name="description" type="text" value={laundryItem.description}></Form.Control>
        </Form.Group>

        <Row >
          <Col>
          <Form.Group >
              <Form.Label className="admin-card-title">Price</Form.Label>
              <Form.Control onChange={handlePriceChange} name="price" type="number" min='0' max='50' step='0.01' value={laundryItem.price} />
              {
                err ? 'Price must be bigger than 0' : <></> 
              }
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="admin-card-title">Category</Form.Label>
            <Form.Control onChange={handleCategoryChange} name="category" as="select"  defaultValue={laundryItem.category}>

              {
                categories.map((elem, i) => {
                  return <option key={'cat' + i}  value={elem} >{elem}</option>
                })
              }

            </Form.Control>
          </Form.Group>
          </Col>
        </Row>

        <Form.Group >
        <Form.Label className="admin-card-title">Change image</Form.Label>
              <Form.File onChange={handleImageChange} name="image" id="exampleFormControlFile1" />
        </Form.Group>
          {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
          } 
        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
          <Button className="general-btn" onClick={() => props.onEdit(laundryItem)} style={{height: '40px',width: '40%', margin: '10px 20px'}} variant="primary">
            Save
          </Button>

          <Button onClick={handleOpen} variant="danger" style={{height: '40px',width: '40%', margin: '10px 20px'}}>Delete</Button>
        </div>
        <Modal centered show={showDelete} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title" style={{textAlign: 'center'}}>Are you sure you want to delete this item?</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button className="general-btn" onClick={handleClose} style={{height: '40px', width: '100px'}} variant="primary">No</Button>
            <Button onClick={() => {console.log('Deleting', laundryItem);props.onDelete(laundryItem._id); handleClose()}} style={{height: '40px', width: '100px'}} variant="danger">Yes</Button>
          </Modal.Body>
        </Modal>
       
      </Form>
    </Card>
  )
}
