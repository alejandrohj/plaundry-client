import React,{useState, useEffect} from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import {API_URL} from '../config'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default function Cart(props) {
    const [OrderedLaundries, setOrderedLaundries] = useState(null);
    useEffect(() => {
        setOrderedLaundries(JSON.parse(localStorage.getItem('order')));
    }, [])
    if (!OrderedLaundries){
        return <p>Loading ....</p>
    }
    let ItemsSelected = OrderedLaundries.filter((elem)=>{
        return elem.quantity > 0
    })
    return (
        <div>
        <Navbar/>
        <input type='text' name='adress' placeholder='TypeYour adress'/>
        {
            ItemsSelected.map((elem,i)=>{
                return (
                <Card>
                <img src={elem.image} style={{height: '200px', width:'150px'}} alt='img'/>
                    <Card.Body>
                        <Card.Title>{elem.name}</Card.Title>
                        <Card.Text>
                            {elem.description}
                        </Card.Text>
                        <Card.Text>
                                {elem.price}€
                        </Card.Text>
                        </Card.Body>
                </Card>)
            })
        }
        <Link to={'/home'}><p>Go Back to the lists</p></Link>
            
        </div>
    )
}
