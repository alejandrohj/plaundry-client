import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'
import Loading from './Loading'

export default function OrderList(props) {

  const [orders, setOrders] = useState()
  const [Redirecting, setRedirecting] = useState(false);
  const [userLog, setNew] = useState(props.loggedInUser);
  const [isDeliverer, setIsDeliverer] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((result) => {
        console.log('dataorders',result.data)
        setOrders(result.data)
      })
    axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((result) => {
        if (result.data.type === 'deliverer') {
          setIsDeliverer(true)
        }
        setNew(result.data)
      })
      .catch(() => {
        setRedirecting(true)
      })
  },[])

  if (Redirecting || props.toIntro) {
    return (<Redirect to='/' />)
  }

  if(!userLog){
    return (<Loading />)
  } else if (userLog && !isDeliverer) {
    return (<Redirect to='/' />)
  }
  return (
    <div className="orderlist-admin">
        <AdminNav loggedInUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>

      {
        orders.map((order, i) => {
          console.log(order)
          return <OrderCard key={'orders'+i} order={order}/>
        })
      }
    </div> 
  )
}
