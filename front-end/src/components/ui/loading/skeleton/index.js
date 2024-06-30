import React from "react";

export default function UILoadingSkeleton({width, height, className}) {
  return <div style={{height: `${height}px`, width: `${width}px`}} className={`animate-pulse place-items-center bg-gray-400 ${className ? className : ""}`}></div>;
}
