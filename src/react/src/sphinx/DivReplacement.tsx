import React from "react";
import {
  DOMNode,
  domToReact,
  Element,
  attributesToProps,
} from "html-react-parser";
import { Box } from "@chakra-ui/react";
import { AdmonitionReplacement } from "./AdmonitionReplacement";
import { parseReplacer } from "./parseReplacer";

export const DivReplacement = ({ domNode }: { domNode: DOMNode }) => {
  if (domNode instanceof Element && domNode.attribs) {
    const { attribs, children } = domNode;
    const props = attributesToProps(attribs);

    if (attribs.class === "admonition note") {
      return <AdmonitionReplacement domNode={domNode} />;
    } else if (attribs.class.includes("highlight-default")) {
      console.log("ding!");
      return <>{domToReact(children, parseReplacer)}</>;
    } else if (attribs.class === "highlight") {
      // If we want to style the code boxes
      return <Box {...props}>{domToReact(children, parseReplacer)}</Box>;
    }
    return <Box {...props}>{domToReact(children, parseReplacer)}</Box>;
  }
  return null;
};
