import { memo } from 'react';
import React from "react";
import './PhotoCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function PhotoCard({ card, savedCards, isCreated, isSavePage, onClick, onCardClick, buttonClassName}) {
  const currentUser = React.useContext(CurrentUserContext);
  let isSaved = null;
  if(savedCards){
    isSaved = savedCards?.some((item) => (item.card._id === card._id));
  }else{
    isSaved = true;
  }
  const profileAvatar = currentUser._id === card.owner ? currentUser.avatar : card.owner.avatar
  const profileName = currentUser._id === card.owner ? currentUser.name : card.owner.name

  function handleMovieButtonClick(){
    onClick(card, isSaved, isSavePage)
  }

  function handleImageClick(){
    onCardClick(card, isSavePage)
  }

  return (
    <li className="photo-grid__item">
      <div className="photo-grid__profile-box">
        <div className="profile-box__info">
          <div className="photo-grid__avatar" style={{ backgroundImage: `url(${ isSavePage ? card.card.owner.avatar: profileAvatar})` }}></div>
          <h2 className="photo-grid__name" title={isSavePage ? card.card.owner.name : profileName}>{isSavePage ? card.card.owner.name : profileName}</h2>
        </div>
      </div>
      <img className="photo-grid__image" src={ isSavePage ? card.card.link : card.link } alt={ isSavePage ? card.card.name : card.name} onClick={handleImageClick}/>
      <div className="photo-grid__box">
        <div className="photo-grid__info">
          <h2 className="photo-grid__title" title={ isSavePage ? card.card.name : card.name }>{ isSavePage ? card.card.name : card.name}</h2>
          <p className="photo-grid__subtitle">Мастер: { isSavePage ? card.card.master.name : card.master.name}</p>
        </div>
        <button className={`photo-grid__button ${isSaved || isCreated ? buttonClassName : ''}`} type="button" onClick={handleMovieButtonClick} title={isSaved || isCreated ? 'Удалить' : 'Добавить в сохранённые'}/>
      </div>
    </li>
  )
}

export default memo(PhotoCard);