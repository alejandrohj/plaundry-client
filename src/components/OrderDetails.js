import React, {useState, useEffect} from 'react'
import {Button,Card,ListGroup} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config'
import AdminNav from './AdminNav'
import MapWithAMarker from './Map';
import Loading from './Loading'

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
    return (<Loading />)
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
      <div style={{background: 'linear-gradient(180deg, rgba(228,246,255,1) 30%, rgba(141,217,252,1) 100%)', height: '100%', paddingTop: '10px'}}>
        <Card style={{ minWidth: '20rem', margin: '10px 2rem', color: '#036C9C'}}>
            <Card.Body>
              <div>
              <h5>{userId.name.firstName}</h5>
              <h6>{userId.address.city}</h6>
              <hr/>
                {
                  status==='to pick up'? <p>Must be picked up the <b>{pickUp.slice(0,10)}</b> at <b>{pickUp.slice(11,16)}h</b></p>:
                  <p>Picked up the <b>{pickUp.slice(0,10)}</b> at <b>{pickUp.slice(11,16)}h</b></p>
                }
                {
                  status === 'to deliver'? <p>Must be delivered the <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>:
                  status === 'delivered'? <p>Delivered the <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>:
                  <p>Delivery day: <b>{delivery.slice(0,10)}</b> at <b>{delivery.slice(11,16)}h</b></p>
                }
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
              <ListGroup className="list-group-flush" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', flexWrap:'wrap'}}>
                {
                  orderItems.map((elem)=>{
                    return(<>
                      <ListGroup.Item style={{display: 'flex', alignItems: 'center', border: '1px solid', borderRadius: '10px', margin: '10px'}}>
                      <h6><b>x{elem.quantityOflaundries} {elem.laundry.name[0].toUpperCase() + elem.laundry.name.slice(1,elem.laundry.name.length)}</b></h6>
                      <img src={elem.laundry.image} style={{height:'100px', marginLeft: '20px', borderRadius: '10px'}}/>
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
