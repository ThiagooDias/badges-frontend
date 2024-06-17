import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as GiftsIcon } from "../assets/icon/gifts.svg";
import RescueModal from "./RescueModal";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/api";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Erro ao buscar o perfil do usuário:", error);
      }
    };

    fetchUserName();
  });

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="w-full h-20 px-12 bg-slate-800 flex justify-between items-center shadow-2xl">
      <Link to={"/dashboard"}>
        <h1 className="font-extrabold text-4xl text-yellow-400">CDA Badges</h1>
      </Link>
      {token && (
        <div className="flex gap-6 items-center">
          <button
            onClick={openModal}
            className="flex gap-3 px-4 py-2 items-center border-2 rounded-md border-yellow-400 text-yellow-400 font-bold text-xl hover:bg-yellow-400 hover:text-white hover:first:fill-white"
          >
            <GiftsIcon className="size-8 fill-current" />
            Resgatar
          </button>
          <RescueModal isOpen={modalIsOpen} onRequestClose={closeModal} />

          <Link to={"/profile"}>
            <div className="flex items-center gap-2">
              <p className="text-lg hover:underline hover:underline-offset-4">
                Olá, {userName || "Usuário"}
              </p>
              <div className="size-12 bg-slate-500 rounded-full flex justify-center items-center">
                <div className="text-3xl font-semibold">{firstLetter}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
