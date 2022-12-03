import { useContext, useState } from "react";
import { AppContext } from "../App";
import Summary from "../components/checkout/Summary";

export function Checkout() {

  const { booking, item, updateField, clearOrderItem, placeOrder} = useContext(AppContext);

  const [validationErrors, setValidationErrors] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrderEffects = () => {
    (async () => {
      try {
        await placeOrder()
        setOrderPlaced(true)
        setValidationErrors([])
      }
      catch (valErr) {
        setOrderPlaced(false)
        setValidationErrors(valErr)
      }
    })()
  }

  return (
    <>
      {
        orderPlaced ?
        (
          <div className='checkout'>
            <header className='checkout-header'>
              <h2>Checkout</h2>
              <h3>Thanks for buying an excursion with Explore California!</h3>
            </header>
          </div>
        )
        :
        (
          <div className='checkout'>
            <header className='checkout-header'>
              <h2>Checkout</h2>
            </header>
            <section className='checkout-summary'>
              {item && <Summary duration={59} item={item} clearOrderItem={clearOrderItem}/>}
            </section>
            <section className='checkout-form'>
              <form>
                {/* {TODO: make form} */}
              </form>
            </section>
            <section className='checkout-actions-section'>
              <div className='checkout-actions'>
                <button
                  disabled={orderPlaced || !item}
                  onClick={placeOrderEffects}
                >
                  Place order
                </button>
              </div>
            </section>
          </div>
        )
      }
    </>
  )
}
