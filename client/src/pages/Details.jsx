import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App"
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Details() {

  const navigate = useNavigate()

  const appContext = useContext(AppContext);

  const [details, setDetails] = useState(null)
  const [alreadyAddedToCard, setAlreadyAddedToCart] = useState(false)

  const addToCart = async () => {
    await appContext.setOrderItem(details)
    navigate('/checkout')
  }

  return (
    <div className='details'>
      <section className='details-content'>
        <header>
          <h2>
            <button
              className='addToWishlistButton'
              onClick={()=>appContext.toggleWishlist(details.id)}
            >
              {appContext.wishlist.includes(appContext.item.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
            {details.name}
          </h2>
        </header>
        <div>
          <img src={details.tumbnail_url} alt={details.name} />
          <p>Starts on: {details.start}</p>
          <p>Tour Length: {details.tour_length} days</p>
          <p>
            <span className='details-content-price-label'>Total Price:</span>
            &nbsp;${details.price}
          </p>
        </div>
        <div>{details.promo}</div>
      </section>
      <section className='details-reserve'>
        <button
          className='details-reserve-buy-button'
          onClick={addToCart}
        >
          {alreadyAddedToCard ? 'Already Reserved' : 'Reserve'}
        </button>
      </section>
    </div>
  )
}
