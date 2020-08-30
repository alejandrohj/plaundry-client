import React from 'react';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../config';
import {FormControl,Button, Row,Col} from 'react-bootstrap';

export default function StartUp() {
    return (
      <div className="splash-body">
        <div className="splash" >
          <h1 >Welcome to</h1>
          <img style={{width: '280px'}} src={`${PUBLIC_URL}/white-logo.png`} alt="logo" />
        </div>
        <hr style={{border: '1px solid #328CB6', margin: '0px'}}></hr>
        <div className="check-text" >
          <p style={{color: '#328CB6', fontWeight: '600', fontSize: '20px'}} className="check-p">Check if our service is available in your area:</p>
          <FormControl 
          className="check-form"
          placeholder="Postal Code"
          aria-label="Postal Code"
          aria-describedby="basic-addon2"
          />
          <Link to={'/home'}><Button className="check-btn" variant="outline-secondary">Check</Button></Link>
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
              <Link to={'/admin/sign-in'}><p className="footer-text">Admin</p></Link>
            </Col>
            <Col>
              <p className="footer-text" style={{textAlign: 'right'}}>Reach us by <a href="tel://+1234567890"><img style={{width: '20px'}} src={`${PUBLIC_URL}/phone.png`} alt="phone" /></a> or <a href="mailto:info@plaundry.com"><img style={{width: '20px'}} src={`${PUBLIC_URL}/email-outline.png`} alt="email" /></a></p>
            </Col>
          </Row>
        </div>
      </div>
    )
}
