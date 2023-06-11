import { memo } from 'react';
import './Contacts.css'

function Contacts() {
  return (
    <section className="contacts" id="contacts">
      <h2 className="section-title">Контакты</h2>
      <ul className="contacts__list">
        <li className="contacts__item">
          <div className="contacts__row"><div className="geo-icon"></div> г. Орёл, Наугорское шоссе, д.88</div>
          <div className="contacts__row"><div className="telephone-icon"></div> 8 (4862) 78-11-28</div>
          <div className="contacts__row"><div className="mail-icon"></div> milano-beauty@mail.ru</div>
        </li>
        <li className="contacts__item">
          <h3 className="about-project__title">ЧАСЫ РАБОТЫ САЛОНА</h3>
          <div className="contacts__row"><div className="time-icon"></div> Ежедневно: 09:00 — 20:00</div>
        </li>
      </ul>
    </section>
  )
}

export default memo(Contacts);