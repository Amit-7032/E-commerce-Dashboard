import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return false;
    }

    await axios
      .post("http://localhost:5050/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        // setEmail("");
        // setPassword("");
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
        } else {
          alert("Please enter correct details!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login">
        <form>
          <h1>Login</h1>
          <input
            className="input-box"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter valid email</span>
          )}
          <input
            className="input-box"
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Enter valid password</span>
          )}
          <button type="submit" className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
