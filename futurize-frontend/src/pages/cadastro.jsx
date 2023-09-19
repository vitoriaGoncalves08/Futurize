import React, { useState } from "react";
import Input from '../components/Input/input';

export default function Cadastro() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    return (
      <>
       <h1>Cadastrar</h1>
       <Input
          label="Error"
          placeholder="aaaa"
          required
        />
      </>
    )
  }