import React, { useState } from "react";
import Input from '../components/Input/input';
import Buttons from '../components/Buttons/Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertError, AlertSuccess } from "../components/Alert/Modal";
import {ToastSuccess, ToastWarning} from "../components/Alert/Toast";
import TextField from '@mui/material/TextField';

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState("dasdsa");

  function handleClick() {
    setLoading(!loading);
  }

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

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

    return (
      <>
       <h1>Cadastrar</h1>
       <Input
          id="filled-multiline-static"
          label="Multiline"
          multiline
          row={4}

        />
          <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
        />
      </>
    )
  }