import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Breakdum, DescriptionBox, ProductDetails, RelatedProduct } from "../../Component";
import { ShopContainer } from "../../context/ShopContext";
export const Product = () => {
  const { all_product } = useContext(ShopContainer);
  const { productId } = useParams();

  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breakdum product={product} />
      <ProductDetails product={product} />
      <DescriptionBox />
      <RelatedProduct/>
    </div>
  );
};
