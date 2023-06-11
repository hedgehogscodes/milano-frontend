import { memo, useState, useRef, useContext } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import "./SearchForm.css";
import { StoredDataContext } from '../../contexts/StoredDataContext';

function SearchForm ({ onSubmit, onCheck, isSavedCardsOpen }) {
  const { storedSearch } = useContext(StoredDataContext) || '';
  const [searchParameter, setSearchParameter] = useState(isSavedCardsOpen ? '' : storedSearch)
  const checkbox = useRef();

  const handleChange = (e) => {
    setSearchParameter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchParameter, checkbox.current.hasAttribute('checked'));
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <label className="search-form__label-input">
            <input
              className="search-form__input"
              type="text"
              id="movie"
              placeholder="Фотокарточка"
              value={searchParameter}
              onChange={handleChange}
            />
          </label>
          <button className="search-form__button" type="submit" title='Найти'></button>
        </div>
        <FilterCheckbox inputRef={checkbox} onCheck={onCheck} isSavedCardsOpen={isSavedCardsOpen}/>
      </form>

    </div>
  )
}

export default memo(SearchForm);