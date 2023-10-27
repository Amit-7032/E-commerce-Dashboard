import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            {/* <Route path="/profile" element={<h1>Profile Component</h1>} /> */}
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
