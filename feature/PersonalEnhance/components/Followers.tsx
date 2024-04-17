import React, { useRef } from "react";
import { Button, Dropdown, Icon, Input, Menu, message, Tooltip } from "antd";
import { created_at, followers_count, following_count } from "./config";

const mockListData = {
  list: [
    {
      image:
        "https://pbs.twimg.com/profile_images/1484544141904457732/C7VBlmXJ_reasonably_small.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1758076307181826049/C8g29_EW_normal.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1758076307181826049/C8g29_EW_normal.jpg",
      name: "XCaptain",
      sceen_name: "@XCaptaincc",
      description:
        "推上发言只代表个人观点 kepp real/デジタル爱好者/メーカー/Developer/日本语/",
    },
  ],
  pageIndex: 1,
  pageSize: 50,
};

const { Search } = Input;

const List = () => {
  return (
    <div>
      {mockListData.list.map((item, index) => {
        return (
          <div
            className="cursor-pointer py-3 px-4 hover:bg-[#00000008] flex gap-2 items-start border-solid border-[#00000008] border-[1px]"
            key={index}
          >
            <img
              src={item.image}
              className="w-[40px] h-[40px] rounded-full"
            ></img>
            <div className="flex flex-col gap-1">
              <div className="text-[rgb(15,20,25)] font-semibold">
                {item.name}
              </div>
              <div className="text-[rgb(83,100,113)]">{item.sceen_name}</div>
              <div className="text-[rgb(15,20,25)]">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const menu1 = (
  <Menu>
    {created_at.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            {item.label}
          </a>
        </Menu.Item>
      );
    })}
  </Menu>
);

const menu2 = (
  <Menu>
    {followers_count.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            {item.label}
          </a>
        </Menu.Item>
      );
    })}
  </Menu>
);

const menu3 = (
  <Menu>
    {following_count.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            {item.label}
          </a>
        </Menu.Item>
      );
    })}
  </Menu>
);

const SearchCom = () => {
  return (
    <div className="px-8 my-5 mt-7">
      <Search
        placeholder="input search text"
        onSearch={(value) => console.log(value)}
        // style={{ width: 200 }}
      />
    </div>
  );
};

const Filter = () => {
  const Xref = useRef();
  return (
    <div className="flex items-center gap-4 px-8" ref={Xref}>
      <Dropdown
        overlay={menu1}
        getPopupContainer={() => Xref.current}
        trigger={["click"]}
      >
        <a
          className="ant-dropdown-link !text-[#666]"
          onClick={(e) => e.preventDefault()}
        >
          created_at 2023 <Icon type="down" />
        </a>
      </Dropdown>
      <Dropdown
        overlay={menu2}
        getPopupContainer={() => Xref.current}
        trigger={["click"]}
      >
        <a
          className="ant-dropdown-link !text-[#666]"
          onClick={(e) => e.preventDefault()}
        >
          followers_count <Icon type="down" />
        </a>
      </Dropdown>
      <Dropdown
        overlay={menu3}
        getPopupContainer={() => Xref.current}
        trigger={["click"]}
      >
        <a
          className="ant-dropdown-link !text-[#666]"
          onClick={(e) => e.preventDefault()}
        >
          following_count <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};

export default () => {
  return (
    <div className="" id="xxx">
      <Filter></Filter>
      <SearchCom></SearchCom>
      <List></List>
    </div>
  );
};
