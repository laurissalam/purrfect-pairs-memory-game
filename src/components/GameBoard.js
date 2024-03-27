import React, { useEffect } from 'react';
import Card from './Card';

const GameBoard = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const initializedCards = [
            {id: 1, image: 'images/cat1.jpg', isFlipped: false, isMatched: false},
            {id: 2, image: 'images/cat2.jpg', isFlipped: false, isMatched: false},
            {id: 3, image: 'images/cat3.jpg', isFlipped: false, isMatched: false},
            {id: 4, image: 'images/cat4.jpg', isFlipped: false, isMatched: false},
            {id: 5, image: 'images/cat5.jpg', isFlipped: false, isMatched: false},
            {id: 6, image: 'images/cat6.jpg', isFlipped: false, isMatched: false},
        ];
        // TODO: shuffle initializedCards here 
        setCards(initializedCards)
    };

    const shuffleCards = (cardsArray) => {
        for(let i = cardsArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
        return cardsArray;
    };

    return (
        <div className="game-board">
            {cards.map((card) => (
                <Card key={card.id} id={card.id} image={card.image} onCardClick={handleCardClick} />
            ))}
        </div>
    );
};

export default GameBoard;