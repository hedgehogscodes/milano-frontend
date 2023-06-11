import { memo, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormMessageContext } from '../../contexts/FormMessageContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { useValidation } from '../../utils/validation';
import { successMessage } from "../../utils/utils";
import './Settings.css';

function Settings({ signOut, onSubmit }) {
  const userData = useContext(CurrentUserContext);
  const isLoading = useContext(IsLoadingContext);
  const {formMessage, handleResetFormMessage} = useContext(FormMessageContext);

  const { values, errors, isValid, handleChange } = useValidation();
  const { pass: passValue = 'Введите новый пароль', email: emailValue = userData.email } = values;
  const { pass: passError = '', email: emailError = '' } = errors;

  const handleChangeUserData = (evt) => {
    evt.preventDefault();

    onSubmit(passValue, emailValue);
  };

  useEffect(() => {
    return () => handleResetFormMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="settings">
      <h1 className="settings__salutation">{`Привет, ${userData.name}!`}</h1>

      <form className="settings-form" onSubmit={handleChangeUserData}>
        <div className='form-container'>
          <label className="settings-form__label">E-mail
            <input className= {`settings-form__input ${emailError ? 'form__input_type_error' : '' }`} type="email" name="email" id="email" pattern={'.+@.+\\..+'} value={emailValue} onChange={handleChange}/>
          </label>
          <span className={`from__email-error ${emailError ? 'form__error_visible' : '' }`}>{emailError}</span>
        </div>
        <div className='form-container'>
          <label className="settings-form__label">Пароль
            <input className= {`settings-form__input ${passError ? 'form__input_type_error' : '' }`}  type="text" name="pass" id="pass" minLength={8} maxLength={30} required={true} value={passValue} onChange={handleChange}/>
          </label>
          <span className={`from__pass-error ${passError ? 'form__error_visible' : '' }`}>{passError}</span>
        </div>
        <span className={`form__message ${formMessage && formMessage!==successMessage.successMessage ? 'form__message_visible form__message_type_error' : 'form__message_visible'}`}>{formMessage}</span>
        <button className={`${isValid && (passValue!=='Введите новый пароль' || emailValue!==userData.email) && !isLoading ? 'settings-form__btn' : 'settings-form__btn_disabled'}`} type="submit" disabled={!isValid || isLoading || (!(passValue!=='Введите новый пароль' || emailValue!==userData.email))}>{isLoading ? 'Подождите...' : 'Редактировать'}</button>
      </form>

      <button className="settings__exit" onClick={signOut}>Выйти из аккаунта</button>
    </main>
  )
}

export default memo(Settings);
