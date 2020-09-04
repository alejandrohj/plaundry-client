import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {API_URL} from '../config'
import {Nav, Button} from 'react-bootstrap'
import {PUBLIC_URL} from '../config';
import {Link, Redirect} from 'react-router-dom';

//#region Components
import Navbar from './Navbar';
import CategoryNavbar from './CategoryNavbar';
import LaundryCard from './LaundryCard';
import AmountCart from './AmountCart';
import Loading from './Loading';
//#endregion Components

export default function Home(props) {
    const [laundryitems, setLaundryItems] = useState(null);
    const [filter, setFilter]  = useState('clothing');
    useEffect(() => {
        let OrderStorage = JSON.parse(localStorage.getItem('order'));
        if(!OrderStorage){
            axios.get(`${API_URL}/laundry`)
            .then((res)=>{
                setLaundryItems(res.data)
            })
        }
        else{
            setLaundryItems(OrderStorage)
        }
        
    }, [])
    const handleCategorySelected = (category) =>{
        setFilter(category)
    }
    const handleAmountChange = (change,id) =>{
        let cloneOfItems = JSON.parse(JSON.stringify(laundryitems));
        let ItemsModified = cloneOfItems.map((elem)=>{
            if(elem._id === id){
                change === 'more'? elem.quantity ++ : elem.quantity --;
                return elem
            }
            else{
                return elem
            }
        })
        setLaundryItems(ItemsModified)
        localStorage.setItem('order',JSON.stringify(ItemsModified))
        // let orderItems = localStorage.getItem('order')
        // let parseOrder = JSON.parse(orderItems)
        // console.log(parseOrder)
    }
    if (!laundryitems || !filter){
        return <Loading />
    }
    return (
      <>
        { 
          props.toIntro ? (<Redirect to='/'/> ):(<>
          <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
          <CategoryNavbar onCatSelect = {handleCategorySelected}/>
          <div className="admin-list-container">
            <LaundryCard onChangeAmount = {handleAmountChange} laundries ={laundryitems} filter={filter}/>
            <nav className="navbar fixed-bottom navbar-light bg-light">
              <AmountCart laundries ={laundryitems}/>
              <Nav.Item style={{marginLeft: '20px'}}>
                  <Link to={'/cart'}><Button className="general-btn"><img src={`${PUBLIC_URL}/cart-outline.png`} alt ='cartImage'/> Go to the cart</Button></Link>
              </Nav.Item>
            </nav>
          </div>
          </>)
        }
      </>
    )
}
