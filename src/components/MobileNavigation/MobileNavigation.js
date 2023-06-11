import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import './MobileNavigation.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory} from 'react-router-dom';

function MobileNavigation({ onClose, onNotesClick }) {
  const handleClose = (evt) => onClose();
  const handleNotesClick = () => onNotesClick();
  const handleAll = () => {
    handleClose();
    handleNotesClick();
  }
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav-list">
        <li className="mobile-nav-item">
          <NavLink exact to="/" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Главная</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/profile" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Аккаунт</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/feed" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Лента</NavLink>
        </li>

        <li className="mobile-nav-item">
          <NavLink to="/saved-cards" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Сохраненное</NavLink>
        </li>

        {
          (currentUser.isMaster || currentUser.isAdmin) && 
          <li className="mobile-nav-item">
            { currentUser.isAdmin ? 
              <div className={`mobile-nav__link ${history.location.pathname === '/schedule' && "mobile-nav__link_active"} `} onClick={handleAll}>Расписание</div>
              : <NavLink to="/schedule" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Расписание</NavLink>
            }
          </li>
        }

        {
          (currentUser.isAdmin) && 
          <li className="mobile-nav-item">
            <NavLink to="/applications" className="mobile-nav__link" activeClassName="mobile-nav__link_active" onClick={handleClose}>Заявки на запись</NavLink>
          </li>
        }

        <li className="mobile-nav-item">
          <NavLink to="/settings" className="mobile-nav__link mobile-nav__link_type_gray-button" onClick={handleClose}>Настройки</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default memo(MobileNavigation);
