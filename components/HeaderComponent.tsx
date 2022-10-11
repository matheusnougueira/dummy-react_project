import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";

function HeaderComponent(props: any) {
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-1 justify-items-center content-center items-center">
      <div className="flex cursor-pointer invisible lg:visible">
        <a href="/products">
        Dummy<b>JSON</b>
        </a>
      </div>
      <SearchComponent />
      <div>
      <span className="invisible lg:visible"> <b>Olá!</b> {userName}
      </span>
      </div>
    </div>
  );
}

export default HeaderComponent;
