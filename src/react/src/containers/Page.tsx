import * as React from "react";
import { useRouteData } from "react-static";
import parse from "html-react-parser";
import { SphinxPage as SphinxPageType } from "../sphinx";
import { parseReplacer as options } from "../sphinx/parseReplacer";

// const Page = () => {
const SphinxPage = () => {
  const { data }: { data: SphinxPageType } = useRouteData();
  console.log(data);

  return <div>{parse(data.body, options)}</div>;
};

export default SphinxPage;
