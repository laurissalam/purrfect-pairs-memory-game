import React from 'react';

const Card = ({ id, image, onCardClick, isFlipped }) => {
  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <img
        src={image}
        alt="Cat"
        className="card-image"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      />
      <div
        className="card-back"
        style={{ transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(180deg)' }}
      />
    </div>
  );
};


export default Card;