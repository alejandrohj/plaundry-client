import React, {useState, useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import {API_URL} from './config'
import axios from 'axios'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import AdminView from './components/AdminView';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

function App() {

  const [loggedInUser, setLogIn] = useState(null);
  const adminLogIn = true;

  const [laundryitems, setLaundryItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/laundry`)
      .then((res) => {
        setLaundryItems(res.data)
      })
  }, [])

  if(!loggedInUser){
    axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
      })
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        // Redirect!
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
    axios.post(`${API_URL}/signup`, {username: username.value, email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        // Redirect!
      })
  }

  const handleAdminSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/admin/signin`, {email: email.value, password: password.value})
      .then((result) => {
        setLogIn(result.data)
        // Redirect
      })
  }

  const handleAdminLogOut = () => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        setLogIn(null)
        // Redirect
      })
  }

  const handleCreateItem = (e) => {
    e.preventDefault();
    const {name, description, price, category, image} = e.currentTarget;
    axios.post(`${API_URL}/laundry/create`, {name: name.value, category: category.value.toLowerCase(), description: description.value, price: price.value}, {withCredentials: true})
      .then((result) => {
        let newItem = result.data;
        let cloneItems = JSON.parse(JSON.stringify(laundryitems))
        cloneItems.push(newItem)
        setLaundryItems(cloneItems)
        // Redirect
      })
  }

  const handleDeleteItem = (id) => {
    axios.delete(`${API_URL}/laundry/${id}/delete`)
      .then(() => {
        let filteredLaundryItems = laundryitems.filter((laundry) => {
          return laundry._id !== id;
        })
        setLaundryItems(filteredLaundryItems)
        // Redirect
      })
  }

  // If you edit twice after each other, gives an error (but does save the change)
  const handleEditItem = (updatedLaundry) => {
    axios.post(`${API_URL}/laundry/${updatedLaundry._id}/edit`, {
      name: updatedLaundry.name,
      description: updatedLaundry.description,
      price: updatedLaundry.price
    })
      .then(() => {
        let clonedLaundryItems = laundryitems.map((item) => {
          if (item._id === updatedLaundry._id) {
            item = updatedLaundry
          }
        })
        setLaundryItems(clonedLaundryItems)
        // Redirect
      })
  }

  return (
    <div>
      <Switch>
        <Route path="/sign-in" render={() => {
          return <SignIn onSignIn={handleSignIn} />
        }} />
        <Route path="/sign-up" render={() => {
          return <SignUp onSignUp={handleSignUp} />
        }} />
         <Route exact path="/admin" render={(routeProps) => {
          return <AdminView laundrylist={laundryitems} onCreate={handleCreateItem} onDelete={handleDeleteItem} onEdit={handleEditItem} />
        }} />
        <Route path="/admin/sign-in" render={() => {
          return <SignIn admin={adminLogIn} onSignIn={handleAdminSignIn} onAdminLogOut={handleAdminLogOut} />
        }} />
        <Route exact path="/admin/delivery" render={() => {
          return <OrderList />
        }} />
        <Route path="/admin/delivery/:id/details" render={(routeProps) => {
          return <OrderDetails {...routeProps}/>
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
