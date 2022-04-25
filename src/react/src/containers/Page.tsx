import * as React from "react";
import { useRouteData } from "react-static";
import parse from "html-react-parser";
import { SphinxPage as SphinxPageType } from "../sphinx/types";
import { parseReplacer as options } from "../sphinx/parseReplacer";
import { Container } from "@chakra-ui/react";

// const Page = () => {
const SphinxPage = () => {
  const { data }: { data: SphinxPageType } = useRouteData();
  console.log(data);
  if (!data) {
    console.error("Page data is undefined");
    return null;
  }
  return <Container>{parse(data.body, options)}</Container>;
};

export default SphinxPage;
