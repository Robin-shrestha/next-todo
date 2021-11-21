import React from "react";

let products = ["prod1", "prod2", "prod3", "prod4"];

const Product = () => {
  return (
    <ul>
      {products.map((item, index) => (
        <li key={index}>
          <a href={`product/${item}`}>{item}</a>
        </li>
      ))}
    </ul>
  );
};

export default Product;
