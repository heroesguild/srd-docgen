import React from "react";
import {
  domToReact,
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";
import {
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
                as={name as any}
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
        case "span":
          return <span {...props}>{domToReact(children, parseReplacer)}</span>;
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
        default:
          console.error("Unaccounted for html element to parse:", name);
          return <>{domToReact(children, parseReplacer)}</>;
      }
    }
  },
};
