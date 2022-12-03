import { useState } from "react";
import '../checkout.css';

export function useValidation() {
  const [error, setError] = useState(null);

  const validate = (e) => {
    if (e.target.value.length === 0) {
      setError('Field cannot be empty')
    } else {
      setError(null);
    }
  }

  const ErrorDisplay = () => {
    return error && <div className='error'>{error}</div>
  }

  return [ErrorDisplay, validate]
}
