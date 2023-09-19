import { Input } from "@mui/material";
import React, { useState } from "react";

export default function Cadastro() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    return (
      <>
       <h1>Cadastrar</h1>
       <Input
       type="e-mail"
       value={email}
       onChange={(e) => [setEmail(e.target.value), seErro]}/>
       <Input/>
      </>
    )
  }