import React from 'react';

const Card = ({ id, image, onCardClick }) => {
    return (
        <div className="card" onClick={() => onCardClick(id)}>
            <img src={image} alt="Cat"/>
        </div>
    );
};

export default Card;