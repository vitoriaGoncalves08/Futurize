import { createTheme } from '@mui/material/styles';

// Defina suas cores primárias aqui
const primaryColors = {
  main: '#79A2FE',
  dark: '#002884',
  contrastText: '#fff', // Exemplo de cor primária
  // Outras cores primárias, se necessário
};

const theme = createTheme({
  palette: {
    primary: primaryColors,
    // Outras configurações de paleta aqui
  },
  // Outras configurações de tema aqui
});


export default theme;

