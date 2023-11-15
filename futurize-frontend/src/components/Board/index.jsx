import React, { useState } from 'react';
import { produce } from 'immer';

import BoardContext from './context';

import List from '../List';

import { ContainerBoard } from './styles';

function loadLists() {
  return [
    { 
      title: 'Backlog', 
      creatable: true,
    },
    { 
      title: 'Sprint Backlog', 
      creatable: false,
    },
    { 
      title: 'Development', 
      creatable: false,
    },
    { 
      title: 'Done Development', 
      creatable: false,
    },
    { 
      title: 'Test', 
      creatable: false,
    },
    { 
      title: 'Done Test', 
      creatable: false,
    },
    { 
      title: 'Rework', 
      creatable: false,
    },
    { 
      title: 'DONE', 
      creatable: false,
      done: true,
    },
  ];
}

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <ContainerBoard>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </ContainerBoard>
    </BoardContext.Provider>
  );
}

// import React, { useRef, useContext } from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// import BoardContext from '../Board/context';

// import { Container, Label } from './styles';

// export default function Card({ data, index, listIndex }) {
//   const ref = useRef();
//   const { move } = useContext(BoardContext);

//   const [{ isDragging }, dragRef] = useDrag({
//     item: { type: 'CARD', index, listIndex },
//     collect: monitor => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, dropRef] = useDrop({
//     accept: 'CARD',
//     hover(item, monitor) {
//       const draggedListIndex = item.listIndex;
//       const targetListIndex = listIndex;

//       const draggedIndex = item.index;
//       const targetIndex = index;

//       if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
//         return;
//       }

//       const targetSize = ref.current.getBoundingClientRect();
//       const targetCenter = (targetSize.bottom - targetSize.top) / 2;

//       const draggedOffset = monitor.getClientOffset();
//       const draggedTop = draggedOffset.y - targetSize.top;

//       if (draggedIndex < targetIndex && draggedTop < targetCenter) {
//         return;
//       }

//       if (draggedIndex > targetIndex && draggedTop > targetCenter) {
//         return;
//       }

//       move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

//       item.index = targetIndex;
//       item.listIndex = targetListIndex;
//     }
//   })

//   dragRef(dropRef(ref));

//   return (
//     <Container ref={ref} isDragging={isDragging}>
//       <header>
//         {data.labels.map(label => <Label key={label} color={label} />)}
//       </header>
//       <p>{data.content}</p>
//       { data.user && <img src={data.user} alt=""/> }
//     </Container>
//   );
// }