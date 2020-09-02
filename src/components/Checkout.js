import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import {API_URL} from '../config';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function Checkout(props) {
  console.log(promise)
  const [toHome, setToHome] = useState(false);
  const [User, setUser] = useState(null);
  const [Redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/user`,{withCredentials: true})
        .then((res)=>{
          setUser(res.data);
        })
        .catch(() => {
          setRedirecting(true)
        })
  }, [])

  const handlePlaceOrder = () => {
    axios.post(`${API_URL}/order` , {
      userId: props.loggedInUser._id,
      order: JSON.parse(localStorage.getItem('order')),
      pickUp: JSON.parse(localStorage.getItem('dates'))[0],
      delivery: JSON.parse(localStorage.getItem('dates'))[1],
    }, {withCredentials: true})
      .then((result) => {
        localStorage.removeItem('order')
        //Update the User name and adress:
        let updatedAddress = {
          city: JSON.parse(localStorage.getItem('address')).city,
          coordinates: JSON.parse(localStorage.getItem('address')).coordinates
        }
        
        axios.post(`${API_URL}/user/${User._id}/edit`,{
          name: JSON.parse(localStorage.getItem('name')),
          address: updatedAddress
        },{withCredentials: true})
          .then((res)=>{
            setToHome(true);
            localStorage.removeItem('name')
          })
      })
  }
  
  if(Redirecting || props.toIntro){
    return (<Redirect to={'/sign-in'}/>)
  }
  if(!User){
      return <p>Loading...</p>
  }

  if (toHome) {
    return <Redirect to={'/home'} />
  }
  
  return (
    <>
        <Navbar loggedInUser={props.loggedInUser}/>
        <Elements stripe={promise}>
          <CheckoutForm onPlaceOrder={handlePlaceOrder}/>
        </Elements>

    </>
  )
}
