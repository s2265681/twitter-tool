import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import React from "react";
import ArrowSvg from "react:./arrow.svg";

export default ({ children, title }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetEle = useRef(null);

  useEffect(() => {
    if (targetEle.current) {
      const { x, y, width, height } = targetEle.current.getBoundingClientRect();
      const targetLeftPoint = x + width / 2;
      const targetTopPoint = y + height + 8;
      setPosition({
        x: targetLeftPoint,
        y: targetTopPoint,
      });
    }
  }, [targetEle.current]);

  const handleClick = useCallback(() => {
    console.log("click.....");
  }, []);

  const finalChildren = useMemo(() => {
    const childStyles = React.Children.map(
      children,
      (child) => child.props.style
    );
    console.log(childStyles);
    return React.cloneElement(children, {
      onClick: handleClick,
      style: { ...childStyles[0], cursor: "pointer" },
      ref: targetEle,
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    });
  }, [children]);

  return (
    <div className="relative">
      {finalChildren}
      {open && (
        <div
          className="tip fixed w-fit px-3 py-1 h-[30px] bg-[#1D2129] rounded-sm "
          style={{
            top: position.y + "px",
            left: position.x + "px",
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-white text-[14px]">{title}</div>
          <ArrowSvg
            className=" absolute left-1/2 top-0"
            style={{
              transform: "translate(-50%, -4px)",
            }}
          ></ArrowSvg>
        </div>
      )}
    </div>
  );
};
