import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../assets/icon/logout.svg";
import { ReactComponent as EditIcon } from "../assets/icon//edit.svg";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [initialName, setInitialName] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile", {});
        setName(response.data.name);
        setEmail(response.data.email);
        setInitialName(response.data.name.charAt(0).toUpperCase());
      } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { name, email };
      await api.put("/user/profile", updatedProfile, {});
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar o perfil do usuário:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-center py-8">
      <div className="bg-slate-800 p-6 rounded-md shadow-2xl flex flex-col gap-6">
        <div className="flex justify-center">
          <div className="flex justify-center items-center rounded-full bg-slate-500 size-52">
            <div className="text-8xl font-semibold">{initialName}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nome</label>
            <input
              className="text-black p-1 disabled:bg-slate-300 rounded"
              disabled={!isEdit}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="text-black p-1 disabled:bg-slate-300 rounded"
              disabled={!isEdit}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {isEdit ? (
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleEdit}
              className="border-2 border-white py-2 px-4 rounded-md font-bold text-md hover:outline hover:outline-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600"
            >
              Salvar
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <button onClick={handleLogout} className="flex gap-2 hover:underline">
              <LogoutIcon className="size-6" />
              Sair
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600"
            >
              <EditIcon className="size-5"/>
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
