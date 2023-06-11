import { memo } from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

function Promo({ onApplicateClick }) {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
         Привнеси сияние в свою жизнь с Милано
        </h1>
        <div className="promo__link" onClick={() => onApplicateClick()}>Записаться</div>
        <NavTab />
      </div>
    </section>
  )
}

export default memo(Promo);