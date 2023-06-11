import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './DefaultNavigation.css';

function DefaultNavigation(){

  return (
    <ul className="header__items">
      <li>
        <NavLink to="/signup" className="header__link button">Регистрация</NavLink>
      </li>
      <li>
        <NavLink to="/signin"className="header__link header__link_type_green-button">Войти</NavLink>
      </li>
    </ul>
  )
}

export default memo(DefaultNavigation);
