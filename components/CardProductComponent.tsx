import Link from "next/link";
import React from "react";
import { IProduct } from "../Interfaces/IProduct";

interface ICardProduct {
  product: IProduct;
}

function CardProductComponent({ product }: ICardProduct) {
  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <div
        className="flex-auto w-52 h-96 bg-slate-50 mt-5 ml-5 p-3 drop-shadow-md rounded-md 
                  cursor-pointer transition duration-150 hover:drop-shadow-xl
                  hover:scale-105"
      >
        <div className="flex justify-center">
          <img
            alt="Imagem dos produtos"
            src={product.images[0]}
            className="object-contain h-48 w-96"
          />
        </div>
        <hr className="mt-1" />

        <div className="flex flex-col h-40 justify-between">
          <div className="text-slate-900 font-bold">{product.title}</div>

          <div className="text-slate-500">
            {product.description.slice(0, 50)}...
          </div>

          <div className="flex mr-1 items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-700">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <span className="ml-2 text-green-600">
              {product.discountPercentage.toFixed()}% OFF
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardProductComponent;
