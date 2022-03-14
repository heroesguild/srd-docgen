import React from "react";
import {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import {
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";
// import { LinkIcon } from "@chakra-ui/icons";

const headingSizeDict: Record<string, string> = {
  h1: "2xl",
  h2: "xl",
  h3: "lg",
  h4: "md",
  h5: "sm",
};

const linkReplacer = (attribs: Record<string, string>, children: DOMNode[]) => {
  if (attribs.class === "reference internal") {
    return (
      <Link as={ReachLink} to={attribs.href}>
        {domToReact(children, parseReplacer)}
      </Link>
    );
  } else if (attribs.class === "headerlink") {
    return (
      <LinkOverlay href={attribs.href}>
        {/* For now: removing the paragraph icon and lifting the link to the header itself */}
      </LinkOverlay>
    );
  } else {
    console.error("Unhandled parsed html link type: ", attribs);
    return (
      <Link as={ReachLink} to={attribs.href}>
        {domToReact(children, parseReplacer)}
      </Link>
    );
  }
};

/** Replaces raw HTML nodes with Chakra UI React component counterparts */
export const parseReplacer: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, name, children } = domNode;
      switch (name) {
        case name.match(/h\d+/)?.input:
          return (
            <LinkBox>
              <Heading as={name as any} size={headingSizeDict[name] ?? "sm"}>
                {domToReact(children, parseReplacer)}
              </Heading>
            </LinkBox>
          );
        case "li":
          return <ListItem>{domToReact(children, parseReplacer)}</ListItem>;
        case "a":
          return linkReplacer(attribs, children);
        case "p":
          return <Text>{domToReact(children, parseReplacer)}</Text>;
        case "ul":
          return (
            <UnorderedList>{domToReact(children, parseReplacer)}</UnorderedList>
          );
        // TODO:
        // case "div":
        // return <>{domToReact(children, parseReplacer)}</>
        // TODO
        // case "span":
        // return <>{domToReact(children, parseReplacer)}</>
        default:
          console.error("Unaccounted for html element to parse:", name);
          return <>{domToReact(children, parseReplacer)}</>;
      }
    }
  },
};
