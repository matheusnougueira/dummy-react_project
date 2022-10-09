import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonPagination from "../../components/ButtonPagination";
import CardProduct from "../../components/CardProduct";
import axios from "axios";

// export const getStaticProps = async (context) => {
//   console.log(context)
//   const responseProducts = await fetch("https://dummyjson.com/products");
//   const data = await responseProducts.json();

//   return {
//     // revalidate: 20,
//     props: {
//       products: data.products || [],
//     },
//   };
// };

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { page, search } = query;
  console.log({ search });
  const params = new URLSearchParams([["q", search]]);
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
      page: page || 1,
      totalItems: Number(data.total),
      itensPerPage: 12,
      search: search || null,
    },
  };
};

const Products = (props) => {
  const [numPages, setNumPages] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  const actualPage = Number(props.page);
  const total = props.totalItems;
  const itensPerPage = props.itensPerPage;
  const products = props.products;

  const calculateNumPages = () => {
    const _numPages = [];
    let _page = Number(props.page);

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
        if (
          itensPerPage * _numPage <= total &&
          itensPerPage * _numPage + (total % _numPage) <= total
        )
          _numPages.push(_numPage);
      }
    }

    setNumPages([..._numPages]);
  };

  const onSearch = () => {
    window.location = `/Products?search=${textSearch}`;
  };

  useEffect(() => {
    calculateNumPages();
  }, []);

  return (
    <div className="py-2">
      {/* Pesquisa */}
      <div className="flex justify-center mt-4">
        <div className="rounded-md px-1 drop-shadow-md bg-slate-50">
          <input
            type="text"
            onChange={(e) => setTextSearch(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && onSearch()}
            className="bg-transparent p-1"
            placeholder="Pesquisar produto..."
          />
          <span
            onClick={onSearch}
            className="border-l-2 border-solid px-0.5 ml-1 cursor-pointer transition duration-200 hover:bg-slate-200"
          >
            🔍
          </span>
        </div>
      </div>

      {/* Filtro de pesquisa */}
      {props.search && (
        <div className="px-10 pt-5">
          Filtrando resultados por:{" "}
          <span className="p-1 px-3 bg-slate-300 rounded-md flex w-fit items-center">
            {props.search}
            <span
              onClick={() => (window.location = "/Products")}
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
          : products.map((el) => <CardProduct product={el} />)}
      </div>

      {/* Paginação */}
      <div className="flex justify-center py-6">
        {/* Botão de "<" */}
        {!Number(props.page < 2) && (
          <a
            href={`/Products?page=${props.page - 1}`}
            className="no-underline flex"
          >
            <ButtonPagination>{"<"}</ButtonPagination>
          </a>
        )}

        {/* Botões da paginação */}
        {numPages.map((el, i) => (
          <a href={`/Products?page=${el}`} className="no-underline flex" key={i}>
            <ButtonPagination page={props.page}>{el}</ButtonPagination>
          </a>
        ))}

        {/* Botãod de ">" */}
        {itensPerPage * actualPage + 1 <= total &&
          itensPerPage * actualPage + 1 + (total % actualPage) <= total && (
            <a
              href={`/Products?page=${Number(props.page) + 1}`}
              className="no-underline flex"
            >
              <ButtonPagination>{">"}</ButtonPagination>
            </a>
          )}
      </div>
      {/* Fim paginação */}
    </div>
  );
};

export default Products;
