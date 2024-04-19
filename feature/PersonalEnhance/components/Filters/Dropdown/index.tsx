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
    <div className={classNames("relative w-auto text-[13px]", className)}>
      <div
        className="flex w-full items-center h-[34px] bg-input_bg  pr-[10px]"
        onClick={() => {
          setVisible(true);
        }}
      >
        {/* <div className="bg-input_default">default</div> */}
        <div className="flex flex-1  w-full  items-center justify-between gap-1 px-2">
          <div>100k-1m</div>
          <div>100</div>
        </div>
        <ButtonSvg className="h-[6px]"></ButtonSvg>
      </div>

      {/* 弹窗 */}
      {visible && (
        <div className="absolute left-0 w-full h-auto rounded-xl shadow ">
          {/* 遮照 */}
          <div
            className="fixed top-0 left-0 w-full h-full z-[9]"
            onClick={() => {
              setVisible(false);
            }}
          ></div>
          {/* 内容 */}
          <div
            className="z-[10] w-full h-auto absolute top-[5px] bg-drowdown_bg rounded-lg overflow-hidden shadow-lg"
            style={{
              boxShadow: "0px -2px 4px 0px rgba(34, 34, 34, 0.10)",
            }}
          >
            {options.map((item, index) => {
              return (
                <div
                  key={item.key}
                  onClick={() => {
                    setVisible(false);
                    setValue(item);
                  }}
                  className={classNames(
                    "hover:text-input_selected hover:bg-[rgba(0,0,0,0.3)] h-[50px] border-b-[1px] border-solid border-[#F5F5F5]",
                    "flex justify-between items-center px-5",
                    "h-[121px] text-input_default",
                    {
                      "text-input_selected bg-color-input-default":
                        value === item.key,
                      // "border-b-[0]": index === options.length - 1,
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
