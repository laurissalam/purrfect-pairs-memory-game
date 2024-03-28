import React, { useEffect, useState } from 'react';
import Card from './Card';

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const uniqueImages = ['/images/cat1.jpeg', '/images/cat2.jpeg', '/images/cat3.jpeg', '/images/cat4.jpeg', '/images/cat5.jpeg', '/images/cat6.jpeg'];
        let initializedCards = uniqueImages.reduce((result, image, index) => {
            const card1 = { id: index * 2, imageURL: image, isFlipped: false, isMatched: false};
            const card2 = { id: index * 2 + 1, imageURL: image, isFlipped: false, isMatched: false};
            result.push(card1, card2);
            return result;
        }, []);
        shuffleCards(initializedCards);
        setCards(initializedCards);
    };

    const shuffleCards = (cardsArray) => {
        for(let i = cardsArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
        return cardsArray;
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || matchedCards.includes(id) || flippedCards.includes(id)) {
            return;
        }

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        // flip the clicked card 
        const updatedCards = cards.map(card => {
            if(card.id === id){
                return { ...card, isFlipped: true };
            }
            return card;
        });
        setCards(updatedCards);
        
        // Check for a match if two cards are flipped 
        if(newFlippedCards.length === 2){
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = updatedCards.find(card => card.id === firstCardId);
            const secondCard = updatedCards.find(card => card.id === secondCardId);

            if (firstCard.imageURL === secondCard.imageURL) {
                // It's a match
                setMatchedCards(prev => [...prev, firstCardId, secondCardId]);
                // reset flipped cards 
                setFlippedCards([]);
            }else{
                // not a match, flip them back after a delay
                setTimeout(() => {
                    setCards(cards =>
                        cards.map(card => {
                            if (card.id === firstCardId || card.id === secondCardId) {
                                return { ...card, isFlipped: false };
                            }
                            return card;
                        })
                    );
                    setFlippedCards([]);
                }, 1000);                
            }
        }

      
    };

    useEffect(() => {
        // The game is won when the length of matchedCards is half the length of cards
        // because each match involves two cards.
        if(matchedCards.length > 0 && matchedCards.length === cards.length / 2){
            alert("You have won! You found all matches :)");
        }
    }, [matchedCards, cards]);
    
    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        initializeGame(); 
    };
    

    return (
        <div>
        <div className="game-board">
            {cards.map((card) => (
                <Card key={card.id} id={card.id} image={card.imageURL} onCardClick={() => handleCardClick(card.id)} />
            ))}
        </div>
        <button onClick={resetGame} className="reset-button">Reset Game</button>
    </div>
    );
};

export default GameBoard;