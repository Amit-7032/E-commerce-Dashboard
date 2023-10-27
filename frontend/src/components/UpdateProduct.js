import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    axios
      .get(`http://localhost:5050/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        let result = res.data;
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    axios
      .put(
        `http://localhost:5050/update-product/${params.id}`,
        {
          name: name,
          price: price,
          category: category,
          company: company,
        },
        {
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )
      .then((res) => {
        let updateProduct = res.data;
        console.log(updateProduct);
        navigate("/");
      });
  };

  return (
    <div className="product">
      <form>
        <h1>Update Product</h1>
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
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
