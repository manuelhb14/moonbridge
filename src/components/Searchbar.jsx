import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { NavLink } from "react-router-dom";
const SearchBar = () => {

  const [search, setSearch] = useState("");

  return (
    <div class="d-flex form-inputs">

      <input class="form-control" type="text"  placeholder="Search transaction hash" value={search} onChange={(e) => setSearch(e.target.value)} />
      <NavLink to={`/tx/${search}`} className="btn">
        <Icon icon="bx:search" color="#21bfdc" width="20" hFlip={true} />
      </NavLink>
    </div> 


  );
}

export default SearchBar;