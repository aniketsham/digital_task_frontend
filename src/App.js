import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProfile from './pages/updateProfile';
import Sidebar from './components/Sidebar';
import GetUsers from './pages/GetUsers';
import { useState } from 'react';
import { getMyProfile } from './store/slice/userSlice';
import UpdateByAdmin from './pages/UpdateByAdmin';

function App() {
  const dispatch=useDispatch()
  useState(()=>{
    dispatch(getMyProfile());
  })
  return (
    <>
     <Sidebar/>
      <Router>
      
        <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/updateProfile" element={<UpdateProfile/>} />
        <Route path="/allUsers" element={<GetUsers/>}/>
        <Route path="/UpdateById/:id" element={<UpdateByAdmin/>} />
        <Route path='*' element={<NotFound/>}/>

        </Routes>
        <ToastContainer position='top-right' theme="dark" />

      </Router>
      
    </>
  );
}

export default App;
