import React from "react";

const Card = ({ children, shadow="sm" }: { children: React.ReactNode, shadow?: string }) => {
  return <div className={`w-full h-auto rounded-lg bg-white shadow-${shadow} p-5`}>{children}</div>;
};

export default Card;