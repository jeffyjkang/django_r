import { useEffect, useState } from "react"
import './checkout.css'
import { FaMinusCircle } from 'react-icons/fa';

export default function Summary(props) {
  const {duration, item, clearOrderItem } = props;

  const [remaining, setRemaining] = useState(duration)
  useEffect(() => {
    const _timer = setTimeout(() => {
      setRemaining(remaining-1)
    }, 1000)

    return function cleanup() {
      clearTimeout(_timer)
    }
  }, [])

  return (
    <>
      {
        remaining > 1 && (
          <div className='onHold'>
            Your tickets are on hold for the next {remaining} seconds.
          </div>
        )
      }
      <div>
        <button
          className='package-remove-button'
          onClick={()=>clearOrderItem(item.id)}
        >
          <FaMinusCircle />
        </button>
        {item.name} - ${item.price} starts on {item.start} for {item.tour_length} days.
      </div>
    </>
  )
}