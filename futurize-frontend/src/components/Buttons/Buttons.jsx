import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import '../../../public/assets/css/variaveis.css'
import './Buttons.css';

export default function Buttons(props) {
  const { isLoading, type, ...restProps } = props;

  if (type === 'loading') {
    return (
      <LoadingButton
        loading={props.isLoading}
        {...restProps}
      >
        {props.children}
      </LoadingButton>
    );
  } else {
    return (
      <Button
        variant={props.buttonType || "outlined" }
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        size={props.size || "medium"}
        color={props.color}
        text={props.text}
        className={props.size || "c-button"}
        href={props.href}
        onClick={props.onClick}
        type={props.type}
        {...restProps}
      >
        {props.children}
      </Button>
    );
  }
}
