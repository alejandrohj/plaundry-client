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
                <Link to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}} alt="button"/> Back to the lists</Button></p></Link>
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
      <>
        <Navbar loggedInUser={props.loggedInUser} onLogOut = {props.onLogOut}/>
        <div style={{marginLeft: '10px', marginTop:'15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Link to={'/home'}><p><Button className="general-btn"><img src={`${PUBLIC_URL}/left-arrow.png`} style={{height: '15px'}}alt="button" /> Back to the lists</Button></p></Link>
            <Link to={'/userDetails'}><p><Button className="general-btn"> Order now <img src={`${PUBLIC_URL}/next.png`} style={{height: '15px'}} alt="button"/></Button></p></Link>
          </div>
        </div>
         <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        <div style={{background: "linear-gradient(180deg, rgba(228,246,255,1) 30%, rgba(141,217,252,1) 100%)", height: '100%'}}>
          <AmountCart />
          {
            ItemsSelected.map((elem,i)=>{
              return (
              <Card key = {'cart'+i} style={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
                <Card.Body>
                  <Card.Title>{elem.name}</Card.Title>
                  <Card.Text>Amount: {elem.quantity}</Card.Text>
                  <Card.Text>Total: €{elem.price * elem.quantity}</Card.Text>
                </Card.Body>
                <img src={elem.image} style={{height: '200px', width:'150px'}} alt='img'/>
              </Card>)
            })
          }
        </div>
      </>
    )
}
