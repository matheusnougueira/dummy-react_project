import React from "react";

function ButtonPagination(props) {
  return (
    <span className={`cursor-pointer pt-1 px-2 mx-0.5 drop-shadow-md 
    rounded-md border-solid border-2 transition duration-150 
    hover:border-slate-400 ${props.page == props.children ? "border-slate-500 bg-slate-200" : "bg-slate-50 "} `}>
      {props.children}
    </span>
  );
}

export default ButtonPagination;
