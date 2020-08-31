import React, {useState, useEffect} from 'react'
import {Button,Card,ListGroup} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config'
import AdminNav from './AdminNav'
import MapWithAMarker from './Map';


export default function OrderDetails(props) {

  const [order, setOrder] = useState(null);
  let id = props.match.params.id

  useEffect(() => {
    axios.get(`${API_URL}/order/${id}`, {withCredentials: true})
      .then((result) => {
          setOrder(result.data)
      })
  }, [])

  const handleStatusChange = (orderStatus) => {
    if (orderStatus === 'to pick up') orderStatus = 'picked up';
    else if (orderStatus === 'picked up') orderStatus = 'washing';
    else if (orderStatus === 'washing') orderStatus = 'to deliver';
    else if (orderStatus === 'to deliver') orderStatus = 'delivered';

    axios.post(`${API_URL}/order/${id}/edit`, {status: orderStatus}, {withCredentials: true})
      .then((result) => {
        result.data.status = orderStatus
        setOrder(result.data)
      })
  }

  if (!order){
    return <p>Loading ....</p>
  }
  if(!props.loggedInUser) {
    return <Redirect to={'/admin/sign-in'} />
  }

  const {status, userId, orderItems} = order

  return (
    <div>
      <AdminNav />
      <Card style={{ minWidth: '20rem', margin:'40px'}}>
          <Card.Body>
            <div>
              <h5>{userId.name.firstName}</h5>
              <MapWithAMarker
                coordinates = {userId.address.coordinates}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              <h6>{userId.city}</h6>
              {
                status === 'delivered' ? (<Button className="general-btn" disabled={true}>{status}</Button>) :
                ( <Button className="general-btn" onClick={() => handleStatusChange(order.status)}>{status}</Button> )
              }
            </div>
            <hr/>
            <h5>Laundries:</h5>
            <hr/>
            <ListGroup className="list-group-flush">
              {
                orderItems.map((elem)=>{
                  return(<>
                    <ListGroup.Item>
                    <p><b>Laundry: {elem.laundry.name}</b></p><p><b>Quantity: {elem.quantityOflaundries}</b></p>
                    </ListGroup.Item>
                    <hr/>
                  </>
                  )
                })
              }
              </ListGroup>
          </Card.Body>
      </Card>
    </div>
  )
}
