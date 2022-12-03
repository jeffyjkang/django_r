import FormField from "./FormField";

export default function Form(props) {
  const { validationErrors, booking, updateField } = props;

  const inputFields = [
    { label: 'Name', name: 'name' },
    { label: 'Email Address', name: 'email_address' },
    { label: 'Street Address', name: 'street_address' },
    { label: 'City', name: 'city' }
  ]

  return (
    <form>
      <ul>
        {
          inputFields.map((inputField) => (
            <div key={inputField.name}>
              {
                validationErrors.includes(inputField.name) &&
                (
                  <li className='error'>{inputField.label}: {validationErrors[inputField.name]}</li>
                )
              }
            </div>
          ))
        }
      </ul>
      {
        inputFields.map((inputField) => (
          <FormField
            key={inputField.name}
            value={booking[inputField.name]}
            onUpdate={updateField}
            {...inputField}
          />
        ))
      }
    </form>
  )
}
