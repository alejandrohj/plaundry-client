import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL, PUBLIC_URL} from '../config'
import {Link,Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap'

import Navbar from './Navbar';
import UserOrdersCard from './UserOrdersCard';
import Loading from './Loading'
import OrderSort from './OrderSort';

export default function UserOrders(props) {

    const[Orders, setOrders] = useState(null)
    const[loggedInUser, setLogIn] = useState(props.loggedInUser);
    const [Redirecting, setRedirecting] = useState(false);
    const [filteredOrders, setFilter] = useState(null);

    useEffect(()=>{
        if(!loggedInUser){
            axios.get(`${API_URL}/user`, {withCredentials: true})
              .then((result) => {
                setLogIn(result.data)
                axios.get(`${API_URL}/orders`, {withCredentials: true})
                    .then((res)=>{
                        let myOrders = res.data.filter((orders)=>{
                            return orders.userId._id === result.data._id
                        })
                        setOrders(myOrders)
                        setFilter(myOrders)
                    })
                    .catch(() => {
                        setRedirecting(true)
                    })
              })
          }
        else{
          axios.get(`${API_URL}/orders`, {withCredentials: true})
            .then((res)=>{
                let myOrders = res.data.filter((orders)=>{
                    return orders.userId._id === loggedInUser._id
                })
                setOrders(myOrders)
                setFilter(myOrders)
            })
                  
        }    
    },[])

    const handleMessageChange = (e, id) =>{
        let OrdersClone = JSON.parse(JSON.stringify(Orders))
        axios.post(`${API_URL}/order/${id}/edit/message`, {message: e.currentTarget.value}, {withCredentials: true})
            .then((result) => {
                let OrdersMod = OrdersClone.map((elem)=>{
                    if(elem._id === id) elem.message = e.currentTarget.value
                    return elem
                })
                setOrders(OrdersMod)
            })
    }

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
        setFilter(Orders)
      } else {
        status.forEach((state) => {
          Orders.forEach((order) => {
            if (order.status === state) {
              newOrders.push(order)
            }
          })
        })
        setFilter(newOrders)
      }
    }

    if(Redirecting || props.toIntro){
        return (<Redirect to={'/sign-in'}/>)
    } 
    if(!Orders ||!filteredOrders){
        return <Loading />
    }
    return (
        <div style={{height: '110%'}}>
            <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
            <OrderSort sortPickUp={sortPickUp} sortDelivery={sortDelivery} handleFilter={handleFilter}/>
            <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
            <div className="user-orders-container" style={{height: '100%'}}>
                <Link style={{marginTop: '20px'}} to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}} alt="button"/> Back to the lists</Button></p></Link>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    {
                      filteredOrders.length === 0 ? <p style={{color: '#328CB6'}}>No orders</p> :
                      filteredOrders.map((order)=>{
                            return <UserOrdersCard order={order} onChangeMessage = {handleMessageChange}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
