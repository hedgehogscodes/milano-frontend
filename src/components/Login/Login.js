import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Login.css';
import { useValidation } from '../../utils/validation';

function Login({ handleLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailValue, passValue);
  }

  const { values, errors, isValid, handleChange } = useValidation();
  const { email: emailValue = '', password: passValue = '' } = values;
  const { email: emailError = '', password: passError = '' } = errors;

  return (
    <div className="sign">
      <div className="sign__logo-box">
        <Logo />
      </div>

      <Form title="Рады видеть!" buttonTitle="Войти" isValid={isValid} onSubmit={handleSubmit}>

        <label className="form__input-label">E-mail
          <input className={`form__input ${emailError ? 'form__input_type_error' : '' }`} name='email' type="email" value={emailValue} onChange={handleChange} pattern={'.+@.+\\..+'} required />
          <span id="mail-error" className={emailError ? 'form__error_visible' : ''}>{emailError}</span>
        </label>
        
        <label className="form__input-label">Пароль
          <input className={`form__input ${passError ? 'form__input_type_error' : '' }`} name='password' type="password" minLength="8" value={passValue} onChange={handleChange} required />
          <span id="pass-error" className={passError ? 'form__error_visible' : ''}>{passError}</span>
        </label>

      </Form>

      <p className="sign__text">Ещё не зарегистрированы?&nbsp;
        <NavLink className="sign__link" to="/signup">Регистрация</NavLink>
      </p>
    </div>
  )
}

export default memo(Login);
