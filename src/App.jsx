import { useState, useEffect } from "react";
import "./assets/App.css";
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
import UsersAdmin from "./components/user/UsersAdmin";
import {
  changeStatus,
  deletePublicationById,
  getLastPublications,
  getPublications,
} from "./util/publicationService";
import { useLocalState } from "./util/useLocalStorage";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [lastPublications, setLastPublications] = useState([]);
  const [role, setRole] = useLocalState("", "role");

  useEffect(() => {
    const token = getToken();
    if (token && validToken()) {
      setIsLogged(true);
      setRole(getRole());
    } else {
      setIsLogged(false);
      setRole("");
    }
    getPublications(setPublicaciones);
    getLastPublications(setLastPublications);
  }, []);

  const deletePublication = async (id) => {
    deletePublicationById(id, setPublicaciones);
  };

  const changeDeletedStatus = async (id) => {
    changeStatus(id, setPublicaciones);
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
              <Dashboard
                lastPublications={lastPublications}
                publicaciones={publicaciones}
              />
            }
          ></Route>
          <Route path="user/login" element={<Login />} />
          <Route path="user/form" element={<UserForm />} />
          <Route path="user/profile" element={<UserEdit />} />
          <Route path="/publication/:id" element={<PublicationDetail/>} />
          <Route
            path="/publication/category/:category"
            element={<Dashboard publicaciones={publicaciones} />}
          />
          {/* <Route
            path="/publication/search/:query"
            element={<Dashboard publicaciones={publicaciones} />}
          /> */}
          <Route
            path="/publication/search/:query"
            element={<Dashboard publicaciones={publicaciones} />}
          />

          <Route element={<ProtectedRoute role={role} />}>
            {/* DENTRO DE ESTE ROUTE VA TODO LO PROTEGIDO PARA EL ADMIN */}
            <Route path="/publication/create" element={<PublicationForm />} />

            <Route path="user/admin" element={<UsersAdmin />} />
            <Route
              path="/publication/admin"
              element={
                <PublicationAdmin
                  deletePublication={deletePublication}
                  changeDeletedStatus={changeDeletedStatus}
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
