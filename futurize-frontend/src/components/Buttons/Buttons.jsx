import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function Buttons({
  variant = 'contained',
  color = 'primary',
  children,
  startIcon,
  endIcon,
  loading = false,
  ...restProps
}) {
  const ButtonComponent = variant === 'icon' ? IconButton : Button;

  return (
    <ButtonComponent
      variant={variant === 'icon' ? undefined : variant}
      color={color}
      disabled={loading}
      {...restProps}
    >
      {startIcon && !loading && startIcon}
      {loading ? <CircularProgress size={24} /> : children}
      {endIcon && !loading && endIcon}
    </ButtonComponent>
  );
}
