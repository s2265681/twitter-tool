import classNames from "classnames";
import React, { useState } from "react";
import SearchSvg from "react:./search.svg";
import "./index.scss";

export default ({
  placeholder,
  onChange,
  inputRef,
}: {
  placeholder: string;
  onChange;
  inputRef;
}) => {
  return (
    <div className="tt_input_wrapper flex items-center px-3 gap-[6px] h-[34px] rounded-lg w-full">
      <SearchSvg className="w-[18px] h-[18px] search_svg"></SearchSvg>
      <input
        ref={inputRef}
        className="tt_input w-full"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onChange?.(e.target.value);
          }
        }}
      ></input>
    </div>
  );
};
