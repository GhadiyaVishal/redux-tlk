import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUSES } from "../store/productSlice";
import { useSelector } from "react-redux/es/exports";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector(state => state.product);
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  const handleAdd = product => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h3>LOADING....</h3>;
  }

  if (status === STATUSES.ERROR) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <div className="productsWrapper">
      {products.map(product => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="pr_img" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
// fetch("https://fakestoreapi.com/products")
//   .then(res => res.json())
//   .then(json => console.log(json));
