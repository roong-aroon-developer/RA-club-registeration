import React from "react";
import Searchbar from "../component/Seachbar"

import { AuthContext } from "./Store/Context";


const Searchbox: React.FC = () => {

  const { checkSearch } = React.useContext(AuthContext);

  const searchHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let keyword = e.target.value;
    checkSearch(keyword);
  };

  return (
    <Searchbar onSearch={searchHandler}/>
  );
};

export default Searchbox;
