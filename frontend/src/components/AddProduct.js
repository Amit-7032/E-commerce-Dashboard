import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    axios
      .post("http://localhost:5050/add-product", {
        name: name,
        price: price,
        category: category,
        company: company,
        userId: userId,
      },
      {
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })
      .then((res) => {
        let result = res.data
        console.warn(result);
        navigate("/")
      });
  };

  return (
    <div className="product">
      <form>
        <h1>Add Product</h1>
        <input
          className="input-box"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="invalid-input">Enter valid name</span>
        )}
        <input
          className="input-box"
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="invalid-input">Enter valid price</span>
        )}
        <input
          className="input-box"
          type="text"
          placeholder="Enter product category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && (
          <span className="invalid-input">Enter valid category</span>
        )}
        <input
          className="input-box"
          type="text"
          placeholder="Enter product company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && (
          <span className="invalid-input">Enter valid company</span>
        )}
        <button
          type="submit"
          className="product-btn"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
