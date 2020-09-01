import React,{useState, useEffect} from 'react'
import Navbar from './Navbar';
import {Card, Button} from 'react-bootstrap'
import {Link,Redirect} from 'react-router-dom';
import {PUBLIC_URL} from '../config';

import AmountCart from './AmountCart';

export default function Cart(props) {
    const [OrderedLaundries, setOrderedLaundries] = useState(null);
    useEffect(() => {
        setOrderedLaundries(JSON.parse(localStorage.getItem('order')));
    }, [])

    
    if (!OrderedLaundries){
        return (<>
            <Navbar/>
            <div style={{marginTop: '15px'}}>
                <Link to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}}/> Back to the lists</Button></p></Link>
            </div>
            <p>The cart is empty</p>
            </>
        )

    }
    let ItemsSelected = OrderedLaundries.filter((elem)=>{
        return elem.quantity > 0
    })
    if(props.toIntro){
        return (<Redirect to={'/sign-in'}/>)
    } 
    return (
        <div>
        <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
        <div style={{marginLeft: '10px', marginTop:'15px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Link to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}}/> Back to the lists</Button></p></Link>
                <Link to={'/userDetails'}><p><Button className="general-btn"> Order now <img src={`${PUBLIC_URL}/next.png`} style={{height: '15px'}}/></Button></p></Link>
            </div>
            <AmountCart/>
            
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
