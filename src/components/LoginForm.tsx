import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField"; // Importe o componente InputField

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorLogin("Email e/ou senha incorreta");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
      <InputField
        label="E-mail"
        type="email"
        id="email"
        value={email}
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Senha"
        type="password"
        id="password"
        value={password}
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorLogin && <p className="text-red-600 font-semibold">{errorLogin}</p>}

      <button className="bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
