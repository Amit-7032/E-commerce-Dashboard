import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/reducer/productListReducer";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.local.productList.products)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:5050/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        dispatch(setProducts(data));
      });
  };

  const deleteProduct = (id) => {
    // console.log(id)
    axios
      .delete(`http://localhost:5050/delete-product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        let deleteProduct = res.data;
        if (deleteProduct) {
          getProducts();
        }
      });
  };

  const searchProduct = async (e) => {
    let key = e.target.value;
    if (key) {
      await axios
        .get(`http://localhost:5050/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(result);
          if (result) {
            dispatch(setProducts(result));
          }
        });
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className="product-list">
        <h1>Product List</h1>
        <input
          type="text"
          placeholder="Search product"
          className="search-product-box"
          onChange={searchProduct}
        />
        <ul>
          <li>Sr. No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <MdDeleteForever onClick={() => deleteProduct(item._id)} className="del-btn"/>
                <Link to={`/update/${item._id}`}><BiSolidEditAlt className="edit-btn" /></Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
    </>
  );
};

export default ProductList;
