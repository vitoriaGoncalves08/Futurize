import * as React from 'react';
import TextField from '@mui/material/TextField';
import './input.css';

export default function Input(props) {
  return (
    <>
      <TextField 
      id={props.id}
      label={props.label}
      variant={props.variant} 
      className={props.size || "c-input" }
      helperText={props.error || null}
      error={props.error ? true : false}
      rows={props.rows || null}
      multiline={props.multiline}
        
      />
    </>
  );
} 
