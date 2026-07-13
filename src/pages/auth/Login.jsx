import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(loginData);

    dispatch(loginUser(loginData));

    dispatch(loginUser(loginData))
      .unwrap()
      .then((res) => console.log("SUCCESS", res))
      .catch((err) => console.log("ERROR", err));
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, dispatch, navigate]);
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{
          width: "450px",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

          <p className="text-center text-muted mb-4">
            Login to Project Management System
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
