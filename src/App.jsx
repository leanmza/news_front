import { useState, useEffect } from "react";
import "./assets/App.css";
import axios from "axios";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicationForm from "./components/PublicationForm";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchPublications, 10000); // Realiza la consulta cada 10 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando se desmonta el componente
  }, [publicaciones]);

  const fetchPublications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/publication");
      setPublicaciones(response.data.publications);
    } catch (error) {
      console.error("Error en la carga de categorías", error);
    }
  };

  console.log("publicaciones en app");
  console.log(publicaciones);
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={<Dashboard publicaciones={publicaciones} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/publication/create"
            element={<PublicationForm />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
