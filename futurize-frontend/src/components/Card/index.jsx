import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', index, listIndex },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      if (item.index === index && item.listIndex === listIndex) {
        return;
      }

      move(item.listIndex, listIndex, item.index, index);
      item.index = index;
      item.listIndex = listIndex;
    },
  });

  drag(ref);
  drop(ref);

  return (
    <div ref={ref}>
      <Container isDragging={data ? false : true}>
        {data && (
          <>
            <header>
              {data.labels.map((label)  => (
                <Label key={label} color={label} />
              ))}
            </header>
            <h3>{data.content}</h3>
            <p>{data.descricao}</p>
            <div className="DataEComentarios">
              <p>{data.data}</p>
              <p>{data.comentarios}</p>
            </div>
           
            <div className="ImgPessoas">
              {data.tempo}
              {data.user && <img src={data.user} alt="" />}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
