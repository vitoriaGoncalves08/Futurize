import * as React from 'react';
import Button from '@mui/material/Button';
import './Buttons.css';

export default function Buttons(props) {
  let buttonLabel;
  switch (props.variant) {
    case 'text':
      buttonLabel = 'Text';
      break;
    case 'contained':
      buttonLabel = 'Contained';
      break;
    case 'outlined':
      buttonLabel = 'Outlined';
      break;
    default:
      buttonLabel = 'Default';
  }

  let size; // Declaração da variável size
  switch (props.size) {
    case 'small':
      size = 'small';
      break;
    case 'medium':
      size = 'medium';
      break;
    case 'large':
      size = 'large';
      break;
    default:
      size = 'medium'; // Valor padrão, se nenhuma correspondência for encontrada
  }

  return (
    <Button variant={props.variant} size={size} className='custom-button'>{buttonLabel}</Button>
  );
}

Buttons.defaultProps = {
  size: 'medium'
};
