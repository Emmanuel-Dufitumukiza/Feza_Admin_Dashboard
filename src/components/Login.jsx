import react, { useEffect, useState } from "react";
import bg from "../assets/images/bg.png";
import {
  BrowserRouter,
  Routes,
  Link,
  unstable_HistoryRouter,
  useParams,
  useNavigate,
} from "react-router-dom";
import { axiosInstance } from "../../config";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token && token?.length > 0) {
      return navigate("/check");
    }
  }, []);

  const LoginAdmin = async (e) => {
    e.preventDefault();

    setLoginError(null);
    setError(false);
    setClicked(true);

    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    try {
      let res = await axiosInstance.post("/auth/adminlogin", {
        email: email,
        password: password,
      });

      if (res.data.error == false && res.data.token) {
        setLoginError(null);
        setError(false);
        localStorage.setItem("token", res.data.token);
        setClicked(false);
        return navigate("/check");
      }
      if (res.data.error.length > 0) {
        setLoginError(res.data.error);
        setError(true);
        setClicked(false);
        return;
      }
    } catch (error) {
      setClicked(false);
      alert("An error occured, please try again");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="form-cont mx-auto">
          <div className="top-box"></div>

          <form
            method="POST"
            onSubmit={LoginAdmin}
            className="login-form mx-auto shadow-sm"
          >
            <div className="header-title">
              <h3 className="fw-bold text-center">Log In as Admin</h3>
              <p className="text-center">Log In to access your Dashboard</p>
            </div>

            <div className="inpt-cont mb-3">
              <input
                required
                type="email"
                id="email"
                className="form-control shadow-none"
                autoComplete="off"
                placeholder="Email"
              />
            </div>

            <div className="inpt-cont mb-4">
              <input
                required
                type="password"
                id="pass"
                className="form-control shadow-none"
                placeholder="Password"
              />
            </div>

            {error ? (
              <div className="mb-4">
                <p className="text-danger text-center fw-bold">{loginError}</p>
              </div>
            ) : (
              <></>
            )}

            {clicked ? (
              <div className="btn-cont mb-4 text-center">
                <button
                  type="submit"
                  className="btn shadow-none btn-default w-75 fw-bold"
                >
                  {" "}
                  <span className="spinner spinner-border spinner-border-sm"></span>{" "}
                  Loging in...
                </button>
              </div>
            ) : (
              <div className="btn-cont mb-4 text-center">
                <button
                  type="submit"
                  className="btn shadow-none btn-default w-75 fw-bold"
                >
                  Log In
                </button>
              </div>
            )}

            <div className="m-2">
              <p className="text-center fg">
                <a
                  href="#"
                  className="text-dark"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
