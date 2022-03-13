import React from "react";
import { domToReact, HTMLReactParserOptions, Element } from "html-react-parser";
import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

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
      const {
        // attribs,
        name,
        children,
      } = domNode;
      switch (name) {
        case name.match(/h\d+/)?.input:
          console.log("returning heading for: ", name);
          return (
            <Heading as={name as any} size={headingSizeDict[name] ?? "sm"}>
              {domToReact(children, parseReplacer)}
            </Heading>
          );
        case "li":
          return <ListItem>{domToReact(children, parseReplacer)}</ListItem>;
        // case "a::
        // return TODO
        case "p":
          return <Text>{domToReact(children, parseReplacer)}</Text>;
        case "ul":
          return (
            <UnorderedList>{domToReact(children, parseReplacer)}</UnorderedList>
          );
      }
    }
  },
};
