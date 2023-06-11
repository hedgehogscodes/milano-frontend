import { memo, useContext, useEffect } from 'react';
import './Form.css';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { FormMessageContext } from '../../contexts/FormMessageContext';

function Form({ children, title, buttonTitle, isValid, onSubmit}) {
  const isLoading = useContext(IsLoadingContext);
  const {formMessage, handleResetFormMessage} = useContext(FormMessageContext);

  useEffect(() => {
    return () => handleResetFormMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">{title}</h1>
      {children}
      <span className={`form__message ${formMessage ? 'form__message_visible form__message_type_error' : ''}`}>{formMessage}</span>
      <button className={isValid && !isLoading ? 'form__btn' : 'form__btn_disabled'} type="submit" disabled={!isValid || isLoading}>{isLoading ? 'Подождите...' : buttonTitle}</button>
    </form>
  )
}

export default memo(Form);
