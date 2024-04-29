import Input from "~components/Input";
import Dropdown from "../../../components/Dropdown";
import { created_at, followers_count, following_count } from "../config";
import React from "react";

export default ({ filters, setParams }) => {
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
      <div className="mt-[10px] mb-[10px] w-full">
        <Input
          placeholder="search anything"
          onChange={(value) => {
            setParams((_params) => ({
              ..._params,
              text: value,
            }));
          }}
        ></Input>
      </div>
    </div>
  );
};
