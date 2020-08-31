import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import {API_URL} from '../config';

const promise = loadStripe("pk_test_51HJbtACi0BSLj9s1UdXp5qb0IsxDhy7Pv5kqZgz5tYo0eaDGmNpB8ynh5wP794fU4mOxJIiVniJ4fMMdqgwWoKky005wtL6m2C")

export default function Checkout(props) {

  const [toHome, setToHome] = useState(false);
  const [dates, setDates] = useState(null)

  useEffect(() => {
    setDates(localStorage.getItem('dates'))
  }, [])

  console.log(dates)
  //["2020-08-24T08:00:00+02:00","2020-08-26T10:00:00+02:00"]
  // Change this to normal dates and show on page
  // Store seperate string in db

  const handlePlaceOrder = () => {
    axios.post(`${API_URL}/order` , {
      userId: props.loggedInUser._id,
      order: JSON.parse(localStorage.getItem('order')),
      // pickUp: ,
      // delivery: 
    }, {withCredentials: true})
      .then((result) => {
        localStorage.removeItem('order')
        //Update the User name and adress:
        let updatedAddress = {
          city: JSON.parse(localStorage.getItem('address'))[0].formatted_address,
          coordinates: JSON.parse(localStorage.getItem('address'))[0].coordinates
        }
        axios.post(`${API_URL}/user/${props.loggedInUser._id}/edit`,{
          firstName: JSON.parse(localStorage.getItem('name')),
          address: updatedAddress
        },{withCredentials: true})
          .then((res)=>{
            setToHome(true);
          })
      })
  }
  
  if (!props.loggedInUser) {
    return <Redirect to={'/sign-in'} />
  }

  if (toHome) {
    return <Redirect to={'/home'} />
  }

  const getTotal = (items) => {
    let total = items.reduce((acc, elem) => {
      return acc += elem.quantity * elem.price;
    }, 0)
    return total;
  }

  let total = getTotal(JSON.parse(localStorage.getItem('order')))
  
  return (
    <div>
        <Navbar loggedInUser={props.loggedInUser}/>
        {/* Show name & address. */}

        <p>Total: €{total}</p>

        <Elements stripe={promise}>
          <CheckoutForm onPlaceOrder={handlePlaceOrder}/>
        </Elements>

    </div>
  )
}
