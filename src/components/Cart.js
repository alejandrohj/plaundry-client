import React,{useState, useEffect, useRef} from 'react'
import Navbar from './Navbar';
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

import AmountCart from './AmountCart';

export default function Cart(props) {
    const [OrderedLaundries, setOrderedLaundries] = useState(null);

    useEffect(() => {
        setOrderedLaundries(JSON.parse(localStorage.getItem('order')));
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
   

    return (
        <div>
        <Navbar loggedInUser={props.loggedInUser}/>
        <div style={{marginLeft: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Link to={'/home'}><p>Go Back to the lists</p></Link>
                <Link to={'/userDetails'}><p>Order It!</p></Link>
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
