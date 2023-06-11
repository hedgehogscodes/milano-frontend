import { memo } from 'react';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import photo1 from '../../images/j.jpg'
import photo2 from '../../images/j2.jpg'
import photo3 from '../../images/j3.jpg'
import photo4 from '../../images/j4.jpg'
import photo5 from '../../images/j5.jpg'
import photo6 from '../../images/j6.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="section-title">Наши работы</h2>
      <div className="works">
        <div className="works__item">
            <img className="works__image" src={photo1} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>

        <div className="works__item">
            <img className="works__image" src={photo2} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>

        <div className="works__item">
            <img className="works__image" src={photo3} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>

        <div className="works__item">
            <img className="works__image" src={photo4} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>

        <div className="works__item">
            <img className="works__image" src={photo5} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>
        
        <div className="works__item">
            <img className="works__image" src={photo6} alt=""/>
            <div className="works__info">
                <div className="works__title">creatively designed</div>
                <div className="works__text">Lorem ipsum dolor sit</div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutMe);
