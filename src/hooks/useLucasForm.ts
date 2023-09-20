import React, { useCallback } from 'react'


type inputTypes = string | number | boolean | (string | number[])
interface IForm {
  onSubmit: (values: object) => void
  schemaValidation?: Record<string, (value: any) => any>

  initialValues: Record<string, {
    type?: inputTypes
    value: any,
    touched?: boolean,
  }>
}


function useLucasForm({
  onSubmit,
  schemaValidation,
  initialValues
}: IForm) {
  const [values, setValues] = React.useState<Record<string, any>>(initialValues)
  const [generalError, setGeneralError] = React.useState<any>()
  const [errors, setErrors] = React.useState<Record<string, any>>({})
  const [onSubmitting, setOnSubmitting] = React.useState<boolean>(false)

  const validate = useCallback((values: any) => {

    const errors: any = {}

    if (!schemaValidation) {
      return errors
    }
    const data = Object.entries(schemaValidation)

    if (!data.every(([key]) => key in values)) {
      throw new Error('The key of the schema must be the same as the key of the values')
    }
    data.forEach(([key, fn]) => {
      const error = fn(values[key].value)
      if (error) {
        errors[key] = error
      }
    })

    return errors
  }, [schemaValidation])

  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any } }) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: {
        ...values[event.target.name],
        value: event.target.value,
      }
    }))
  }

  const handleBlur = useCallback((event: any) => {
    if (!!event.target) {
      setValues((values) => ({
        ...values,
        [event.target.name]: {
          ...values[event.target.name],
          touched: true,
        }
      }))
      setErrors(validate(values))
    }
  }, [validate, values])
  console.log(values)


  const handleReset = useCallback(() => {
    setValues(initialValues)

    setGeneralError(null)

    setOnSubmitting(false)

    setErrors({})

  }, [initialValues])

  const handleSubmit = useCallback(async (e: { preventDefault: any }) => {
    e.preventDefault()
    if (Object.keys(validate(values)).length > 0) {

      setErrors(validate(values))

      return
    }

    setOnSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000))

      await onSubmit(values)

      setOnSubmitting(false)

      handleReset()
    } catch (error: any) {
      setGeneralError(error.message)

      setOnSubmitting(false)

      console.error(error)
    }
  }, [handleReset, onSubmit, validate, values])


  return (
    {
      values,
      errors,
      handleChange,
      handleSubmit,
      handleReset,
      handleBlur,
      onSubmitting,
      generalError
    }
  )
}
export { useLucasForm }