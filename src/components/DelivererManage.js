import React, { useEffect, useState} from 'react'
import AdminNav from './AdminNav'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../config';
import CreateDeliverer from './CreateDeliverer';
import DelivererCard from './DelivererCard';
import Loading from './Loading'

export default function AdminView(props) {

  const [userLog, setNew] = useState(null);
  const [Redirecting, setRedirecting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [createSucces, setCreateSucces] = useState(false);
  const [deliverers, setDeliverers] = useState(null);
  const [errMessage, setErr] = useState(null);
  const [err, setErrStatus] = useState(false);
  
  useEffect(() => {
    axios.get(`${API_URL}/user`,{withCredentials: true})
        .then((result) => {
          if (result.data.type === 'admin') {
            setIsAdmin(true)
          }
          setNew(result.data)
        })
        .catch(() => {
          setRedirecting(true)
        })
    axios.get(`${API_URL}/deliverers`,{withCredentials: true})
        .then((res)=>{
            setDeliverers(res.data)
        })
  }, [])

  const handelCreateDeliverer = (e) =>{
    e.preventDefault();
    const {name, email, password} = e.currentTarget;
    axios.post(`${API_URL}/deliverer/create`, {username: name.value, email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setCreateSucces(true)
        let newDeliverer = result.data;
        let cloneDel = JSON.parse(JSON.stringify(deliverers))
        cloneDel.push(newDeliverer);
        setDeliverers(cloneDel);
        setErrStatus(true);
        let succes = 'Deliverer created!'
        setErr(succes);
      })
      .catch((err) => {
        setErrStatus(true);
        let error = err.response.data.error
        setErr(error);
      })
  }
  const handleRemoveDeliverer = (id) =>{
    axios.delete(`${API_URL}/deliverer/${id}/delete`,  {withCredentials: true})
      .then(() => {
        let filteredDel = deliverers.filter((del) => {
          return del._id !== id;
        })
        setDeliverers(filteredDel)
      })
  }

  const handleError = () => {
    setErrStatus(false);
  }

  if (Redirecting || props.toIntro) {
    return (<Redirect to='/admin/sign-in' />)
  }

  if(!userLog || !deliverers){
    return (<Loading />)
  } else if (userLog && !isAdmin) {
    return (<Redirect to='/' />)
  }
  if(props.toIntro){
    return (<Redirect to={'/'}/>)
  } 
  return (
    <>
        <AdminNav loggedInUser={props.loggedInUser} onAdminLogOut={props.onAdminLogOut}/>
        <CreateDeliverer onCreateDeliverer={handelCreateDeliverer} createSucces={createSucces} errorMessage={errMessage} err={err} handleError={handleError}/>
        <div style={{background: 'linear-gradient(180deg, rgba(228,246,255,1) 30%, rgba(141,217,252,1) 100%)', height: '100%'}}>
          <div style={{display:'flex', justifyContent: 'center', flexWrap:'wrap'}}>
              {
                  deliverers.map((deliverer)=>{
                      return <DelivererCard onDelete={handleRemoveDeliverer} deliverer={deliverer}/>
                  })
              }
          </div>
        </div>
    </>
  )
}
