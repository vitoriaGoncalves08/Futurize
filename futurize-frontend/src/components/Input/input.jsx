import * as React from 'react';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './input.css';

export default function Input(props) {
  const { type, ...rest } = props;

  if (type === 'text') {
  return (
    <>
      <TextField 
        id={props.id}
        label={props.label}
        variant={props.variant} 
        className={"c-input" }
        helperText={props.helperText || ""}
        error={props.error ? true : false}
        rows={props.rows || null}
        multiline={props.multiline || false}
        required={props.required || null}
        size={props.size}
      />
    </>
  ); } else if (type === 'password') {
      const [showPassword, setShowPassword] = React.useState(false);
  
      const handleClickShowPassword = () => setShowPassword((show) => !show);
  
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      }

    return (
      <>
        <FormControl variant="filled">
          <InputLabel id="filled-weight-helper-text">{props.label}</InputLabel>
          <OutlinedInput
          className={props.size || "c-input" }
          {...rest}
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
        />
      </FormControl>
    </>
    );
  }
}
