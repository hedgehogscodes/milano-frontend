import { memo } from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav>
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://hedgehogscodes.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://hedgehogscodes.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://github.com/hedgehogscodes/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default memo(Portfolio);
