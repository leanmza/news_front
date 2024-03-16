import { useState } from 'react'
import './assets/App.css'

import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [publicaciones, setPublicaciones] = useState([
    { id: 1, title: "Test1", body: "test test test", creationDate: "2024/03/15", author: "Lean" , category: "LIBROS", subscriberContent: false, visualizations: 1 },
    { id: 2, title: "Test2", body: "test test test", creationDate: "2024/03/15", author: "Lean" , category: "LIBROS", subscriberContent: false, visualizations: 1 },
    { id: 3, title: "Test3", body: "test test test", creationDate: "2024/03/15", author: "Lean" , category: "LIBROS", subscriberContent: false, visualizations: 1 },
    { id: 4, title: "Test4", body: "test test test", creationDate: "2024/03/15", author: "Lean" , category: "LIBROS", subscriberContent: false, visualizations: 1 },
    { id: 5, title: "Test5", body: "test test test", creationDate: "2024/03/15", author: "Lean" , category: "LIBROS", subscriberContent: false, visualizations: 1 },
  ]);


  return (
    <>
 <BrowserRouter>
<Navbar></Navbar>
<Routes>
  <Route path='/' element={<Dashboard publicaciones={publicaciones}/>}></Route>
  <Route path='/login' element={<Login/>}></Route>


</Routes>


</BrowserRouter>
    </>

  )
}

export default App
