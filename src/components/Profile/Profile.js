import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PhotoCardList from '../PhotoCardList/PhotoCardList';
import './Profile.css';

function Profile({ onEditProfile, onAddCard, onEditAvatar, cards,  onCardClick, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content contaner-inner">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar}></div>
        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__btn profile__btn_action_edit" onClick={onEditProfile}></button>
            <p className="profile__status">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__btn profile__btn_action_add" onClick={onAddCard}></button>
      </section>
      {cards.length > 0 ? 
        (<PhotoCardList cardList={cards} isCreated={true} onClick={onCardDelete} onCardClick={onCardClick} buttonClassName='photo-grid__button_action_delete-created'/>) :
        (<span className="cards__result-text">Здесь будут созданные вами фотокарточки</span>)
      }
    </main>
  );
}

export default Profile;