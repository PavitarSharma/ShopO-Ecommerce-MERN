import React from "react";

interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return <h3 className="md:text-3xl text-2xl font-bold">{title}</h3>;
};

export default Title;
