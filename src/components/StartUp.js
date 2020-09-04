import React,{useState, useEffect, useRef} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {PUBLIC_URL,API_URL} from '../config';

import {FormControl,Button, Row,Col,Form,Modal} from 'react-bootstrap';
import axios from 'axios';

import Loading from './Loading';


export default function StartUp() {

    const [PostalCodes, setPostalCodes] = useState(null);
    const [IsAvailable, setIsAvailable] = useState(false);
    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const inputRef = useRef();
    const [errMessage, setErr] = useState(null);
    const [err, setErrStatus] = useState(false);

    useEffect(()=>{
      axios.get(`${API_URL}/availability`, {withCredentials: true})
        .then((result) => {
            setPostalCodes(result.data)
          })
          .catch((err) => {
          })
    },[])

    const handleCheckPC = () =>{
      let input =inputRef.current.value;
      if(!input) {
        setErr('Please enter your postal code')
        setErrStatus(true);
        return;
      }
      console.log(typeof input)
      PostalCodes.forEach((postalCode)=>{
        console.log(postalCode.Code, 'and',input , 'and', postalCode.available)
        if(postalCode.Code == input && postalCode.available == true) {
          console.log('match')
          setIsAvailable(true)
          setErrStatus(false)
        } 
      })
      setShow(true);
    }
    if(!PostalCodes) return <Loading/>
    return (
      <>
      <Modal centered show={showCreate} >
            <Modal.Header style={{display: 'flex', justifyContent: 'center'}}>
              <Modal.Title className="admin-card-title">Discover Plaundry</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: 'center'}}>
              {IsAvailable? (<p>Good news: our service is available in your location. You never have to do your own laundry again!</p>): 
              (<p>Sorry, our services are not available in your location. But you can still try our app.</p>)}
            <hr/>
            <Link to={'/home'}><Button className="general-btn">Go</Button></Link>
            </Modal.Body>
      </Modal>
      <div className="splash-body">
        <div className="splash" >
          <h1 className="splash-title">Welcome to</h1>
          <img style={{width: '280px'}} src={`${PUBLIC_URL}/white-logo.png`} alt="logo" />
        </div>
        <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        <div className="check-text" >
          <p style={{color: '#328CB6', fontWeight: '600', fontSize: '20px'}} className="check-p">Check if our service is available in your area:</p>
          {
            err ? <p style={{color: '#328CB6'}}>{errMessage}</p>: <></>
          }
          <Form className="check-text">
            <FormControl
            ref={inputRef}
            className="check-form"
            placeholder="Postal Code"
            aria-label="Postal Code"
            aria-describedby="basic-addon2"
            />
            <Button onClick={handleCheckPC} className="check-btn" variant="outline-secondary">Check</Button>
          </Form>
        </div>
        <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        <div className="splash-expl">
          <h3 className="expl-head" style={{color: '#036C9C', fontWeight:'600', fontSize: '25px'}}>How does it work?</h3>
          <h5 className="expl-head" style={{color: '#036C9C', fontWeight:'600'}}>Plaundry does your laundry for you!</h5>
          <div style={{display:'flex', flexDirection:'column', flexWrap:'nowrap'}}>
            <div className="expl-container">
              <img src={`${PUBLIC_URL}/magnify-blue.png`} style={{width: '40px'}} alt="search" />
              <p style={{color: '#036C9C', fontWeight:'600'}}><strong>Find</strong> the items you need cleaned</p>
            </div>
            <div className="expl-container">
              <img style={{width: '40px'}} src={`${PUBLIC_URL}/calendar-blue.png`} alt="search" />
              <p style={{color: '#036C9C', fontWeight:'600'}}><strong>Schedule</strong> pick up and delivery</p>
            </div>
            <div className="expl-container">
              <img style={{width: '40px'}} src={`${PUBLIC_URL}/creditcard-blue.png`} alt="search" />
              <p style={{color: '#036C9C', fontWeight:'600'}}><strong>Pay</strong> and we take care of the rest</p>
            </div> 
          </div>
        </div>
        <div className="splash-footer"> 
          <Row>
            <Col>
              <div style={{display: 'flex'}}>
                <Link to={'/admin/sign-in'}><p className="footer-text">Admin</p></Link>
                <Link to={'/deliverer/sign-in'}><p className="footer-text">Deliverer</p></Link>
              </div>
            </Col>
            <Col>
              <p className="footer-text" style={{textAlign: 'right'}}>Reach us by <a href="mailto:info@plaundry.com"><img style={{width: '20px'}} src={`${PUBLIC_URL}/email-outline.png`} alt="email" /></a></p>
            </Col>
          </Row>
        </div>
      </div>
      </>
    )
}
