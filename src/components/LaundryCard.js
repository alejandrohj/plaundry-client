import React from 'react'
import {Card, Button} from 'react-bootstrap';

export default function LaundryCard(props) {
    return (
        <div>
            {
                props.laundries.map((elem,i) => {
                    return (
                        <Card key ={'laundry' +i} style={{ width: '340px',flexDirection:'row'}}>
                            <img /*class="rounded-circle cover"*/ src={elem.image} style={{height: '200px', width:'150px'}}/>
                            <Card.Body>
                                <Card.Title>{elem.name}</Card.Title>
                                <Card.Text>
                                    {elem.description}
                                </Card.Text>
                                <Card.Text>
                                    {elem.price}€
                                </Card.Text>
                                <div style={{display:'flex', justifyContent: 'center'}}>
                                    <Button variant="primary">+</Button>
                                    <input defaultValue='0' style={{width:'30px', margin:'auto 10px'}}></input>
                                    <Button variant="danger">-</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}
