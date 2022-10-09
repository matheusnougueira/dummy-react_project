import React, { useState } from "react";
import axios from "axios";

// import { Container } from './styles';

function Login() {
  const [textUsername, setTextUsername] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const tryLogin = async () => {
    const body = { username: textUsername, password: textPassword };

    try {
      const { data, status } = await axios.post(
        "https://dummyjson.com/auth/login",
        body
      );

      if (status === 200) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);

        window.location = "/";
      } else {
        setHasError(true);
      }
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg')] bg-cover">
      <div className="h-80 w-80 flex flex-col items-center rounded-md backdrop-blur-sm bg-white/20">
        <span className="p-5 font-bold text-white text-lg">Seja bem vindo</span>

        <input
          type="text"
          placeholder="Usuário"
          className="p-1 rounded my-3 w-56"
          onChange={(e) => setTextUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-1 rounded my-3 w-56"
          onChange={(e) => setTextPassword(e.target.value)}
        />
        {hasError && <span>Usuário ou senha errado.</span>}
        <button
          className="bg-blue-700 transition duration-150 hover:bg-blue-600 cursor-pointer rounded-md font-bold p-3 text-slate-200 mt-7"
          onClick={tryLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
