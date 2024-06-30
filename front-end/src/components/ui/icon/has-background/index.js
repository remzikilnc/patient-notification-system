import React from "react";

export default function UIIconHasBackground({Icon, className, mainClassName, iconClassName = "", text, isActive}) {
  return (
    <div className={`bg-white text-theme border border-gray-300 hover:border-gray-500 cursor-pointer rounded flex flex-row items-center justify-center ${isActive ? " !text-themeActiveText !bg-themeSecondary " : null} ${mainClassName}`}>
      <div className={`w-9 h-9 flex justify-center items-center ${className}`}>
        <Icon className={iconClassName} />
      </div>
      {text && <span className="pr-2 text-xs">{text}</span>}
    </div>
  );
}
