import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import React from "react";
import { parseReplacer } from "./parseReplacer";

export const TableReplacement = ({ domNode }: { domNode: DOMNode }) => {
  if (domNode instanceof Element && domNode.attribs) {
    const { attribs, name, children } = domNode;
    const props = attributesToProps(attribs);

    switch (name) {
      case "table":
        return <Table {...props}>{domToReact(children, parseReplacer)}</Table>;
      case "th":
      case "thead":
        return <Thead {...props}>{domToReact(children, parseReplacer)}</Thead>;
      case "tbody":
        return <Tbody {...props}>{domToReact(children, parseReplacer)}</Tbody>;
      case "tf":
        return <Tfoot {...props}>{domToReact(children, parseReplacer)}</Tfoot>;
      case "tr":
        return <Tr {...props}>{domToReact(children, parseReplacer)}</Tr>;
      case "td":
        return <Td {...props}>{domToReact(children, parseReplacer)}</Td>;
      case "caption":
        return (
          <TableCaption {...props}>
            {domToReact(children, parseReplacer)}
          </TableCaption>
        );
      default:
        console.log("Unaccounted for table element: ", domNode);
        return <>{domToReact(children, parseReplacer)}</>;
    }
  } else {
    return null;
  }
};
