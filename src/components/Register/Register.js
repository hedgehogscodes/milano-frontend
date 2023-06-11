import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';
import { useValidation } from '../../utils/validation';

function Register({ handleRegister }) {
  const { values, errors, isValid, handleChange } = useValidation();
  const { name: nameValue = '', email: emailValue = '', password: passValue = '' } = values;
  const { name: nameError = '', email: emailError = '', password: passError = '' } = errors;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(nameValue, emailValue, passValue);
  }

  return (
    <div className="sign">
      <div className="sign__logo-box">
        <Logo />
      </div>

      <Form title="Добро пожаловать!" buttonTitle="Зарегистрироваться" isValid={isValid} onSubmit={handleSubmit}>
        <label className="form__input-label">Имя
          <input className={`form__input ${nameError ? 'form__input_type_error' : '' }`} name='name' type="text" minLength="2" maxLength="30" value={nameValue} error={nameError} onChange={handleChange} pattern={'^[а-яА-Яa-zA-Z\\s\\-]+$'} required />
          <span id="name-error" className={nameError ? 'form__error_visible' : ''}>{nameError}</span>
        </label>

        <label className="form__input-label">E-mail
          <input className={`form__input ${emailError ? 'form__input_type_error' : '' }`} name='email' type="email" value={emailValue} onChange={handleChange} pattern={'.+@.+\\..+'} required />
          <span id="mail-error" className={emailError ? 'form__error_visible' : ''}>{emailError}</span>
        </label>
        
        <label className="form__input-label">Пароль
          <input className={`form__input ${passError ? 'form__input_type_error' : '' }`} name='password' type="password" minLength="8" value={passValue} onChange={handleChange} required />
          <span id="pass-error" className={passError ? 'form__error_visible' : ''}>{passError}</span>
        </label>
      </Form>

      <p className="sign__text">Уже зарегистрированы?&nbsp;
        <NavLink className="sign__link" to="/signin">Войти</NavLink>
      </p>
    </div>
  )
}

export default memo(Register);
