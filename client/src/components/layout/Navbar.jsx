import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './layout.css';

export default function Navbar(props) {
  return (
    <nav className='nav'>
      <div className='nav-main'>
        <NavLink className='nav-link' to='/'>Explore our tours</NavLink>
      </div>
      <div className='nav-links'>
        <button className='nav-button'>Advertise your tour</button>
        <button className='nav-button'>Help</button>
        <Link className='cart' to='/checkout'>
          <FaShoppingCart />
          {props.item && props.item.name}
        </Link>
      </div>
    </nav>
  )
}
