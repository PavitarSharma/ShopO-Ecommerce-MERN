import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[91%] w-full mx-auto h-full">{children}</div>;
};

export default Container;
