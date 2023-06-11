import { memo, useEffect, useState, useContext } from 'react';
import { DEFAULT_WIDTH, AVERAGE_WIDTH} from '../../config';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from '../Preloader/Preloader';
import './Reviews.css'

function Reviews({ reviews, onAddReview }) {
  const isLoading = useContext(IsLoadingContext);
  const [reviewsList, setReviewsList] = useState([]);
  const [cardsInitCount, setCardsInitCount] = useState(0);
  const [cardsAddCount, setCardsAddCount] = useState(0);
  const [message, setMessage] = useState('Здесь будут отзывы, оставленные пользователяии')
  const [description, setDescription] = useState("");
  const isLoggedIn = useContext(CurrentUserContext);

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const handleAdd = () => {
    setReviewsList(reviews?.slice(0, reviewsList.length + cardsAddCount));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddReview({ description });
    setDescription('');
  }

  useEffect(() => {
    const setCounts = () => {
      if (window.innerWidth >= DEFAULT_WIDTH && cardsInitCount !== 5) {
        setCardsInitCount(5);
        setCardsAddCount(3);
      } else if (window.innerWidth >= AVERAGE_WIDTH && window.innerWidth < DEFAULT_WIDTH && cardsInitCount !== 4) {
        setCardsInitCount(4);
        setCardsAddCount(2);
      } else if (window.innerWidth < AVERAGE_WIDTH && cardsInitCount !== 3) {
        setCardsInitCount(3);
        setCardsAddCount(1);
      }
    }
    setCounts();
    setReviewsList(reviews.slice(0, cardsInitCount));
    window.addEventListener('resize', setCounts);

    return () => window.removeEventListener('resize', setCounts);
  }, [reviews, cardsInitCount])

  return (
    <main className="reviews">
      { isLoading ? (<Preloader />) : 
        reviewsList.length > 0 ? 
          (
            <ul className="reviews__list">
              {reviewsList.map(application => (
                <li className="reviews__item">
                  <div className="reviews__profile-box">
                    <div className="reviews__avatar" style={{ backgroundImage: `url(${application.owner.avatar})` }}></div>
                    <div className="reviews__profile-info">
                      <h2 className="reviews__profile-name">{application.owner.name}</h2>
                      <p className="reviews__profile-date">{application.createdAt}</p>
                    </div>
                  </div>
                  <p className="reviews__description">{application.description}</p>
                </li>
              ))}
            </ul>
          ) : 
          (<span className="cards__result-text">{message}</span>)
      }
      { 
        !isLoading && reviews.length > reviewsList.length && reviewsList.length >= cardsInitCount &&
        (<button className="cards__load-button" type="button" onClick={handleAdd}>Ещё</button>)
      }
      { isLoggedIn ? 
        <form className={'reviews__form'} name="reviews__form" onSubmit={handleSubmit}>
          <label className="reviews__form-label">
            <input value={description || ""} onChange={handleDescriptionChange} name="description" id="description" type="text" className="reviews__input" autoComplete="off" placeholder="Ваш отзыв" minLength="2" required/>
            <span id="description-error" className=""></span>
          </label>
          <button type="submit" value="Сохранить" className="reviews__btn">Отправить</button>
        </form> : <p class="sign__text"><a class="sign__link" href="/signin">Вход</a> или <a class="sign__link" href="/signup">Регистрация</a></p> 
      }
    </main>
  )
}

export default memo(Reviews);