import Input from "~components/Input";
import Dropdown from "../../../components/Dropdown";
import { created_at, followers_count, following_count } from "../config";
import React, { useRef, useState } from "react";
import CloseSvg from "react:./close.svg";
import { downloadFile, getUserName, senChomeMessage } from "~utils";
import { message } from "antd";

export default ({ filters, setParams, loading }) => {
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
  const [usersInfo, setUsersInfo] = useState<
    { id: string; screen_name: string }[]
  >([]);
  // solana // TheMotre

  const interact_idsStr = () => {
    return usersInfo.map((el) => el.id).join(",");
  };

  const searchUserInfo = (screen_name) => {
    if (!screen_name) return;
    const handleScreen_name = screen_name.replace("@", "");
    senChomeMessage({
      action: "search_user_info",
      params: {
        screen_name: handleScreen_name,
      },
      response: ({ data }) => {
        setUsersInfo((_usersInfo) => {
          let newUserInfo = [];
          _usersInfo.map((el) => {
            if (el.screen_name === handleScreen_name && data.id) {
              newUserInfo.push({
                screen_name: handleScreen_name,
                id: data.id,
              });
            } else {
              newUserInfo.push(el);
            }
          });
          return newUserInfo;
        });
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
            if (usersInfo.length < 10) {
              if (inputRef.current.value) {
                setUsersInfo([
                  ...usersInfo,
                  {
                    screen_name: inputRef.current.value,
                    id: "",
                  },
                ]);
                setTimeout(() => {
                  searchUserInfo(value);
                  inputRef.current.value = "";
                }, 10);
              }
            } else {
              message.error("input no more than 10@");
            }
          }}
        ></Input>
        <div
          className="text-white bg-[#1E9CF1] w-[76px] h-[34px] flex justify-center items-center rounded cursor-pointer ml-2"
          onClick={() => {
            if (usersInfo.length < 10) {
              if (inputRef.current.value) {
                setUsersInfo([
                  ...usersInfo,
                  {
                    screen_name: inputRef.current.value,
                    id: "",
                  },
                ]);
                setTimeout(() => {
                  searchUserInfo(inputRef.current.value);
                  inputRef.current.value = "";
                }, 10);
              }
              setTimeout(() => {
                setParams((_params) => ({
                  ..._params,
                  interact_ids: interact_idsStr(),
                }));
                message.destroy();
              }, 1000);
            }
          }}
        >
          search
        </div>
        <div
          className="text-white bg-[#1E9CF1] w-[76px] h-[34px] flex justify-center items-center rounded cursor-pointer"
          onClick={() => {
            message.loading("loading...");
            senChomeMessage({
              action: "export_user_interact",
              params: {
                screen_name: getUserName() || "solana",
                created_at: "",
                followers: "",
                following: "",
                interact_ids: interact_idsStr(),
              },
              response: (data) => {
                message.destroy();
                message.success("export success!");
              },
            });
          }}
        >
          export
        </div>
      </div>
      {/* 搜索词的模块 */}
      {usersInfo.length > 0 && (
        <div className="flex w-full flex-wrap gap-[10px] my-4">
          {usersInfo.map((user) => {
            return (
              <div
                key={user.id}
                className="w-fit gap-3 px-3 py-3 rounded-xl flex justify-between bg-[rgba(255,197,139,0.2)] items-center"
              >
                {user.screen_name && (
                  <div className="text-[#F17F0B] text-[12px]">
                    @{user.screen_name}
                  </div>
                )}
                <CloseSvg
                  className="flex-none cursor-pointer"
                  onClick={() => {
                    const newUsersInfo = usersInfo.filter(
                      (item) => item.id !== user.id
                    );
                    setUsersInfo(newUsersInfo);
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
