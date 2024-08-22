import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="auth">
          <h1>LOGIN</h1>
          <form>
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>LOGIN</button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
