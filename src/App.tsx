import React, { Fragment } from 'react';
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
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Wrap = styled.div`
  padding: 5rem 0;
  margin: 0 auto;
  max-width: 118rem;
`;

const CardList = styled(TransitionGroup)`
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
  readonly top: number;
  readonly left: number;
}

const Card = styled.li<ListItemProps>`
  ${({isCurrentCard}) => isCurrentCard && 'position: fixed'};
  ${({isCurrentCard, top}) => isCurrentCard ? `top: ${top - 28.3}px` : ''};
  ${({isCurrentCard, left}) => isCurrentCard ? `left: ${left - 20}px` : ''};
  border-radius: 4%;
  min-width: 20rem;
  overflow: hidden;
  z-index: ${({isCurrentCard}) => isCurrentCard ? 199 : 1};
  opacity: ${({isCurrentCard, isOverCard}) => isCurrentCard ? '0' : isOverCard ? '0.70' : '1'};
  transform: ${({isOverCard}) =>isOverCard ? 'scale(0.95)' : 'scale(1)'};
  transition: transform 0.3s ease-in;
  cursor: grab;
  cursor: -webkit-grab;

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 99;
  }

  &:active {
    cursor: -webkit-grabbing;
	  transition-duration: 100ms;
  }

  &.card-enter {
    opacity: 0;
  }
  &.card-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  &.card-exit {
    opacity: 1;
  }
  &.card-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;

interface ControlsListListProps {
  readonly currentCard: string;
}

const ControlsList = styled.ul<ControlsListListProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 5rem;
  border-radius: 2.5rem;
  list-style: none;
  margin: 0;
  flex-wrap: wrap;
  gap: 2rem;
  z-index: ${({currentCard}) => currentCard ? 99 : 0};
`;

const Controls = styled.li`
  width: 20rem;
  height: 28.3rem;
  border-radius: 4%;
  /* background-color: rebeccapurple; */
  opacity: 0.3;
`;

const Placeholder = styled.li`
  width: 20rem;
  height: 28.3rem;
  outline: 1px solid #AD8726;
  outline-offset: 0.2rem;
  border-radius: 4%;
`;

interface DragCardProps {
  readonly top: number;
  readonly left: number;
}

const DragCard = styled.li<DragCardProps>`
  position: fixed;
  top: ${({top}) => top ? `${top + 20}px` : '-105%'};
  left: ${({left}) => left ? `${left + 20}px` : '-105%'};
  transform: scale(1.1);
  width: 20rem;
  border-radius: 4%;
  z-index: 55;
`;

type TypeCard = {
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
  const [currentCard, setCurrentCard]: [TypeCard, any] = useState({id: '', order: -1} as TypeCard);
  const [isOverCard, setIsOverCard] = useState('');
  const [dragItemPosition, setDragItemPosition] = useState({top: 0, left: 0, y: 0, x: 0});
  const [currentCardPosition, setCurrentCardPosition] = useState({top: 0, left: 0});
  const mouseDownHandler = ({clientX: x, clientY: y, target}: React.DragEvent<HTMLLIElement>) => {
    const {top, left} = (target as HTMLElement).getBoundingClientRect();

    setCurrentCardPosition({top, left});
    setDragItemPosition({top,  left, x: x - left, y: y - top});
  }
  const dragHandler = ({clientY: y, clientX: x}: React.DragEvent<HTMLLIElement>) => {

    currentCard && setDragItemPosition({...dragItemPosition, top: y - dragItemPosition.y, left: x - dragItemPosition.x});
  }

  const dragStartHandler = ({clientX: x, clientY: y}: React.DragEvent<HTMLLIElement>, card: TypeCard) => {
    
    setCurrentCard(card);
    setDragItemPosition({...dragItemPosition, top: y - dragItemPosition.y,  left: x - dragItemPosition.x});
  };
  const dragLeaveHandler = () => setIsOverCard('');
  const dragEndHandler = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    console.log('DragEnd');
    setCurrentCard({id: '', order: -1});
  };
  const dragOverHandler = (event: React.DragEvent<HTMLLIElement>, {id, order}: TypeCard) => {
    event.preventDefault();
    console.log(event.target);
    if (isOverCard) return;
    setIsOverCard(
      (currentCard.id === id && currentCard.order !== cardList.length - 1) ?
      cardList.filter(card => card.order === order + 1)[0].id :
      id);
  };
  const dropHandler = (event: React.DragEvent<HTMLLIElement>, card: TypeCard) => {
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
    setDragItemPosition({top: 0, left: 0, x: 0, y: 0});
  };

  return (
    <Wrap>
      <CardList 
        component={'ul'}
        onDrop={event => console.log(event)}
      >
        <DragCard
          top={dragItemPosition.top + dragItemPosition.y ? dragItemPosition.top : 0}
          left={dragItemPosition.left + dragItemPosition.x ? dragItemPosition.left : 0}
        >
          {currentCard && currentCard.Img}
        </DragCard>
        {cardList
          .sort((a, b) => a.order > b.order ? 1 : -1)
          .map(card => (
            <Fragment key={card.id}>
              <CSSTransition
                key={`card-wrap-${card.id}`}
                classNames={'card'}
                timeout={500}
              >
                <Card
                  key={`card-${card.id}`}
                  className={'card'}
                  top={currentCardPosition.top}
                  left={currentCardPosition.left}
                  isOverCard={isOverCard === card.id}
                  isCurrentCard={currentCard.id === card.id}
                  draggable={true}
                  onDrag={dragHandler}
                  onMouseDown={mouseDownHandler}
                  onDragStart={event => dragStartHandler(event, card)}
                  onDragLeave={dragLeaveHandler}
                  onDragEnd={dragEndHandler}
                  onDragOver={event => dragOverHandler(event, card)}
                  onDrop={event => dropHandler(event, card)}
                >
                  {card.Img}
                </Card>
              </CSSTransition>
              {/* {currentCard.id === card.id && <CSSTransition
                key={`placeholder-wrap-${card.id}`}
                classNames={'card'}
                timeout={500}
              >
                <Placeholder key={`placeholder-${card.id}`} />
              </CSSTransition>} */}
            </Fragment>
          ))}
          <ControlsList
            currentCard={currentCard.id}
          >
            {cardList.filter(card => card.id !== currentCard.id).sort((a, b) => a.order > b.order ? 1 : -1)
              .map(card => (<Controls 
                key={card.id}
                draggable={true}
                onDragLeave={dragLeaveHandler}
                onDragEnd={dragEndHandler}
                onDragOver={event => dragOverHandler(event, card)}
                onDrop={event => dropHandler(event, card)}
              />
                
              ))
            }
          </ControlsList>
      </CardList>
    </Wrap>
  );
}

export default App;
