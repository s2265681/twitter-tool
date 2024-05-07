import Input from "~components/Input";
import Dropdown from "../../../components/Dropdown";
import { created_at, followers_count, following_count } from "../config";
import React, { useRef, useState } from "react";
import CloseSvg from "react:./close.svg";

export default ({ filters, setParams }) => {
  const inputRef = useRef(null);
  const [users, setUsers] = useState<string[]>([]);
  return (
    <div className="px-4">
      <div className="flex items-center gap-4 justify-start mt-5">
        <Dropdown
          options={filters.followers}
          defaultValue=""
          onSelect={(item) => {
            setParams((_params) => ({
              ..._params,
              followers: item.label,
            }));
          }}
          className="flex-1"
          label="followers"
        ></Dropdown>
        <Dropdown
          options={filters.following}
          defaultValue=""
          onSelect={(item) => {
            setParams((_params) => ({
              ..._params,
              following: item.label,
            }));
          }}
          className="flex-1"
          label="following"
        ></Dropdown>
        <Dropdown
          options={filters.created_at}
          defaultValue=""
          onSelect={(item) => {
            setParams((_params) => ({
              ..._params,
              created_at: item.label,
            }));
          }}
          className="flex-1"
          label="Joined"
        ></Dropdown>
      </div>
      <div className="mt-[10px] mb-[10px] w-full gap-6 flex items-center">
        <Input
          inputRef={inputRef}
          placeholder="input no more than 10@"
          onChange={(value) => {
            // setParams((_params) => ({
            //   ..._params,
            //   text: value,
            // }));
            if (users.length < 10) {
              setUsers([...users, value]);
            }
            inputRef.current.value = "";
          }}
        ></Input>
        <div
          className="text-white bg-[#1E9CF1] w-[76px] h-[34px] flex justify-center items-center rounded cursor-pointer"
          onClick={() => {
            if (users.length < 10 && inputRef.current.value) {
              console.log(inputRef.current.value, "curretn,,,,11,");
              setUsers([...users, inputRef.current.value]);
            }
            inputRef.current.value = "";
            console.log(users, "users......");
          }}
        >
          search
        </div>
      </div>

      {/* 搜索词的模块 */}
      {users.length > 0 && (
        <div className="flex w-full flex-wrap gap-[10px] my-4">
          {users.map((el) => {
            return (
              <div
                key={el}
                className="w-fit gap-3 px-3 py-3 rounded-xl flex justify-between bg-[rgba(255,197,139,0.2)] items-center"
              >
                <div className="text-[#F17F0B] text-[12px]">{el}</div>
                <CloseSvg
                  className="flex-none cursor-pointer"
                  onClick={() => {
                    const newUser = users.filter((item) => item !== el);
                    console.log(newUser, "newUser...");
                    setUsers(newUser);
                  }}
                ></CloseSvg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
