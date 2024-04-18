import classNames from "classnames";
import React, { useState } from "react";
import ButtonSvg from "react:./buttomArea.svg";
interface Iprops {
  options: {
    key: string;
    label: string;
    rightValue?: string;
  }[];
  value: string;
  setValue: Function;
  className?: string;
}
const Dropdown = ({ options, value, setValue, className }: Iprops) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={classNames(" relative w-auto text-[13px]", className)}>
      <div
        className="flex w-full items-center h-[40px] bg-[rgba(0,0,0,0.1)]"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="flex flex-1  w-full  items-center justify-between gap-1 px-5 ">
          <div>100k-1m</div>
          <div>100</div>
        </div>
        <ButtonSvg className="h-[16px]"></ButtonSvg>
      </div>

      {/* 弹窗 */}
      {visible && (
        <div className="absolute left-0 w-full h-auto rounded-xl shadow ">
          {/* 遮照 */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)] z-[9]"
            onClick={() => {
              setVisible(false);
            }}
          ></div>
          {/* 内容 */}
          <div className="z-[10] w-full h-auto bg-white absolute top-[5px]">
            {options.map((item) => {
              return (
                <div
                  key={item.key}
                  onClick={() => {
                    // item.key
                    console.log(item, "item....");
                    setVisible(false);
                    setValue(item);
                  }}
                  className={classNames(
                    "hover:text-primary hover:bg-[rgba(0,0,0,0.3)] h-[50px] border-b-[1px] border-solid border-[#f00]",
                    "flex justify-between items-center px-5",
                    {
                      "bg-[#0f0]": value === item.key,
                    }
                  )}
                >
                  <div>{item.label}</div>
                  <div>{item.rightValue}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
