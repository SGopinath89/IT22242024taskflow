import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate ,Outlet } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const history = useNavigate ();
//   const user = useSelector((state) => state.user);
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.pending) history.push("/");
//   });

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (user.isAuthenticated && !user.pending) {
//           return <Component {...props} />;
//         } else return <LoadingScreen />;
//       }}
//     />
//   );
// };

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isAuthenticated && !user.pending) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user.isAuthenticated && !user.pending) {
    return <Outlet />;
  } else {
    return <LoadingScreen />;
  }
};

export default ProtectedRoute;
