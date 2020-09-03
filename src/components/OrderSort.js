import React from 'react'
import {Dropdown, Form, Button} from 'react-bootstrap'
import './SortBar.css'

export default function OrderSort(props) {

  return (
    <div className="sortbar">
      <Dropdown className="dropdowner" >
        <Dropdown.Toggle id="dropdown-basic" className="general-btn">
          Sort by date
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={props.sortPickUp}>Pick up</Dropdown.Item>
          <Dropdown.Item onClick={props.sortDelivery}>Delivery</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="filter" >
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check name="status" value="to pick up" inline label="to pick up" type={type} id={`inline-${type}-1`} />
            <Form.Check inline name="status" value="picked up"  label="picked up" type={type} id={`inline-${type}-2`} />
            <Form.Check inline  name="status" value="washing" label="washing" type={type} id={`inline-${type}-2`} />
            <Form.Check inline name="status" value="to deliver" label="to deliver" type={type} id={`inline-${type}-2`} />
            <Form.Check inline name="status" value="delivered" label="delivered" type={type} id={`inline-${type}-2`} />
          </div>
        ))}
        <div style={{display: 'flex', justifyContent:'center'}}>
          <Button style={{marginTop: '0px', width: '100px'}} className="general-btn" onClick={props.handleFilter}>Filter</Button>
        </div>
      </div>
    
  </div>
  )
}
