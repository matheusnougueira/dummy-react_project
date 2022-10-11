import { Context, useEffect, useState } from "react";
import ButtonPaginationComponent from "../../components/ButtonPaginationComponent";
import CardProductComponent from "../../components/CardProductComponent";
import SearchComponent from "../../components/SearchComponent";
import axios from "axios";
import { IProduct } from "../../Interfaces/IProduct";
import HeaderComponent from "../../components/HeaderComponent";

interface IQueryContext {
  page: string;
  search: string;
}

interface IContext {
  query: IQueryContext;
}

export const getServerSideProps = async (context: IContext) => {
  const { query } = context;
  const { page, search } = query;
  const skip = !page || page == "1" ? 0 : 12 * (Number(page) - 1);
  const params = new URLSearchParams({
    q: search,
    skip: skip.toString(),
    limit: "12",
  });
  let url = "";
  if (search) {
    url = "https://dummyjson.com/products/search";
  } else {
    url = "https://dummyjson.com/products";
  }

  const { data } = await axios.get(url, {
    params,
  });

  return {
    props: {
      products: data.products || [],
      page: Number(page) || 1,
      totalItems: Number(data.total),
      itensPerPage: 12,
      search: search || null,
    },
  };
};

interface IProps {
  products: [];
  page: number;
  totalItems: number;
  itensPerPage: number;
  search: string | null;
}

const products = (props: IProps) => {
  const [numPages, setNumPages] = useState<number[]>([]);

  const actualPage = Number(props.page);
  const total = props.totalItems;
  const itensPerPage = props.itensPerPage;
  const products = props.products;

  const calculateNumPages = () => {
    const _numPages: number[] = [];
    const _page: number = Number(props.page);

    // adiciona os botões anteriores à página atual
    for (let i = 2; i >= 1; i--) {
      if (i - _page < 0) {
        _numPages.push(_page - i);
      }
    }

    // adiciona página atual
    _numPages.push(_page);

    // adiciona os botoes posteriores à página atual
    if (!(props.products.length < itensPerPage)) {
      for (let i = 1; i <= 2; i++) {
        const _numPage = _page + i;
        if (itensPerPage * _numPage <= total || (_numPage - 1) * 12 <= total)
          _numPages.push(_numPage);
      }
    }

    setNumPages([..._numPages]);
  };

  useEffect(() => {
    calculateNumPages();
  }, []);

  return (
    <div className="py-2">
      {/* Pesquisa */}
      <HeaderComponent/>

      {/* Filtro de pesquisa */}
      {props.search && (
        <div className="px-10 pt-5">
          Filtrando resultados por:{" "}
          <span className="p-1 px-3 bg-slate-300 rounded-md flex w-fit items-center">
            {props.search}
            <span
              onClick={() => (window.location.href = "/products")}
              className="cursor-pointer ml-1 bg-slate-400 rounded-full w-5 h-5 flex justify-center items-end transition duration-200 hover:bg-red-500 hover:font-bold"
            >
              x
            </span>
          </span>
        </div>
      )}

      {/* Produtos */}
      <div className="flex flex-wrap px-5">
        {products.length == 0
          ? "Não há produtos nessa página."
          : products.map((el: IProduct, i: number) => (
              <CardProductComponent product={el} key={i} />
            ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center py-6">
        {/* Botão de "<" */}
        {!Number(props.page < 2) && (
          <a
            href={`/products?page=${props.page - 1}`}
            className="no-underline flex"
          >
            <ButtonPaginationComponent>{"<"}</ButtonPaginationComponent>
          </a>
        )}

        {/* Botões da paginação */}
        {numPages.map((el: number, i: number) => (
          <a
            href={`/products?page=${el}`}
            className="no-underline flex"
            key={i}
          >
            <ButtonPaginationComponent page={props.page}>
              {el}
            </ButtonPaginationComponent>
          </a>
        ))}

        {/* Botãod de ">" */}
        {itensPerPage * actualPage + 1 <= total &&
          (actualPage - 1) * 12 <= total && (
            <a
              href={`/products?page=${Number(props.page) + 1}`}
              className="no-underline flex"
            >
              <ButtonPaginationComponent>{">"}</ButtonPaginationComponent>
            </a>
          )}
      </div>
      {/* Fim paginação */}
    </div>
  );
};

export default products;
