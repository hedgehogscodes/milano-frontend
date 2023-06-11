import { memo, useContext, useState } from 'react';
import './FilterCheckbox.css';
import { StoredDataContext } from '../../contexts/StoredDataContext';

function FilterCheckbox({ inputRef, onCheck, isSavedCardsOpen }) {
  const { storedCheckboxState } = useContext(StoredDataContext) || false;
  const [ isChecked, setIsChecked ] = useState(isSavedCardsOpen ? false : storedCheckboxState);

  const handleChange = () => {
    const isChecked = inputRef.current.hasAttribute('checked');
    isChecked ? inputRef.current.removeAttribute('checked') : inputRef.current.setAttribute('checked', true);
    setIsChecked(!isChecked);
    onCheck(!isChecked);
  }

  return (
    <div className="filter-box">
      <label htmlFor="filter-checkbox" className="filter-checkbox">
        <input
          className="filter-checkbox__invisible-checkbox"
          type="checkbox"
          id="filter-checkbox"
          onChange={handleChange}
          checked={isChecked || false}
          ref={inputRef}
        />
        <span className="filter-checkbox__visible-checkbox" />
        Создано мастером
      </label>
    </div>
  )
}

export default memo(FilterCheckbox);
