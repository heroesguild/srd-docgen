import React from "react";
import parse from "html-react-parser";
import { tempIndex } from "./tempIndex";
// import { getDocRoutes } from "./getDocRoutes";

export const Router = (): any => {
  // getDocRoutes();
  return <>{parse(tempIndex.body)}</>;
};
