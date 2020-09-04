import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../config';
import {Redirect} from 'react-router-dom'
import {FormCheck} from 'react-bootstrap'

import CreatePostalCode from './CreatePostalCode';
import AdminNav from './AdminNav'
import Loading from './Loading'

export default function AvailabilityManagement(props) {

    const [createSucces, setCreateSucces] = useState(false);
    const [PostalCodes, setPostalCodes] = useState(null);
    const [userLog, setNew] = useState(null);
    const [Redirecting, setRedirecting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errMessage, setErr] = useState(null);
    const [err, setErrStatus] = useState(false);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          if (result.data.type === 'admin') {
            setIsAdmin(true)
          }
          setNew(result.data)
        })
        .catch(() => {
          setRedirecting(true)
        })
        axios.get(`${API_URL}/availability`, {withCredentials: true})
        .then((result) => {
            setPostalCodes(result.data)
          })
          .catch((err) => {
          })
    },[])

    const handleCreatePostalCode =  (e) =>{
        e.preventDefault();
        axios.post(`${API_URL}/availability/create`, {Code: e.currentTarget.postalCode.value},  {withCredentials: true})
            .then((result) => {
                setCreateSucces(true)
                setErrStatus(true);
                let succes = 'Region added!'
                setErr(succes);
            })

    }

    const handleChangeAvailability = (e,id) =>{
        let postalCodesClone = JSON.parse(JSON.stringify(PostalCodes))
        console.log(e.currentTarget.checked)
        axios.post(`${API_URL}/availability/${id}/edit`, {available: e.currentTarget.checked},  {withCredentials: true})
            .then((result) => {
                let postalCodesCloneMod = postalCodesClone.map((elem)=>{
                    if(elem._id === id) elem.available = e.currentTarget.checked
                    return elem
                })
                setPostalCodes(postalCodesCloneMod)
            })
            .catch((err) => {
            })

    }

    if (Redirecting) {
        return (<Redirect to='/admin/sign-in' />)
      }
    
      if(!PostalCodes){
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
            <CreatePostalCode onCreatePostalCode={handleCreatePostalCode} createSucces={createSucces} err={err} errorMessage={errMessage}/>
            <div className="avail-list">
                {
                    PostalCodes.map((elem,i)=>{
                        return (<FormCheck key={'pc'+i}
                            style={{margin: '10px 20px'}}
                            label={elem.Code}
                            id={'pc'+i}
                            type="switch"
                            checked={elem.available}
                            onChange={(e)=>handleChangeAvailability(e,elem._id)}
                        />)
                    })
                }
            </div>
        </>
    )
}
