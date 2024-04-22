import Input from "~components/Input";
import Dropdown from "../../../components/Dropdown";
import { created_at, followers_count, following_count } from "../config";
import React from "react";

export default ({ filters }) => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-4 justify-start mt-5">
        <Dropdown
          options={filters.followers}
          defaultValue=""
          onSelect={(item) => {
            console.log("当前选中的 followers是 ", item);
          }}
          className="flex-1"
          label="followers"
        ></Dropdown>
        <Dropdown
          options={filters.following}
          defaultValue=""
          onSelect={(item) => {
            console.log("当前选中的 following  ", item);
          }}
          className="flex-1"
          label="following"
        ></Dropdown>
        <Dropdown
          options={filters.created_at}
          defaultValue=""
          onSelect={(item) => {
            console.log("当前选中的 Joined  ", item);
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
