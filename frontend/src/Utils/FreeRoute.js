import React from "react";
import { Route, Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// const FreeRoute = ({ component: Component, ...rest }) => {
//   if (localStorage.getItem("token")) return <Navigate push to="/boards" />;
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return <Component {...props} />;
//       }}
//     />
//   );
// };

const FreeRoute = () => {
  const user = useSelector((state) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to="/boards" />;
  }
  
  return <Outlet />;
};

export default FreeRoute;
