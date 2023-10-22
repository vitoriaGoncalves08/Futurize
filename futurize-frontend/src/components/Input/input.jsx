import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputMask from 'react-input-mask';
import './input.css';

export default function Input(props) {
  const { type, inputVariant, error, helperText, ...rest } = props;

  if (type === 'text') {
    return (
      <>
        <TextField 
          id={props.id}
          label={props.label}
          variant={props.variant}
          className="c-input"
          rows={props.rows || null}
          multiline={props.multiline || false}
          required={props.required || null}
          size={props.size}
          value={props.value} 
          onChange={props.onChange}
          error={error}
          helperText={helperText} 
        />
      </>
    );
  } else if (type === 'password') {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    }

    return (
      <>
        <FormControl className="c-input" variant={inputVariant} error={error}>
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
          <OutlinedInput
            {...rest}
            id={props.id}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={props.label}
          />
          <div className="helper-text">{props.helperText}</div>
        </FormControl>
      </>
    );
  } else if (type === 'date') {
    return (
      <InputMask
        {...rest}
        mask="99-99-9999"
        maskChar="_"
        value={props.value}
        onChange={(e) => props.onChange(e, 'dataFim')}
      >
        {(inputProps) => (
          <TextField
            id={props.id}
            type="text"
            variant="outlined"
            className="c-input"
            {...inputProps}
            placeholder={props.label}
          />
        )}
      </InputMask>
    );
  }
}