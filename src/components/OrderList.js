import React, {useState, useEffect} from 'react'
import AdminNav from './AdminNav'
import OrderCard from './OrderCard'
import axios from 'axios'
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'
import Loading from './Loading'
import OrderSort from './OrderSort'

export default function OrderList(props) {

  const [orders, setOrders] = useState()
  const [Redirecting, setRedirecting] = useState(false);
  const [userLog, setNew] = useState(null);
  const [isDeliverer, setIsDeliverer] = useState(false);
  const [filteredOrders, setFilter] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/orders`,  {withCredentials: true})
      .then((result) => {
        setOrders(result.data)
        setFilter(result.data)
      })
    axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((result) => {
        if (result.data.type === 'deliverer' ||result.data.type === 'admin') {
          setIsDeliverer(true)
        }
        setNew(result.data)
      })
      .catch(() => {
        setRedirecting(true)
      })
  },[])

  const sortPickUp = () => {  
    let ordersClone = JSON.parse(JSON.stringify(filteredOrders))
    ordersClone.sort((a,b) => {
      return (a.pickUp < b.pickUp) ? -1 : ((a.pickUp > b.pickUp) ? 1 : 0);
    })
    setOrders(ordersClone)
  }

  const sortDelivery = () => {
    let ordersClone = JSON.parse(JSON.stringify(filteredOrders))
    ordersClone.sort((a,b) => {
      return (a.delivery < b.delivery) ? -1 : ((a.delivery > b.delivery) ? 1 : 0);
    })
    setOrders(ordersClone)
  }

  const handleFilter = () => {
    let status = [];
    const checkboxes = document.querySelectorAll('input[name="status"]:checked');
    checkboxes.forEach((checkbox) => {
      status.push(checkbox.value);
    })
  
    let newOrders = [];
   
    if (!status.length) {
      setFilter(orders)
    } else {
      status.forEach((state) => {
        orders.forEach((order) => {
          if (order.status === state) {
            newOrders.push(order)
          }
        })
      })
      setFilter(newOrders)
    }
  }

  if (Redirecting || props.toIntro) {
    return (<Redirect to='/' />)
  }

  if(!userLog || !orders ||!filteredOrders){
    return (<Loading />)
  } else if (userLog && !isDeliverer) {
    return (<Redirect to='/' />)
  }
  return (
    <div>
      <AdminNav loggedInUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>

      <OrderSort sortPickUp={sortPickUp} sortDelivery={sortDelivery} handleFilter={handleFilter}/>
      <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
      <div className="user-orders-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
          filteredOrders.length === 0 ? <p>No orders</p> :
          filteredOrders.map((order, i) => {
            return <OrderCard key={'orders'+i} order={order}/>
          })
        }
      </div> 
    </div>
  )
}
