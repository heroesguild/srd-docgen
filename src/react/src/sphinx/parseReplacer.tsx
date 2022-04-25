import React from "react";
import {
  domToReact,
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";
import {
  As,
  Badge,
  Box,
  Code,
  Heading,
  LinkBox,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { LinkReplacement } from "./LinkReplacement";
import { DivReplacement } from "./DivReplacement";
import { TableReplacement } from "./TableReplacement";

const headingSizeDict: Record<string, string> = {
  h1: "2xl",
  h2: "xl",
  h3: "lg",
  h4: "md",
  h5: "sm",
};

/** Replaces raw HTML nodes with Chakra UI React component counterparts */
export const parseReplacer: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, name, children } = domNode;
      const props = attributesToProps(attribs);
      switch (name) {
        case "a":
          return <LinkReplacement domNode={domNode} />;
        case "div":
          return <DivReplacement domNode={domNode} />;
        case "code":
          return <Code {...props}>{domToReact(children, parseReplacer)}</Code>;
        // Headings
        case name.match(/h\d+/)?.input:
          return (
            <LinkBox>
              <Heading
                as={name as As<any>}
                size={headingSizeDict[name] ?? "sm"}
                {...props}
              >
                {domToReact(children, parseReplacer)}
              </Heading>
            </LinkBox>
          );
        case "li":
          return (
            <ListItem {...props}>
              {domToReact(children, parseReplacer)}
            </ListItem>
          );
        case "ol":
          return (
            <OrderedList {...props}>
              {domToReact(children, parseReplacer)}
            </OrderedList>
          );
        case "p":
          return <Text {...props}>{domToReact(children, parseReplacer)}</Text>;
        case "pre":
          return (
            <Code p={3} {...props}>
              {domToReact(children, parseReplacer)}
            </Code>
          );
        case "em":
        case "strong":
        case "i":
        case "u":
        case "abbr":
        case "cite":
        case "del":
        case "em":
        case "ins":
        case "kbd":
        case "mark":
        case "s":
        case "samp":
        case "sub":
        case "sup":
          return <Text as={name}>{domToReact(children, parseReplacer)}</Text>;
        case "span":
          return <span {...props}>{domToReact(children, parseReplacer)}</span>;
        case "table":
        case "thead":
        case "th":
        case "tbody":
        case "tfoot":
        case "tr":
        case "td":
        case "caption":
          return <TableReplacement domNode={domNode} />;
        case "ul":
        case "dl":
          return (
            <UnorderedList {...props}>
              {domToReact(children, parseReplacer)}
            </UnorderedList>
          );
        // Dictionary term (for glossary)
        case "dt":
          return (
            <Badge variant="outline" {...props}>
              {domToReact(children, parseReplacer)}
            </Badge>
          );
        // Dictionary definition (for glossary)
        case "dd":
          return (
            <Box ml={3} {...props}>
              {domToReact(children, parseReplacer)}
            </Box>
          );
        // TODO: images
        default:
          console.log("Unaccounted for html element to parse:", name);
          return <>{domToReact(children, parseReplacer)}</>;
      }
    }
  },
};
