import React, { useState } from "react";
import api from "../api/api";
import InputField from "./InputField";

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorPassword("As senhas não coincidem!");
      return;
    }

    try {
      const response = await api.post("auth/register", {
        name,
        email,
        password,
      });

      console.log("Registration Successful:", response.data);
      onRegister();
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response?.status === 409) {
        setErrorEmail("Este email já está sendo usado.");
      } else {
        setErrorEmail("Erro ao registrar. Por favor, tente novamente.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-6 gap-x-2 w-full">
        <InputField
          label="Nome"
          type="text"
          id="name"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="E-mail"
          type="email"
          id="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          error={errorEmail}
        />

        <InputField
          label="Senha"
          type="password"
          id="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          label="Confirmar senha"
          type="password"
          id="cobfirmPassword"
          value={confirmPassword}
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errorPassword}
        />
      </div>

      <button className="bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600">
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
