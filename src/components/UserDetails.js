import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {API_URL,PUBLIC_URL} from '../config';
import {Redirect,Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {UserContext} from '../UserContext'

import LocationSearchInput from './AutomCompleteAdress';
import MapWithAMarker from './Map';
import CalenderModal from './CalenderModal';
import Navbar from './Navbar';

export default function UserDetails(props) {

    const userCtx = useContext(UserContext);
    const [Address, setAddress] = useState(null);
    const [Name, setName] = useState(null);
    const [User, setUser] = useState(userCtx);
    const [Redirecting, setRedirecting] = useState(false);
    

    useEffect(()=>{
        axios.get(`${API_URL}/user`,{withCredentials: true})
            .then((res)=>{
                setUser(res.data);
                if(localStorage.getItem('name')){
                    setName(JSON.parse(localStorage.getItem('name')))
                }
                else if(res.data.name){
                    setName(res.data.name);
                    localStorage.setItem('name', JSON.stringify(res.data.name));
                }
                if(JSON.parse(localStorage.getItem('address'))){
                    setAddress(JSON.parse(localStorage.getItem('address')))
                }
                else if(res.data.address){
                    setAddress(res.data.address)
                    localStorage.setItem('address', JSON.stringify(res.data.address))
                }
            })
            .catch(() => {
                setRedirecting(true)
            })
    }, [])
    if(Redirecting || props.toIntro){
        return (<Redirect to={'/sign-in'}/>)
    }
    if(!User){
        return <p>Loading...</p>
    }
    const handleLocationSearch = (address) =>{
        let fixedAddress = {city: address[0].formatted_address,coordinates: address[0].coordinates}
        localStorage.setItem('address',JSON.stringify(fixedAddress))
        setAddress(fixedAddress)
        window.location.reload(false)
    }
    const handleChangenName = (e)=>{
        let name = JSON.parse(localStorage.getItem('name'))
        if(name){
            name.firstName = e.currentTarget.value;
        }
        else{name = {firstName: e.currentTarget.value,lastName: ''}}
        console.log(name)
        localStorage.setItem('name',JSON.stringify(name))
        setName(name)
    }
    const handleChangenLastName = (e) =>{
        let name = JSON.parse(localStorage.getItem('name'))
        if(name){
            name.lastName = e.currentTarget.value;
        }
        else{name = {firstName: '',lastName: e.currentTarget.value}}
        localStorage.setItem('name',JSON.stringify(name))
        setName(name)
    }
    let deftAddress = Address? Address.city : 'Search Places...'
    let deftValName = Name? Name.firstName: '';
    let deftValLastName = Name? Name.lastName: '';
    return (
        <div>
            <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
            <div style={{marginLeft: '10px', marginTop: '15px'}}>
            <Link to={'/cart'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}}/> Back</Button></p></Link>
                <CalenderModal/>    
                <h6 style={{marginTop:'20px'}}>Your adress:</h6>
                <LocationSearchInput placeholder = {deftAddress} handleLocationSearch = {handleLocationSearch}/>
                {
                    Address? (<>
                        <MapWithAMarker
                            coordinates = {Address.coordinates}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                        </>
                    ):(<p></p>)
                }
                <hr/>
                <div style={{display:'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <div style={{display:'flex', flexDirection: 'column', margin: '10px 30px'}}>
                        <label>First Name</label>
                        <input onChange={handleChangenName} style={{width: '350px'}} type='text' defaultValue={deftValName} placeholder='Type your full name'/>
                    </div>
                    <div style={{display:'flex', flexDirection: 'column', margin: '10px 30px'}}>
                        <label>Last Name</label>
                        <input onChange={handleChangenLastName} style={{width: '350px'}} type='text' defaultValue={deftValLastName } placeholder='Type your full name'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
