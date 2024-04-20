import Input from "~components/Input";
import Dropdown from "../../../../components/Dropdown";
import { created_at, followers_count, following_count } from "./config";
import React from "react";

export default () => {
  console.log(
    document.documentElement.className,
    "document.documentElement.className;;"
  );
  return (
    <div>
      <div className="flex items-center gap-4 justify-start mt-5">
        <Dropdown
          options={followers_count}
          defaultValue=""
          onSelect={(item) => {
            console.log(item);
          }}
          className="flex-1"
          label="followers"
        ></Dropdown>
        <Dropdown
          options={following_count}
          defaultValue=""
          onSelect={(item) => {
            console.log(item);
          }}
          className="flex-1"
          label="following"
        ></Dropdown>
        <Dropdown
          options={created_at}
          defaultValue=""
          onSelect={(item) => {
            console.log(item);
          }}
          className="flex-1"
          label="Joined"
        ></Dropdown>
      </div>
      <div className="mt-[10px] mb-[10px] w-full">
        <Input placeholder="search anything"></Input>
      </div>
    </div>
  );
};
