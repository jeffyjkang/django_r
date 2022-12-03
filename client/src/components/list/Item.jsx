import { Link } from "react-router-dom";
// import { FaHeart, FaRegHeart, FaMountain } from 'react-icons/fa';

export default function Item(props) {
  const {
    wishlist,
    toggleWishlist,
    item,
    route
  } = props;

  return (
    <div className='item'>
      <h3>
        <button
          className='addToWishlistButton'
          onClick={()=>toggleWishlist(item.id)}
        >
          {/* {wishlist.includes(item.id) ? <FaHeart /> : <FaRegHeart />} */}
        </button>
        <Link to={route}>{item.name}</Link>
      </h3>
      <img src={item.thumbnail_url} alt={item.name} />
      <p className='item-price'>
        ${item.price} USD total
      </p>
      <p>
        Difficulty Rating: {item.rating}&nbsp;
        <span className={`item-rating item-rating_${item.rating}`}>
          {/* <FaMountain />
          <FaMountain />
          <FaMountain /> */}
        </span>
      </p>
      <p>{item.promo}</p>
      <Link to={route}>Learn more!</Link>
    </div>
  )
}