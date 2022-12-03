import './checkout.css'
import { useValidation } from './utils/useValidation';

export default function FormField(props) {

  const [ErrorDisplay, validate] = useValidation();

  const {name, label, value, onUpdate} = props;

  const onChange = (e) => {
    validate(e);
    onUpdate(name, e.target.value)
  }

  return (
    <div className='formField'>
      <label>{label}</label>
      <br/>
      <input type='text' name={name} value={value} onChange={onChange} />
      <ErrorDisplay />
    </div>
  )
}
