import { memo } from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-promo">
      <ul className="navtab">
        <li>
          <a href="/#about-project" className="navtab__link">О нас</a>
        </li>
        <li>
          <a href="/#techs" className="navtab__link">Услуги</a>
        </li>
        <li>
          <a href="/#about-me" className="navtab__link">Наши работы</a>
        </li>
        <li>
          <a href="/#contacts" className="navtab__link">Контакты</a>
        </li>
      </ul>
    </nav>
  )
}

export default memo(NavTab);