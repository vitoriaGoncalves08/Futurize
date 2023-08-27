import { useState } from 'react'
import reactLogo from '../public/assets/react.svg'
import viteLogo from '../public/vite.svg'
import './App.css'
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Buttons from './components/Buttons/Buttons';
import LoadingButton from '@mui/lab/LoadingButton';
import { AlertError } from "./components/Alert/Modal";
import {ToastSuccess} from "./components/Alert/Toast"

function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(!loading);
  }

  function teste(){
    AlertError({
      text: "Ops... Erros encontrados",
      title: "Erro!!",
    });
  }

  function teste2(){
    ToastSuccess({
      text: "Ops... Erros encontrados toast",
      title: "Erro!!",
    });
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ color: theme.palette.primary.black}}>Futurize</h1>
      <div className="card">
        {/* <Button variant="contained" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      <Buttons startIcon={<DeleteIcon />} className="c-button">dgrdg</Buttons> */}


      <Buttons buttonType="contained" onClick={teste}>
        Contained Button
      </Buttons>

      <Buttons buttonType="outlined" variant="outlined" onClick={teste2}>
        Outlined Button
      </Buttons>

      <Buttons buttonType="icon" className="c-button">
      <DeleteIcon />
      </Buttons>

      <Buttons buttonType="loading"  onClick={handleClick}
          loading={loading} variant="contained">
        Loading Button
      </Buttons>

     
        <LoadingButton
          size="small"
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </>
  )
}
export default App