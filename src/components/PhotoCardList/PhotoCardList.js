import { memo } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';
import './PhotoCardList.css';

function PhotoCardCardList({ cardList, savedCards, isCreated,  isSavePage,  onClick, onCardClick, buttonClassName }) {
  return (
      <ul className="movies-grid__list">
        {cardList.map(movie => (
          <PhotoCard
            key={movie.id || movie.movieId}
            card={movie}
            savedCards={savedCards}
            onClick={onClick}
            onCardClick={onCardClick}
            buttonClassName={buttonClassName}
            isSavePage={isSavePage}
            isCreated={isCreated}
          />
        ))}
      </ul>
  )
}

export default memo(PhotoCardCardList);