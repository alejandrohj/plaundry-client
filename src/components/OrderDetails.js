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
  if(props.toIntro){
    return (<Redirect to={'/'}/>)
  } 
  const {status, userId, orderItems,pickUp, delivery} = order

  return (
    <>
      <AdminNav loggedInUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>
      <div style={{background: 'linear-gradient(180deg, rgba(228,246,255,1) 30%, rgba(141,217,252,1) 100%)'}}>
        <Card style={{ minWidth: '20rem', margin: '0rem 2rem'}}>
            <Card.Body>
              <div>
                {
                  status==='to pick up'? <p> Date: <b>{pickUp.slice(0,10)}</b></p> :
                  <p> Date: <b>{delivery.slice(0,10)}</b></p>
                }
                {
                  status==='to pick up'? <p> Pick up at : <b>{pickUp.slice(11,16)}</b></p> :
                  <p> Deliver at: <b>{delivery.slice(11,16)}</b></p>
                }
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
                      <p><b>Type: {elem.laundry.name}</b></p><p><b>Quantity: {elem.quantityOflaundries}</b></p>
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
    </>
  )
}
