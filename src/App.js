import React, {useState, useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import {API_URL} from './config'
import axios from 'axios'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import AdminView from './components/AdminView';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import StartUp from './components/StartUp';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

function App() {

  const [laundryitems, setLaundryItems] = useState([]);
  const [loggedInUser, setLogIn] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/laundry`)
      .then((res) => {
        setLaundryItems(res.data)
      })
    if(!loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLogIn(result.data)
        })
    }
  }, [])

  const adminLogIn = true;
  const [toHome, setToHome] = useState(false);

  
  const handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
    axios.post(`${API_URL}/signup`, {username: username.value, email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        setTimeout(() => setToHome(true), 1000)
      })
  }

  const handleAdminSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/admin/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        // Redirect to /admin!
      })
  }

  const handleAdminLogOut = () => {
    console.log('worked')
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        setLogIn(null)
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
      })
  }

  const handleDeleteItem = (id) => {
    axios.delete(`${API_URL}/laundry/${id}/delete`,  {withCredentials: true})
      .then(() => {
        let filteredLaundryItems = laundryitems.filter((laundry) => {
          return laundry._id !== id;
        })
        setLaundryItems(filteredLaundryItems)
      })
  }

  const handleEditItem = (updatedLaundry) => {
 
    let newCategory;
    updatedLaundry.category.map((elem) => {
      if (elem.isChecked) {
        return newCategory = elem
      }
    })
    console.log(newCategory.name)
    axios.post(`${API_URL}/laundry/${updatedLaundry._id}/edit`, {
      name: updatedLaundry.name,
      description: updatedLaundry.description,
      price: updatedLaundry.price,
      category: newCategory.name,
    },  {withCredentials: true})
      .then(() => {
        let clonedLaundryItems = laundryitems.map((item) => {
          if (item._id === updatedLaundry._id) {
            item = updatedLaundry
          }
          return item;
        })
        setLaundryItems(clonedLaundryItems)
      })
  }

  const handleLogOut = () => {
    console.log('worked')
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        setLogIn(null)
      })
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartUp}/>
        <Route path="/sign-in" render={() => {
          return <SignIn onSignIn={handleSignIn} />
        }} />
        <Route path="/sign-up" render={() => {
          return <SignUp toHome={toHome} onSignUp={handleSignUp} />
        }} />
         <Route exact path="/admin" render={(routeProps) => {
          return <AdminView laundrylist={laundryitems} onCreate={handleCreateItem} onDelete={handleDeleteItem} onAdminLogOut={handleAdminLogOut} onEdit={handleEditItem} loggedInUser={loggedInUser} />
         }} />
        <Route path="/home" render ={() => {
          return <Home onLogOut={handleLogOut} laundryitems={laundryitems}/>
        }}/>
        <Route path="/admin/sign-in" render={() => {
          return <SignIn admin={adminLogIn} onAdminLogOut={handleAdminLogOut} onSignIn={handleAdminSignIn} loggedInUser={loggedInUser} />
        }} />
        <Route exact path="/admin/delivery" render={() => {
          return <OrderList loggedInUser={loggedInUser}/>
        }} />
        <Route path="/admin/delivery/:id/details" render={(routeProps) => {
          return <OrderDetails {...routeProps} loggedInUser={loggedInUser}/>
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
