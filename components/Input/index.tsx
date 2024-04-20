import classNames from "classnames";
import React, { useState } from "react";
import SearchSvg from "react:./search.svg";
import "./index.scss";

export default ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="tt_input_wrapper flex items-center px-3 gap-[6px] h-[34px] rounded-lg w-full">
      <SearchSvg className="w-[18px] h-[18px] search_svg"></SearchSvg>
      <input className="tt_input w-full" placeholder={placeholder}></input>
    </div>
  );
};
