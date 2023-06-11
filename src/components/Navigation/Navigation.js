import React, { memo } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({onMenuClick, onNotesClick}){
  const handleMenuClick = () => onMenuClick();
  const handleNotesClick = () => onNotesClick();
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <>
      <nav className="header__nav header__nav_hidden">
        <ul className="header__items">
          <li className="header__item">
            <NavLink to="/profile" className="header__link">Аккаунт</NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/feed" className="header__link">Лента</NavLink>
          </li>
          <li className="header__item">
            <NavLink to="/saved-cards"className="header__link">Сохраненное</NavLink>
          </li>
          {
           (currentUser.isMaster || currentUser.isAdmin) && 
            <li className="header__item">
              { currentUser.isAdmin ? 
                <div onClick={handleNotesClick} className="header__link">Расписание</div> 
                : <NavLink to="/schedule"className="header__link">Расписание</NavLink>
              }
            </li>
          }
          {
           (currentUser.isAdmin) && 
            <li className="header__item">
              <NavLink to="/applications"className="header__link">Заявки на запись</NavLink>
            </li>
          }
          <li className="header__item">
            <NavLink to="/settings" className="header__link header__link_type_gray-button">Настройки</NavLink>
          </li>
        </ul>
      </nav>

      <button className="header__button" type="button" onClick={handleMenuClick} />
    </>
  )
}

export default memo(Navigation);




