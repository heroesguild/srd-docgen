import React from "react";

import { Container } from "@chakra-ui/react";
import { useRouteData } from "react-static";
import { tocParser as options } from "./tocParser";
import parse from "html-react-parser";

export const TOC = () => {
  const { indexContext } = useRouteData();
  return <Container>{parse(indexContext.body, options)}</Container>;
};
