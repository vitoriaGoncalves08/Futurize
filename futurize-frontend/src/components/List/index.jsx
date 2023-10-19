import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

export default function List({data}) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul className='ListaUl'>
        {data.cards.map(card => <Card key={card.id} data={card} />)}
      </ul>
    </Container>
  );
}