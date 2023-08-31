import * as React from 'react';
import Button from '@mui/material/Button';
import './Buttons.css';

export default function Buttons(props) {
  return (
      <Button 
        variant={props.variant || "contained"}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        size={props.size || "medium"}
        color={props.color}
        text={props.text}
        className={props.size || "c-button"}
        href={props.href}
        onClick={props.onClick}>
        {props.children}
      </Button>
  );
} 
