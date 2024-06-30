import React from "react";
import UILoadingSkeleton from "@/components/ui/loading/skeleton";

const Loading = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-4">
      <UILoadingSkeleton height={40} />
      <UILoadingSkeleton height={140} />
      <UILoadingSkeleton height={40} />
      <UILoadingSkeleton height={40} />
    </div>
  );
};

export default Loading;
