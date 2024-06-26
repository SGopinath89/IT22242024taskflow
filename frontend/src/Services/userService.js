import axios from "axios";
import {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  fetchingStart,
  fetchingFinish,
} from "../Redux/Slices/userSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import setBearer from "../Utils/setBearer";
const backendUrl= process.env.REACT_APP_BACKEND_URL;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const register = async (
  { name, surname, email, password, repassword },
  dispatch
) => {
  dispatch(registrationStart());

  if (!name || !surname || !email || !password || !repassword) {
    dispatch(
      openAlert({
        message: "All fields are required!",
        severity: "error",
      })
    );
  } else if (!isValidEmail(email)) {
    dispatch(
      openAlert({
        message: "Invalid email format!",
        severity: "error",
      })
    );
  } else if (password.length < 6) {
    dispatch(
      openAlert({
        message: "Password must be at least 6 characters long!",
        severity: "error",
      })
    );
  } else if (password !== repassword) {
    dispatch(
      openAlert({
        message: "Your passwords do not match!",
        severity: "error",
      })
    );
  } else {
    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        surname,
        email,
        password,
      });
      dispatch(
        openAlert({
          message: res.data.message,
          severity: "success",
          nextRoute: "/login",
          duration: 1500,
        })
      );
    } catch (error) {
      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage
            ? error.response.data.errMessage
            : error.message,
          severity: "error",
        })
      );
    }
  }
  dispatch(registrationEnd());
};

export const login = async ({ email, password }, dispatch) => {
  dispatch(loginStart());

  if (!email || !password) {
    dispatch(
      openAlert({
        message: "Both email and password are required!",
        severity: "error",
      })
    );
  } else if (!isValidEmail(email)) {
    dispatch(
      openAlert({
        message: "Invalid email format!",
        severity: "error",
      })
    );
  } else if (password.length < 6) {
    dispatch(
      openAlert({
        message: "Password must be at least 6 characters long!",
        severity: "error",
      })
    );
  } else {
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      const { user, message } = res.data;
      localStorage.setItem("token", user.token);
      setBearer(user.token);
      dispatch(loginSuccess({ user }));
      dispatch(
        openAlert({
          message,
          severity: "success",
          duration: 500,
          nextRoute: "/boards",
        })
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      dispatch(loginFailure());
      dispatch(
        openAlert({
          message: errorMessage,
          severity: "error",
        })
      );
    }
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadStart());
  if (!localStorage.token) return dispatch(loadFailure());
  setBearer(localStorage.token);
  try {
    const res = await axios.get(`${backendUrl}/api/user/get-user`);
    dispatch(loadSuccess({ user: res.data }));
  } catch (error) {
    dispatch(loadFailure());
  }
};

export const getUserFromEmail = async (email, dispatch) => {
  dispatch(fetchingStart());
  if (!email) {
    dispatch(
      openAlert({
        message: "Please write an email to invite",
        severity: "warning",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }

  try {
    const res = await axios.post( `${backendUrl}/api/user/get-user-with-email`, { email });
    dispatch(fetchingFinish());
    return res.data;
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }
};
