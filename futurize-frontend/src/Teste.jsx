import { useState } from 'react'
import reactLogo from '../public/assets/react.svg'
import viteLogo from '../public/vite.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import Buttons from './components/Buttons/Buttons';
import LoadingButton from '@mui/lab/LoadingButton';
import { AlertError, AlertSuccess } from "./components/Alert/Modal";
import {ToastSuccess, ToastWarning} from "./components/Alert/Toast";


function App() {
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState("dasdsa");

  function handleClick() {
    setLoading(!loading);
  }

  function teste(){
    AlertSuccess({
      text: "Ops... Erros encontrados",
      title: "Erro!!",
    });
  }

  function teste2(){
    ToastWarning({
      text: "Ops... Erros encontrados toast",
      title: "Erro!!",
    });
  }

  function alertinha(){
    if (valor === "") {
      return "precisa ser preenchido";
    }
    return "";
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
      <h1>Futurize</h1>
      <div className="card">
  
      <Buttons buttonType="contained" onClick={teste}>
        Contained Button
      </Buttons>

      <Buttons buttonType="outlined" variant="outlined" size="large" onClick={teste2}>
        Outlined Button
      </Buttons>

      <Buttons buttonType="icon" className="c-button" size="small" endIcon={ <DeleteIcon />}>
        seddsrgdrgrg
      </Buttons>

      <Buttons buttonType="loading"  onClick={handleClick}
           variant="contained">
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