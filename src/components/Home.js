import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {API_URL} from '../config'
import {Redirect} from 'react-router-dom'

//#region Components
import Navbar from './Navbar';
import CategoryNavbar from './CategoryNavbar';
import LaundryCard from './LaundryCard';
//#endregion Components

export default function Home(props) {
    const [laundryitemsToDisplay, setLaundryItemsToDisplay] = useState([]);
    useEffect(() =>{
        axios.get(`${API_URL}/laundry/categories/clothing`)
            .then((res)=>{
                setLaundryItemsToDisplay(res.data)
            })
    },[])

    const handleCategorySelected = (category) =>{
        axios.get(`${API_URL}/laundry/categories/${category}`)
            .then((res)=>{
                setLaundryItemsToDisplay(res.data)
            })
    }
    const handleQuantityChange = (amount) =>{
        if(!this.props.loggedUser){
            return <Redirect to={'/sign-in'}/>
        }

    }
    if (!laundryitemsToDisplay){
        return <p>Loading ....</p>
    }
    return (
        <div>
            <Navbar onLogOut={props.onLogOut}/>
            <CategoryNavbar onCatSelect = {handleCategorySelected}/>
            <LaundryCard laundries ={laundryitemsToDisplay}/>
        </div>
    )
}
