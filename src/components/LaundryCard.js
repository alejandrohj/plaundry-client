import React from 'react'
import {Card, Button} from 'react-bootstrap';

export default function LaundryCard(props) {
    let laundriesToDisplay = props.laundries.filter((elem)=>{
        return elem.category === props.filter
    })
    return (
        <div>
            {
                laundriesToDisplay.map((elem,i) => {
                    
                    return (
                        <Card key ={'laundry' +i} style={{ width: '340px',flexDirection:'row'}}>
                            <img /*class="rounded-circle cover"*/ src={elem.image} style={{height: '200px', width:'150px'}} alt='img'/>
                            <Card.Body>
                                <Card.Title>{elem.name}</Card.Title>
                                <Card.Text>
                                    {elem.description}
                                </Card.Text>
                                <Card.Text>
                                    {elem.price}€
                                </Card.Text>
                                <div style={{display:'flex', justifyContent: 'center'}}>
                                    <Button onClick={() =>props.onChangeAmount('more',elem._id)} variant="primary">+</Button>
                                    <input value={elem.quantity} style={{width:'30px', margin:'auto 10px'}}></input>
                                    {
                                      elem.quantity === 0 ? <Button disabled={true} onClick={() =>props.onChangeAmount('less',elem._id)} variant="danger">-</Button> : <Button onClick={() =>props.onChangeAmount('less',elem._id)} variant="danger">-</Button>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}
