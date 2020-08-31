import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL,PUBLIC_URL} from '../config';
import {Redirect,Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import LocationSearchInput from './AutomCompleteAdress';
import MapWithAMarker from './Map';
import CalenderModal from './CalenderModal';
import Navbar from './Navbar';

export default function UserDetails(props) {
    
    const [Address, setAddress] = useState(null);
    const [Name, setName] = useState(null);
    const [User, setUser] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`,{withCredentials: true})
            .then((res)=>{
                setUser(res.data);
                
                if(res.data.name){
                    setName(res.data.name);
                    localStorage.setItem('name', JSON.stringify(res.data.name));
                }
                else if(localStorage.getItem('name')){
                    setName(JSON.parse(localStorage.getItem('name')))
                }
                if(JSON.parse(localStorage.getItem('address'))){
                    setAddress(JSON.parse(localStorage.getItem('address')))
                }
                else if(res.data.address){
                    setAddress(res.data.address)
                    localStorage.setItem('address', JSON.stringify(res.data.address))
                }
                
            })
    },[])

    // if(!props.loggedInUser){
    //     return <Redirect to={'/sign-in'} />
    // }

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
    let deftAddress = JSON.parse(localStorage.getItem('address'))?JSON.parse(localStorage.getItem('address')).city: 'Search Places...'
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
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        <label>First Name</label>
                        <input onChange={handleChangenName} style={{width: '350px'}} type='text' defaultValue={deftValName} placeholder='Tipe your full name'/>
                    </div>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        <label>Last Name</label>
                        <input onChange={handleChangenLastName} style={{width: '350px'}} type='text' defaultValue={deftValLastName } placeholder='Tipe your full name'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
