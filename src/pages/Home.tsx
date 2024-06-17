import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Home = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleRegister = () => {
    setActiveTab("login");
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-[350px] bg-slate-800 p-6 rounded-md shadow-2xl flex flex-col gap-6">
        <div className="flex justify-around">
          <button
            className={`w-full px-4 py-2 font-semibold ${
              activeTab === "login"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-full px-4 py-2 font-semibold ${
              activeTab === "register"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Registre-se
          </button>
        </div>
        <div>
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
