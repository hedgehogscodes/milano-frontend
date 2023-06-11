import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__btn" type="button" onClick={() => history.goBack()}>Назад</button>
    </div>
  )
}

export default memo(NotFound);
