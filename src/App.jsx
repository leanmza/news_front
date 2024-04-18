import { useState, useEffect } from "react";
import "./assets/App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicationForm from "./components/PublicationForm";
import PublicationDetail from "./components/PublicationDetail";
import PublicationAdmin from "./components/PublicationAdmin";
import PublicationEdit from "./components/PublicationEdit";
import { getRole, getToken, validToken, cleanToken } from "./util/securityService";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./util/ProtectedRoute";
import UserForm from "./components/UserForm";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const role = getRole();

  useEffect(() => {
    fetchPublications();
    checkLoggedIn();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/publication");
      setPublicaciones(response.data.publications);
    } catch (error) {
      console.error("Error en la carga de categorías", error);
    }
  };

  const deletePublication = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/publication/${id}`
      );
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
            element={<Dashboard publicaciones={publicaciones} />}
          ></Route>
          <Route path="user/login" element={<Login />} />
          <Route path="user/form" element={<UserForm />} />
          <Route path="/publication/:id" element={<PublicationDetail />} />
          <Route
            path="/category/:category"
            element={<Dashboard publicaciones={publicaciones} />}
          />

          <Route element={<ProtectedRoute role={role} />}>
            {/* DENTRO DE ESTE ROUTE VA TODO LO PROTEGIDO PARA EL ADMIN */}
            <Route path="/publication/create" element={<PublicationForm />} />
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
          </Route>



          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
