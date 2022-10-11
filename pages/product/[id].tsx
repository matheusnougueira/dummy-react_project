import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../Interfaces/IProduct";
import HeaderComponent from "../../components/HeaderComponent";

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

interface IProps {
  id: number | string;
}

const product = (props: IProps) => {
  const [product, setProduct] = useState<null | IProduct>(null);
  const [imageSelected, setImageSelected] = useState<any>(null);

  const getProduct = async () => {
    const { id } = props;
    try {
      const { data } = await axios(
        `https://dummyjson.com/auth/products/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setProduct({ ...data });
      if (data?.images) setImageSelected(data.images[0]);
    } catch (error: any) {
      const status = error.response.status;
      if (status >= 401) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (product == null) {
    return <div></div>;
  } else {
    return (
      <div>
        <HeaderComponent />
        <div className="flex p-5 justify-center items-center">
          <div className="flex flex-col md:flex-row bg-slate-100 p-8 rounded-md">
            <div className="flex flex-row md:flex-col">
              {product?.images &&
                product.images.map((el: string, i: number) => (
                  <img
                    alt="Imagem do produto"
                    key={i}
                    src={el}
                    className={`first:mt-0 my-1 border-solid border-2 ${
                      imageSelected == el && "border-blue-500"
                    } ml-1 w-12 h-12 object-contain bg-slate-200 ml-2 rounded-md
                    cursor-pointer`}
                    onMouseOver={() => setImageSelected(el)}
                  />
                ))}
            </div>
            <img
              alt="Imagem do produto"
              src={imageSelected}
              className="w-96 h-96 object-contain bg-slate-200 ml-2 rounded-md"
            />
            <div className="flex w-80 pl-5 flex-col">
              <span className="font-bold text-xl">{product.title}</span>
              <span>{product.description}</span>

              <span className="text-xl mt-5 text-slate-700">
                <span className="font-bold">Categoria: </span>
                <span>{product.category}</span>
              </span>
              <div className="flex mr-1 items-baseline justify-between mt-5">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-slate-700">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                  <span className="text-slate-400 line-through ml-2">
                    {(
                      product.price * (product.discountPercentage / 100) +
                      product.price
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                <span className="ml-2 text-green-600">
                  {product.discountPercentage.toFixed()}% OFF
                </span>
              </div>

              <span className="text-xl mt-5 text-slate-700">
                <span className="font-bold">Em: </span>
                <span className="text-green-600">
                  10x{" "}
                  {(product.price / 10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  sem juros
                </span>
              </span>

              <span className="text-xl mt-5 text-slate-700">
                <span className="font-bold">Total disponível: </span>
                <span className="text-green-600">{product.stock}</span>
              </span>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default product;
