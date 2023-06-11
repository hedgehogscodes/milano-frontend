import { memo } from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="section-title">Услуги</h2>
      <h3 className="techs__title">Высококачественные услуги</h3>
      <p className="techs__text"> Услуги в четыре руки, сложные окрашивания, стрижки и укладки, макияж, косметология, коррекция фигуры, безупречный маникюр и уже легендарные «брови» — мы работаем для тех, кто ценит время, качество и комфорт. Мы работаем для вас! </p>
      <ul className="techs__items">
        <li className="techs__item">Стрижки</li>
        <li className="techs__item">Прически</li>
        <li className="techs__item">Окрашивание</li>
        <li className="techs__item">Ногтевой сервис</li>
        <li className="techs__item">Брови</li>
        <li className="techs__item">Визаж</li>
      </ul>
    </section>
  )
}

export default memo(Techs);
