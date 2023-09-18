
import React, { useCallback } from 'react'
type inputTypes = string | number | boolean | (string | number[])
interface IForm {
  onSubmit: (values: object) => void
  schemaValidation?: (values: object) => object

  initialValues: Record<string, {
    type: inputTypes
    value: any,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
  }>
}

function useLucasForm({
  onSubmit,
  schemaValidation,
  initialValues
}: IForm) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues)
  // const [errors, setErrors] = React.useState<Record<string, any>>({})
  // const [touched, setTouched] = React.useState<Record<string, any>>({})
  const [onSubmitting, setOnSubmitting] = React.useState<boolean>(false)


  const handleSubmit = useCallback(async (e: { preventDefault: any }) => {
    debugger
    e.preventDefault()
    setOnSubmitting(true)
    await onSubmit(values)
  }, [onSubmit, values])
  // onchange event 

  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any } }) => {
    event.preventDefault()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }
  const handleReset = () => {
    setValues(initialValues)
  }
  return (
    { values, handleChange, handleSubmit, handleReset, onSubmitting }
  )
}
export { useLucasForm }