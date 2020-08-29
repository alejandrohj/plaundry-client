import React from 'react';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../config';
import {InputGroup, FormControl,Button} from 'react-bootstrap';

export default function StartUp() {
    return (
      <div className="splash-body">
        <div className="splash" >
          <h1 >Welcome to</h1>
          <img style={{width: '280px'}} src={`${PUBLIC_URL}/white-logo.png`} alt="logo" />
        </div>
        <div className="check-text" >
          <p className="check-p">Check if our service is available in your area:</p>
          <FormControl
          placeholder="Postal Code"
          aria-label="Postal Code"
          aria-describedby="basic-addon2"
          />
          <Link to={'/home'}><Button style={{margin: '5px'}} variant="outline-secondary">Check</Button></Link>
        </div>
        <div className="splash-expl">
          <h3 className="expl-head" >How does it work?</h3>
          <h5 className="expl-head" >Plaundry does your laundry for you!</h5>
          <div style={{display:'flex', flexDirection:'column', flexWrap:'nowrap'}}>
            <div className="expl-container">
              <img src={`${PUBLIC_URL}/magnify.png`} style={{width: '40px'}} alt="search" />
              <p><strong>Find</strong> the items you need cleaned</p>
            </div>
            <div className="expl-container">
              <img style={{width: '40px'}} src={`${PUBLIC_URL}/calendar-month-outline.png`} alt="search" />
              <p><strong>Schedule</strong> pick up and delivery</p>
            </div>
            <div className="expl-container">
              <img style={{width: '40px'}} src={`${PUBLIC_URL}/credit-card-outline.png`} alt="search" />
              <p><strong>Pay</strong> and we take care of the rest</p>
            </div> 
            </div>
          </div>

          <div className="splash-footer"> 
            <Link to={'/admin/sign-in'}><p className="footer-text">Admin</p></Link>
          </div>
      </div>
    )
}
