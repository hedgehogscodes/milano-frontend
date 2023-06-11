import { memo } from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="section-title">О Нас</h2>
      <ul className="about-project__list">
        <li className="about-project__item">
          <h3 className="about-project__title">«Милано» — концептуальный салон красоты в Орле.</h3>
          <p className="about-project__text">Дипломированные мастера, современная техника, органическая продукция, лучшие локации, стильный интерьер — здесь все создано для вашего удобства и комфортного отдыха.</p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__title">Идеология салона красоты «Милано»</h3>
          <p className="about-project__text">Стремление подчеркнуть натуральную красоту, сохранить естественность и динамичность образа, «подсветить» вашу красоту, а не переделать ее в угоду модным трендам.</p>
        </li>
      </ul>
    </section>
  )
}

export default memo(AboutProject);