import React from "react";
import UILoadingSkeleton from "@/components/ui/loading/skeleton";
const UITableLoading = () => {
  return (
    <>
      <UILoadingSkeleton height={600} />
      <UILoadingSkeleton className=" mt-1" height={50} />
    </>
  );
};

export default UITableLoading;
