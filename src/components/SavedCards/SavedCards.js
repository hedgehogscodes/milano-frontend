import { memo, useEffect, useState, } from 'react';
import PhotoCardCardList from '../PhotoCardList/PhotoCardList';
import SearchForm from '../SearchForm/SearchForm';
import { applySavedMasterFilter, applySavedNameFilter} from '../../utils/utils';

function SavedCards({ savedCards, onClick, onCardClick }) {
  const initMessage = 'Здесь будут сохранённые вами фотокарточки';
  const notFoundMessage = 'Ничего не нашлось';
  const [cardsList, setCardsList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const [searchParameter, setSearchParameter] = useState(null);

  const handleSearch = (searchParameter) => {
    if(savedCards.length > 0){
      setMessage(notFoundMessage);
      setSearchParameter(searchParameter);
    } else {
      setMessage(initMessage);
    }
    return
  }

  const handleFilterCheckbox = (check) => {
    if(cardsList.length > 0 && savedCards.length > 0){
      setMessage(notFoundMessage);
    }else{
      setMessage(initMessage);
    }
    setIsChecked(check);
  }

  useEffect(() => {
    let selectedMovies = [];
    selectedMovies = isChecked ? applySavedMasterFilter(savedCards) : savedCards;
    selectedMovies = searchParameter ? applySavedNameFilter(selectedMovies, searchParameter) : selectedMovies;
    setCardsList(selectedMovies);
  }, [savedCards, isChecked, searchParameter])

  return (
    <main className="cards">
      <SearchForm onSubmit={handleSearch} onCheck={handleFilterCheckbox} isSavedCardsOpen={true}/>
      {cardsList.length > 0 ? 
        (<PhotoCardCardList cardList={cardsList} isSavePage={true} onClick={onClick} onCardClick={onCardClick} buttonClassName='photo-grid__button_action_delete'/>) :
        (<span className="cards__result-text">{message}</span>)
      }
    </main>
  )
}

export default memo(SavedCards);
