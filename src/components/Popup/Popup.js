import { memo } from 'react';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './Popup.css';

function Popup({ isOpen, onClose, onNotesClick }) {
  const handleClose = (evt) => {
    if (evt.target.classList.contains('mobile-popup__close-button')
    || evt.target.classList.contains('mobile-popup_opened')) {
      onClose();
    }
  }

  return (
    <div
      className={`mobile-popup${isOpen ? ' mobile-popup_opened' : ''}`}
      onClick={handleClose}
    >
      <div className="mobile-popup__container">
        <button
          className="mobile-popup__close-button"
          type="button"
          onClick={handleClose}
        />
        <MobileNavigation onClose={onClose} onNotesClick={onNotesClick} />
      </div>
    </div>
  )
}

export default memo(Popup);
