import classNames from "classnames";
import React, { useState } from "react";
import ButtonSvg from "react:./buttomArea.svg";
import MyLoadingSvg from "react:./loading.svg";
import "./index.scss";

interface Iprops {
  options: {
    key: string;
    label: string;
    rightValue?: string;
  }[];
  defaultValue?: string;
  onSelect: Function;
  className?: string;
  label: string;
  loading?: boolean;
}
const Dropdown = ({
  options = [],
  defaultValue,
  onSelect,
  className,
  label,
  loading,
}: Iprops) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState(defaultValue);
  // if (options?.length === 0) return null;
  return (
    <div
      className={classNames(
        "relative w-auto text-[13px] t_drowdown",
        className
      )}
    >
      <div
        className="drowdown_button  flex w-full items-center h-[34px]  pr-[10px] rounded cursor-pointer"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div
          className={classNames(
            "flex flex-1  w-full  items-center justify-between gap-1 px-2",
            {
              drowdown_button_selected: !!value,
            }
          )}
        >
          {value &&
            value.split("--").map((item) => {
              return (
                <div className="item" key={item}>
                  {item}
                </div>
              );
            })}
          {!value && <div>{label}</div>}
        </div>
        <ButtonSvg className="h-[6px] dopwdown_button_icon"></ButtonSvg>
      </div>

      {/* 弹窗 */}
      {visible && (
        <div className="absolute left-0 w-full h-auto rounded-lg drowdown_modal_wrapper">
          {/* 遮照 */}
          <div
            className="fixed top-0 left-0 w-full h-full z-[9]"
            onClick={() => {
              setVisible(false);
            }}
          ></div>
          {/* 内容 */}
          <div className="drowdown_modal_content z-[10] w-full absolute top-[8px] rounded-lg h-[228px] overflow-auto">
            {loading ? (
              <div className="loading_wrapper flex w-full h-full justify-center items-center">
                <MyLoadingSvg className="animate-spin"></MyLoadingSvg>
              </div>
            ) : (
              options.map((item, index) => {
                return (
                  <div
                    key={item.label}
                    onClick={() => {
                      setVisible(false);
                      setValue(
                        item.rightValue
                          ? item.label + "--" + item.rightValue
                          : item.label
                      );
                      onSelect(item);
                    }}
                    className={classNames(
                      "drowdown_modal_content_item",
                      "flex justify-between items-center px-[12px] h-[50px] cursor-pointer select-none",
                      {
                        drowdown_modal_content_item_selected:
                          value === item.label,
                        "!border-b-0": options.length - 1 === index,
                      }
                    )}
                  >
                    <div>{item.label}</div>
                    <div>{item.rightValue}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
