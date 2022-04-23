import React from "react";

import {
  // Accordion,
  // AccordionItem,
  // AccordionButton,
  // AccordionPanel,
  // AccordionIcon,
  // Box,
  Container,
} from "@chakra-ui/react";
import { useRouteData } from "react-static";
import { tocParser as options } from "./tocParser";
import parse from "html-react-parser";

export const TOCAccordion = () => {
  const { indexContext } = useRouteData();
  console.log(indexContext.body);
  // return <Container>{parse(indexContext.body)}</Container>;
  return <Container>{parse(indexContext.body, options)}</Container>;
};
