import { memo, useEffect, useState, useContext } from 'react';
import PhotoCardList from '../PhotoCardList/PhotoCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Cards.css';
import { applyMasterFilter } from '../../utils/utils';
import { DEFAULT_WIDTH, AVERAGE_WIDTH, CARDS_DEFAULT_COUNT, CARDS_AVERAGE_COUNT, CARDS_SMALL_COUNT, ADD_DEFAULT_COUNT, ADD_AVERAGE_COUNT, ADD_SMALL_COUNT } from '../../config';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { StoredDataContext } from '../../contexts/StoredDataContext';
import Preloader from '../Preloader/Preloader';

function Cards({ cards, savedCards, onSubmit, onClick, onCardClick}) {
  const isLoading = useContext(IsLoadingContext);
  const { storedCheckboxState } = useContext(StoredDataContext) || false;
  const [cardsList, setCardsList] = useState([]);
  const [cardsInitCount, setCardsInitCount] = useState(0);
  const [cardsAddCount, setCardsAddCount] = useState(0);
  const [isChecked, setIsChecked] = useState(storedCheckboxState);
  const [message, setMessage] = useState('Здесь будут опубликованные пользователями карточки')

  const handleSearch = (searchParameter, checkboxState) => {
    setMessage('Ничего не нашлось');
    onSubmit(searchParameter, checkboxState);
  }

  const handleFilterCheckbox = (check) => {
    if(cardsList.length > 0){
      setMessage('Ничего не нашлось');
    }
    setIsChecked(check);
    localStorage.setItem('checkboxState', JSON.stringify(check));
  }

  const handleAdd = () => {
    const selectedCards = isChecked ? applyMasterFilter(cards) : cards;
    setCardsList(selectedCards?.slice(0, cardsList.length + cardsAddCount));
  }

  useEffect(() => {
    const setCounts = () => {
      if (window.innerWidth >= DEFAULT_WIDTH && cardsInitCount !== CARDS_DEFAULT_COUNT) {
        setCardsInitCount(CARDS_DEFAULT_COUNT);
        setCardsAddCount(ADD_DEFAULT_COUNT);
      } else if (window.innerWidth >= AVERAGE_WIDTH && window.innerWidth < DEFAULT_WIDTH && cardsInitCount !== CARDS_AVERAGE_COUNT) {
        setCardsInitCount(CARDS_AVERAGE_COUNT);
        setCardsAddCount(ADD_AVERAGE_COUNT);
      } else if (window.innerWidth < AVERAGE_WIDTH && cardsInitCount !== CARDS_SMALL_COUNT) {
        setCardsInitCount(CARDS_SMALL_COUNT);
        setCardsAddCount(ADD_SMALL_COUNT);
      }
    }
  
    setCounts();
    const selectedCards = isChecked ? applyMasterFilter(cards) : cards;
    setCardsList(selectedCards.slice(0, cardsInitCount));
    window.addEventListener('resize', setCounts);

    return () => window.removeEventListener('resize', setCounts);
  }, [cards, cardsInitCount, isChecked])

  return (
    <main className="cards">
      <SearchForm onSubmit={handleSearch} onCheck={handleFilterCheckbox} isSavedCardsOpen={false}/>
      { isLoading ? (<Preloader />) : 
        cardsList.length > 0 ? 
          (<PhotoCardList cardList={cardsList} savedCards={savedCards} onClick={onClick} onCardClick={onCardClick} buttonClassName='photo-grid__button_action_save'/>) : 
          (<span className="cards__result-text">{message}</span>)
      }
      { !isLoading && cards.length > cardsList.length && cardsList.length >= cardsInitCount &&
        (<button className="cards__load-button" type="button" onClick={handleAdd}>Ещё</button>)
      }
    </main>
  )
}

export default memo(Cards);