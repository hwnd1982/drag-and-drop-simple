import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Alpha } from './img/alpha.svg';
import { ReactComponent as Beta } from './img/beta.svg';
import { ReactComponent as Gamma } from './img/gamma.svg';
import { ReactComponent as Delta } from './img/delta.svg';
import { ReactComponent as Epsilon } from './img/epsilon.svg';
import { ReactComponent as Zeta } from './img/zeta.svg';
import { ReactComponent as Eta } from './img/eta.svg';
import { ReactComponent as Theta } from './img/theta.svg';
import { ReactComponent as Iota } from './img/iota.svg';
import { ReactComponent as Cappa } from './img/cappa.svg';

const Wrap = styled.div`
  padding: 5rem 0;
  margin: 0 auto;
  max-width: 118rem;
`;

const List = styled.ul`
  position: relative;
  display: flex;
  padding: 5rem;
  border-radius: 2.5rem;
  list-style: none;
  margin: 0;
  flex-wrap: wrap;
  gap: 2rem;
  `;

interface ListItemProps {
  readonly isOverCard: boolean;
  readonly isCurrentCard: boolean;
}

const ListItem = styled.li<ListItemProps>`
  min-width: ${({isCurrentCard}) => isCurrentCard ? '0' : '20rem'};
  ${({isCurrentCard}) => isCurrentCard ? 'margin-left: -2rem;' : ''};
  border-radius: 4%;
  overflow: hidden;
  z-index: 1;
  opacity: ${({isOverCard, isCurrentCard}) => isCurrentCard ? '0' : isOverCard ? '0.70' : '1'};
  transform: ${({isOverCard, isCurrentCard}) => isCurrentCard ? 'scale(1.1)' : isOverCard ? 'scale(0.95)' : 'scale(1)'};
  transition: transform 0.3s ease-in${({isCurrentCard}) => isCurrentCard ? ', min-width 0.6s ease-in' : ''};
  cursor: grab;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 99;
  }
`;

interface DragItemProps {
  readonly top: number;
  readonly left: number;
}

const DragItem = styled.div<DragItemProps>`
  position: absolute;
  top: ${({top}) => top ? `${top + 20}px` : '-105%'};
  left: ${({left}) => left ? `${left + 20}px` : '-105%'};
  transform: scale(1.1);
  width: 20rem;
  border-radius: 4%;
  z-index: 99;
`;

type Card = {
  id: string;
  order: number; 
  Img?: JSX.Element;
}

const App = () => {
  const [cardList, setCardList] = useState([
    {id: 'alpha', order: 1, Img: <Alpha />},
    {id: 'beta', order: 2, Img: <Beta />},
    {id: 'gamma', order: 5, Img: <Gamma />},
    {id: 'delta', order: 4, Img: <Delta />},
    {id: 'epsilon', order: 6, Img: <Epsilon />},
    {id: 'zeta', order: 9, Img: <Zeta />},
    {id: 'eta', order: 0, Img: <Eta />},
    {id: 'theta', order: 7, Img: <Theta />},
    {id: 'iota', order: 8, Img: <Iota />},
    {id: 'cappa', order: 3, Img: <Cappa />},
  ]);
  const [currentCard, setCurrentCard]: [Card, any] = useState({id: '', order: -1} as Card);
  const [isOverCard, setIsOverCard] = useState('');
  const [dragItemPosition, setDragItemPosition] = useState({top: 0, left: 0});
  const dragHandler = (event: React.DragEvent<HTMLLIElement>) =>
    setDragItemPosition({top: event.clientY, left: event.clientX});
  const dragStartHandler = (card: Card) => setCurrentCard(card);
  const dragLeaveHandler = () => setIsOverCard('');
  const dragEndHandler = () => setCurrentCard({id: '', order: -1});
  const dragOverHandler = (event: React.DragEvent<HTMLLIElement>, {id}: Card) => {
    event.preventDefault();
    if (isOverCard) return;
    setIsOverCard(id);
  };
  const dropHandler = (event: React.DragEvent<HTMLLIElement>, card: Card) => {
    event.preventDefault();

    setCardList(cardList.map(item => {
      if(currentCard && item.id === card.id) {
        return {...item, order: currentCard.order};
      }
      if(item.id === currentCard.id) {
        return {...item, order: card.order};
      }
      return item;
    }));
    setIsOverCard('');
    setCurrentCard({id: '', order: -1});
    setDragItemPosition({top: 0, left: 0});
  };

  return (
    <Wrap>
      <DragItem
      top={dragItemPosition.top}
      left={dragItemPosition.left}
      >
        {currentCard && currentCard.Img}
      </DragItem>
      <List 
        onDrop={event => console.log(event)}
        onDragOver={event => {
          event.preventDefault();
          console.log(event);
        }}
      >
        {cardList
          .sort((a, b) => a.order > b.order ? 1 : -1)
          .map(card => (
            <ListItem
              key={card.id}
              isOverCard={isOverCard === card.id}
              isCurrentCard={currentCard.id === card.id}
              draggable={true}
              onDrag={dragHandler}
              onDragStart={() => dragStartHandler(card)}
              onDragLeave={dragLeaveHandler}
              onDragEnd={dragEndHandler}
              onDragOver={event => dragOverHandler(event, card)}
              onDrop={event => dropHandler(event, card)}
            >
              {card.Img}
            </ListItem>
          ))}
      </List>
    </Wrap>
  );
}

export default App;
