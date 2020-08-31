import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '../config';
import {Redirect,Link} from 'react-router-dom';

import LocationSearchInput from './AutomCompleteAdress';
import MapWithAMarker from './Map';
import CalenderModal from './CalenderModal';
import Navbar from './Navbar';

export default function UserDetails(props) {
    
    const [Adress, setAdress] = useState(null);
    const [Name, setName] = useState(null);
    const [User, setUser] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`,{withCredentials: true})
            .then((res)=>{
                console.log(res.data)
                setUser(res.data);
                setName(res.data.username);
                localStorage.setItem('name', JSON.stringify(res.data.username))
                
                if(res.data.address){
                    setAdress(res.data.address)
                    localStorage.setItem('address', JSON.stringify(res.data.address))
                }
                else if(JSON.parse(localStorage.getItem('address'))){
                    setAdress(JSON.parse(localStorage.getItem('address')))
                }
            })
    },[])

    // if(!props.loggedInUser){
    //     return <Redirect to={'/sign-in'} />
    // }

    const handleLocationSearch = (address) =>{
        localStorage.setItem('address',JSON.stringify(address))
        setAdress(address)
    }
    const handleChangenName = (e)=>{
        localStorage.setItem('name',JSON.stringify(e.currentTarget.value))
        setName(e.currentTarget.value)
    }
    let deftAddress = JSON.parse(localStorage.getItem('address'))?JSON.parse(localStorage.getItem('address')).city: 'Search Places...'

    return (
        <div>
            <Navbar loggedInUser={props.loggedInUser}/>
            <div style={{marginLeft: '10px'}}>
                <Link to={'/cart'}><p>Check cart again</p></Link>
                <CalenderModal />
                <h6 style={{marginTop:'20px'}}>Your adress:</h6>
                <LocationSearchInput placeholder = {deftAddress} handleLocationSearch = {handleLocationSearch}/>
                {
                    Adress? (<>
                        <MapWithAMarker
                            coordinates = {Adress.coordinates}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                        </>
                    ):(<p></p>)
                }
                <hr/>
                <label>Full Name</label>
                <input onChange={handleChangenName} style={{width: '350px'}} type='text' defaultValue={Name} placeholder='Tipe your full name'/>
            </div>
        </div>
    )
}
