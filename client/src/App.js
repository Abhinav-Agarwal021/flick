import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from "./Shared Components/Navbar/Navbar"
import { Home } from "./Components/Home/Home"
import { Authenticate } from "./Components/AuthenticateUser/Authenticate"
import { Activate } from "./Components/ActivateUser/Activate"
import { Rooms } from "./Components/Rooms/Rooms"
import { useSelector } from "react-redux"
import { useLoading } from "./hooks/useLoading"
import { Loader } from './Shared Components/Loader/Loader';
import { Chat } from './Components/Chat/Chat';
import { GrpChat } from './Components/Grp_chat/GrpChat'
import { GrpSettings } from './Components/GrpSettings/GrpSettings';

function App() {

  const { isAuth, user } = useSelector((state) => state.user);
  const { loading } = useLoading();

  return loading ? (
    <Loader message="Loading! please wait...." />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            isAuth && user?.activated ? (
              <Navigate to="/rooms" />
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <>
                <Navbar />
                <Home />
              </>
            )
          }
        />
        <Route
          path="/authenticate"
          element={
            isAuth && user?.activated ? (
              <Navigate to="/rooms" />
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <>
                <Navbar />
                <Authenticate />
              </>
            )
          }
        />
        <Route
          path="/activate"
          element={
            !isAuth && !user?.activated ?
              <>
                <Navbar />
                <Authenticate />
              </> :
              isAuth && !user?.activated ?
                <>
                  <Navbar />
                  <Activate />
                </>
                : <Navigate to="/rooms" />
          }
        />
        <Route
          path="/rooms"
          element={
            isAuth && user?.activated ? (
              <>
                <Navbar />
                <Rooms dm={false} />
              </>
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dms"
          element={
            isAuth && user?.activated ? (
              <>
                <Navbar />
                <Rooms dm={true} />
              </>
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuth && user?.activated ? (
              <Chat />
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/grp/:id"
          element={
            isAuth && user?.activated ? (
              <GrpChat />
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/settings/:id"
          element={
            isAuth && user?.activated ? (
              <GrpSettings />
            ) : isAuth && !user?.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;