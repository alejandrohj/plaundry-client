import React, {useState, useEffect} from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {API_URL} from '../config';
import { Button, Modal, Spinner} from 'react-bootstrap';
import './CheckoutForm.css'

export default function CheckoutForm(props) {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const [disableBtn, setBtn] = useState(false);

  const [showCreate, setShow] = useState(false);
  const handleOpen = () => setShow(true);

  useEffect(() => {
    window
      .fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: JSON.parse(localStorage.getItem('order'))})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    console.log(event)
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setBtn(true);
    }
  };

  const getTotal = (items) => {
    let total = items.reduce((acc, elem) => {
      return acc += elem.quantity * elem.price;
    }, 0)
    return total;
  }

  let total = getTotal(JSON.parse(localStorage.getItem('order')))

  return (
    <div id="stripeform">
      <form className="pay-form" id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p style={{margin: '5px'}} className={succeeded ? "result-message card-error" : "result-message card-error hidden"} >
          Payment succeeded!
        </p>
        <button className="payout-btn" 
          disabled={processing || disabled || succeeded}
          id="submit" onClick={handleOpen}
        >
            {processing ? (
              <Spinner animation="border" style={{color: 'white'}} />
            ) : (
              `Pay €${total}`
            )}
        </button>
      </form>

      <Modal centered show={showCreate} >

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Thank you for your order!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Button onClick={props.onPlaceOrder} className="general-btn">Go to homepage</Button>
        </Modal.Body>
        
      </Modal>
  
    </div>
  )
}
