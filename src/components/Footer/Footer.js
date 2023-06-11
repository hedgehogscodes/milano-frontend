import { memo } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title"></h3>
      <div className="footer__info">
        <p className="footer__copyright">&#169; 2023</p>
        <NavLink to="/reviews" className="footer__link">Отзывы</NavLink>
        <p className="footer__author">Milano х Heritage</p>
      </div>
    </footer>
  )
}

export default memo(Footer);
