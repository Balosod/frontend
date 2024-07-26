import { FC, useEffect } from "react";
import Nav from "./Nav";

interface ContainerStructure {
  children: any;
}

const Container: FC<ContainerStructure> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 ">
      <Nav />
      <div className="w-full h-full"> {children}</div>
    </div>
  );
};

export default Container;
