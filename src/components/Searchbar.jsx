import React from "react";
import { Icon } from '@iconify/react';

const SearchBar = () => {
  return (
   
    <div class="d-flex form-inputs">
    <input class="form-control" type="text"  placeholder="Search by addres or hash txn"></input>
    <button className="btn"><Icon icon="bx:search" color="#21bfdc" width="30" hFlip={true} /></button></div> 

  );
}

export default SearchBar;