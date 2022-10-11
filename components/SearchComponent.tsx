import React, { useState } from "react";

function SearchComponent() {
  const [textSearch, setTextSearch] = useState<string>("");

  const onSearch = () => {
    window.location.href = `/products?search=${textSearch}`;
  };

  return (
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
  );
}

export default SearchComponent;
