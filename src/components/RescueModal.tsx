import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import medalhaOuro from "../assets/images/medalha-de-ouro.png";
import medalhaPrata from "../assets/images/medalha-de-prata.png";
import medalhaBronze from "../assets/images/medalha-de-bronze.png";
import api from "../api/api";
import InputField from "./InputField";
import { FaSpinner } from "react-icons/fa";

interface RescueModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RescueModal: React.FC<RescueModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [resgateCode, setResgateCode] = useState("");
  const [showResgateForm, setShowResgateForm] = useState(true);
  const [imgBadge, setImgBadge] = useState("");
  const [nameBadge, setNameBadge] = useState("");
  const [categoryBadge, setCategoryBadge] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  useEffect(() => {
    if (!isOpen) {
      setShowResgateForm(true);
      setResgateCode("");
      setError("");
    }
  }, [isOpen]);

  const handleResgate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const requestBody = { slug: resgateCode };
      const response = await api.post("/badges/redeem", requestBody);

      setImgBadge(response.data.img);
      setNameBadge(response.data.name);
      setCategoryBadge(response.data.category);
      setShowResgateForm(false);
      setError("");
    } catch (error: any) {
      console.error("Erro ao resgatar emblema:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao resgatar emblema.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResgatarNovamente = () => {
    setResgateCode("");
    setShowResgateForm(true);
    setError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal de Resgate"
      className="bg-slate-800 rounded p-6 max-w-lg mx-auto my-16 flex flex-col items-center"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      {showResgateForm ? (
        <div>
          <h2 className="text-xl font-medium mb-4 w-80">Resgatar emblema</h2>
          <form onSubmit={handleResgate}>
            <InputField
              label="Insira o código de resgate"
              type="text"
              id="rescueCode"
              value={resgateCode}
              onChange={(e) => setResgateCode(e.target.value)}
              error={error}
              required
            />
            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={onRequestClose}
                type="button"
                className="border-2 border-white py-2 px-4 rounded-md font-bold text-md hover:outline hover:outline-1"
              >
                Fechar
              </button>
              <button
                type="submit"
                className="bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600 relative"
                disabled={loading} // Desabilitar botão enquanto estiver carregando
              >
                {loading ? (
                  <FaSpinner className="animate-spin h-5 w-5 absolute left-3 top-2.5" /> // Ícone de Spinner
                ) : (
                  "Resgatar"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col">
          <img className="size-[300px]" src={imgBadge} alt="Emblema" />

          <div className="flex flex-col gap-2 my-4 items-center">
            <h2 className="text-2xl font-bold">{nameBadge}</h2>
            <div className="flex items-center gap-1">
              <img
                src={
                  categoryBadge === "gold"
                    ? medalhaOuro
                    : categoryBadge === "silver"
                    ? medalhaPrata
                    : categoryBadge === "bronze"
                    ? medalhaBronze
                    : medalhaOuro
                }
                alt={categoryBadge}
                className="size-6"
              />
              <h3 className="text-lg font-medium">{categoryBadge}</h3>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleResgatarNovamente}
              className="bg-yellow-400 py-2 px-4 rounded-md font-bold text-md text-slate-700 hover:bg-yellow-600"
            >
              Resgatar outro emblema
            </button>
            <button
              onClick={onRequestClose}
              className="border-2 border-white py-2 px-4 rounded-md font-bold text-md hover:outline hover:outline-1"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RescueModal;
