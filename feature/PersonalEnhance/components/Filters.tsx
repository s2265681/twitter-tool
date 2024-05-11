import Input from "~components/Input";
import Dropdown from "../../../components/Dropdown";
import { created_at, followers_count, following_count } from "../config";
import React, { useRef, useState } from "react";
import CloseSvg from "react:./close.svg";
import { senChomeMessage } from "~utils";

export default ({ filters, setParams, loading }) => {
  console.log(filters, "ddddd");
  return (
    <div className="px-4 my-5">
      <SearchInput setParams={setParams}></SearchInput>
      <div className="flex items-center gap-4 justify-start mt-4">
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
          loading={loading}
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
          loading={loading}
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
          loading={loading}
        ></Dropdown>
      </div>
    </div>
  );
};

const SearchInput = ({ setParams }) => {
  const inputRef = useRef(null);
  const [users, setUsers] = useState<string[]>([]);
  const [interact_ids, setInteract_ids] = useState(["1019296470942375936"]);
  // solana

  console.log(interact_ids, "interact_ids");
  const searchUserInfo = (screen_name) => {
    senChomeMessage({
      action: "search_user_info",
      params: {
        screen_name: screen_name,
      },
      response: ({ data }) => {
        interact_ids.push(data);
        setInteract_ids([...interact_ids]);
      },
    });
  };

  return (
    <div>
      <div className="mt-[10px] mb-[10px] w-full gap-3 flex items-center">
        <Input
          inputRef={inputRef}
          placeholder="input no more than 10@"
          onChange={(value) => {
            if (users.length < 10) {
              setUsers([...users, value]);
              searchUserInfo(value);
            }
            inputRef.current.value = "";
          }}
        ></Input>
        <div
          className="text-white bg-[#1E9CF1] w-[76px] h-[34px] flex justify-center items-center rounded cursor-pointer ml-2"
          onClick={() => {
            if (users.length < 10 && inputRef.current.value) {
              console.log(inputRef.current.value, "curretn,,,,11,");
              setUsers([...users, inputRef.current.value]);
              setParams((_params) => ({
                ..._params,
                interact_ids: interact_ids.join(","),
              }));
            }
            inputRef.current.value = "";
            console.log(users, "users......");
          }}
        >
          search
        </div>
        <div
          className="text-white bg-[#1E9CF1] w-[76px] h-[34px] flex justify-center items-center rounded cursor-pointer"
          onClick={() => {
            console.log("导出");

            senChomeMessage({
              action: "export_user_interact",
              params: {
                screen_name: "solana",
                created_at: "All",
                followers: "All",
                following: "All",
                interact_ids: interact_ids.join(","),
              },
              response: ({ data }) => {
                interact_ids.push(data);
                setInteract_ids([...interact_ids]);
              },
            });
          }}
        >
          expore
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
                    // setInteract_ids([...interact_ids]);
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
