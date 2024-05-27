import React, { useEffect } from "react";
import Index from "../src/Components/Pages/IndexPage/Index.js";
import Login from "../src/Components/Pages/LoginPage/Login.js";
import Register from "../src/Components/Pages/RegisterPage/Register.js";
import Alert from "../src/Components/AlertSnackBar.js";
import { BrowserRouter, Switch } from "react-router-dom";
import Boards from "../src/Components/Pages/BoardsPage/Boards.js";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";
const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);
  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        <ProtectedRoute exact path="/boards" component={Boards} />
        <ProtectedRoute exact path="/board/:id" component={Board} />
        <FreeRoute exact path="/login" component={Login} />
        <FreeRoute exact path="/register" component={Register} />
        <FreeRoute exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
