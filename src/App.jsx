import { useState, useEffect } from "react";
import "./assets/App.css";
import axios from "axios";

import Login from "./components/user/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicationForm from "./components/publication/PublicationForm";
import PublicationDetail from "./components/publication/PublicationDetail";
import PublicationAdmin from "./components/publication/PublicationAdmin";
import PublicationEdit from "./components/publication/PublicationEdit";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./util/ProtectedRoute";
import UserForm from "./components/user/UserForm";
import Navbar from "./components/navbar/Navbar";
import UserEdit from "./components/user/UserEdit";
import {
  getRole,
  getToken,
  validToken,
  cleanToken,
} from "./util/securityService";
import UserAdmin from "./components/user/UserAdmin";
import axiosInstance from "./util/axiosConfig";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [ultimas, setUltimas] = useState([]);

  const role = getRole();

  useEffect(() => {
    fetchPublications();
    fetchLastPublications();
    checkLoggedIn();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosInstance.get("/api/publication");
      setPublicaciones(response.data.publications);
    } catch (error) {
      console.error("Error en la carga de categorías", error);
    }
  };

  const fetchLastPublications = async () => {
    try {
      const response = await axiosInstance.get("/api/publication/last");
      setUltimas(response.data.publications);
    } catch (error) {
      console.error("Error en la carga de categorías", error);
    }
  };

  const deletePublication = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/publication/${id}`);
      await fetchPublications();
      console.log(response);
    } catch (error) {
      console.error("Error en la carga de categorias", error);
    }
  };

  const checkLoggedIn = () => {
    const token = getToken();
    if (token) {
      setIsLogged(validToken());
    } else {
      setIsLogged(false);
    }
  };

  const logout = () => {
    cleanToken();
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <>
      <BrowserRouter>
        <Navbar isLogged={isLogged} logout={logout}></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard ultimas={ultimas} publicaciones={publicaciones} />
            }
          ></Route>
          <Route path="user/login" element={<Login />} />
          <Route path="user/form" element={<UserForm />} />
          <Route path="user/profile" element={<UserEdit />} />
          <Route path="/publication/:id" element={<PublicationDetail />} />
          <Route
            path="/publication/category/:category"
            element={<Dashboard publicaciones={publicaciones} />}
          />
          <Route
            path="/publication/search/:query"
            element={<Dashboard publicaciones={publicaciones} />}
          />

          <Route path="user/admin" element={<UserAdmin />} />
          <Route
            path="/publication/admin"
            element={
              <PublicationAdmin
                publicaciones={publicaciones}
                deletePublication={deletePublication}
              />
            }
          />
          <Route path="/publication/edit/:id" element={<PublicationEdit />} />

          <Route element={<ProtectedRoute role={role} />}>
            {/* DENTRO DE ESTE ROUTE VA TODO LO PROTEGIDO PARA EL ADMIN */}
            <Route path="/publication/create" element={<PublicationForm />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
