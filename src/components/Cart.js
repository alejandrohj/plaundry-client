import React,{useState, useEffect,useRef} from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import {API_URL} from '../config'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';


import AmountCart from './AmountCart';
import LocationSearchInput from './AutomCompleteAdress'

export default function Cart(props) {
    const [OrderedLaundries, setOrderedLaundries] = useState(null);
    const [Adress, setAdress] = useState(null);
    const [Name, setName] = useState(null);
    useEffect(() => {
        setOrderedLaundries(JSON.parse(localStorage.getItem('order')));
        setAdress(JSON.parse(localStorage.getItem('adress')));
        setName(JSON.parse(localStorage.getItem('name')))
    }, [])
    if (!OrderedLaundries){
        return (<>
            <Navbar/>
            <Link to={'/home'}><p>Go Back to the lists</p></Link>
            <p>The cart is empty</p>
            </>
        )

    }
    let ItemsSelected = OrderedLaundries.filter((elem)=>{
        return elem.quantity > 0
    })
    const handleLocationSearch = (adress) =>{
        setAdress(adress)
    }
    const handleChangenName = (e)=>{
        localStorage.setItem('name',JSON.stringify(e.currentTarget.value))
        setName(e.currentTarget.value)
    }
    return (
        <div>
        <Navbar loggedInUser={props.loggedInUser}/>
        <div style={{marginLeft: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Link to={'/home'}><p>Go Back to the lists</p></Link>
                <Link to={'/checkout'}><p>Checkout</p></Link>
            </div>
            <AmountCart/>
            <LocationSearchInput handleLocationSearch = {handleLocationSearch}/>
            {
                Adress? (<>
                    <h6 style={{marginTop:'20px'}}>Your adress:</h6>
                    <p>{Adress[0].formatted_address}</p>
                    </>
                ):(<p></p>)
            }
            <hr/>
            <label>Full Name</label>
            <input onChange={handleChangenName} style={{width: '350px'}} type='text' defaultValue={Name} placeholder='Tipe your full name'/>
        </div>
        {
            ItemsSelected.map((elem,i)=>{
                return (
                <Card key = {'cart'+i} style={{display: 'flex', flexDirection: 'row'}}>
                    <Card.Body>
                        <Card.Title>x{elem.quantity}</Card.Title>
                        <Card.Title>{elem.name}</Card.Title>
                        <Card.Text>
                            {elem.description}
                        </Card.Text>
                        <Card.Text>
                                {elem.price * elem.quantity}€
                        </Card.Text>
                    </Card.Body>
                    <img src={elem.image} style={{height: '200px', width:'150px'}} alt='img'/>
                </Card>)
            })
        }
        </div>
    )
}
