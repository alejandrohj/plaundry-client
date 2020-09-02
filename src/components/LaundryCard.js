import React from 'react'
import {Card, Button} from 'react-bootstrap';

export default function LaundryCard(props) {
    let laundriesToDisplay = props.laundries.filter((elem)=>{
        return elem.category === props.filter
    })
    return (
      <div className='LaundriesList'>
        {
          laundriesToDisplay.map((elem,i) => {  
            return (
              <Card className='LaundryCard' key ={'laundry' +i} style={{ width: '340px',flexDirection:'row'}}>
                <img /*class="rounded-circle cover"*/ src={elem.image} style={{height: '200px', width:'150px'}} alt='img'/>
                <Card.Body>
                  <Card.Title>{elem.name}</Card.Title>
                  <Card.Text>
                      {elem.description}
                  </Card.Text>
                  <Card.Text>
                      {elem.price}€
                  </Card.Text>
                  <div className='addOrRemove' style={{display:'flex', justifyContent: 'center'}}>
                    { 
                      elem.quantity===0 ? <Button disabled={true} className='lbtn' onClick={() =>props.onChangeAmount('less',elem._id)} variant="danger">-</Button> : 
                      <Button className='lbtn' onClick={() =>props.onChangeAmount('less',elem._id)} variant="danger">-</Button>
                    }
                    <label style={{border: 'none'}}>{elem.quantity}</label>
                    <Button className="general-btn lbtn" onClick={() =>props.onChangeAmount('more',elem._id)} >+</Button>
                  </div>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
    )
}
