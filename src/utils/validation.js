import React, { useCallback, useContext } from 'react';
import { FormMessageContext } from '../contexts/FormMessageContext';
export function useValidation() {
  const {handleResetFormMessage} = useContext(FormMessageContext);
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    handleResetFormMessage();
    const name = event.target.name;
    const value = event.target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetInputs = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetInputs };
}
