import React, {useState, useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import {API_URL} from './config'
import axios from 'axios'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import AdminView from './components/AdminView';
import StartUp from './components/StartUp';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';



function App() {

  const [laundryitems, setLaundryItems] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/laundry`)
      .then((res) => {
        setLaundryItems(res.data)
      })
  }, [])

  const [loggedInUser, setLogIn] = useState(null);
  const adminLogIn = true;

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

  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartUp}/>
        <Route path="/sign-in" render={() => {
          return <SignIn onSignIn={handleSignIn} />
        }} />
        <Route path="/sign-up" render={() => {
          return <SignUp onSignUp={handleSignUp} />
        }} />
        <Route path="/home" render ={() => {
          return <Home laundryitems={laundryitems}/>
        }}/>
         <Route exact path="/admin" render={() => {
          return <AdminView />
        }} />
        <Route path="/admin/sign-in" render={() => {
          return <SignIn admin={adminLogIn} onSignIn={handleAdminSignIn} onAdminLogOut={handleAdminLogOut} />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
