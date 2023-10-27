import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    if (name !== "" || email !== "" || password !== "") {
      await axios
        .post("http://localhost:5050/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          let data = res.data;
          console.log("data",data);
          setName("");
          setEmail("");
          setPassword("");
          navigate("/");
          localStorage.setItem("user", JSON.stringify(data?.result));
          localStorage.setItem("token", JSON.stringify(data?.token));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="register">
        <form>
          <h1>Register</h1>
          <input
            className="input-box"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="invalid-input">Enter valid name</span>
          )}
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
          <button type="submit" className="signup-btn" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
