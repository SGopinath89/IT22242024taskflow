import React, { useEffect } from "react";
import Index from "../src/Components/Pages/IndexPage/Index.js";
import Login from "../src/Components/Pages/LoginPage/Login.js";
import Register from "../src/Components/Pages/RegisterPage/Register.js";
import Alert from "../src/Components/AlertSnackBar.js";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Boards from "../src/Components/Pages/BoardsPage/Boards.js";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";


// const App = () => {
//   useEffect(() => {
//     loadUser(Store.dispatch);
//   }, []);
//   return (
//     <BrowserRouter>
//       <Alert />
//       <Routes>
//       <Route>
//         <ProtectedRoute exact path="/boards" component={Boards} />
//         <ProtectedRoute exact path="/board/:id" component={Board} />
//         <FreeRoute exact path="/login" component={Login} />
//         <FreeRoute exact path="/register" component={Register} />
//         <FreeRoute exact path="/" component={Index} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Alert />
      <Routes>
        <Route element={<FreeRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
