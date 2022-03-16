import React from "react";
import {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
  attributesToProps,
} from "html-react-parser";
import {
  Badge,
  Box,
  Code,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const headingSizeDict: Record<string, string> = {
  h1: "2xl",
  h2: "xl",
  h3: "lg",
  h4: "md",
  h5: "sm",
};

/** Decides what kind of Chakra link component to replace an a tag with */
const linkReplacer = (attribs: Record<string, string>, children: DOMNode[]) => {
  if (attribs.class === "reference internal") {
    return (
      <Link as={ReachLink} to={attribs.href}>
        {domToReact(children, parseReplacer)}
      </Link>
    );
  } else if (attribs.class === "reference external") {
    <Link href={attribs.href} isExternal>
      {domToReact(children, parseReplacer)} <ExternalLinkIcon mx="2px" />
    </Link>;
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
        case "a":
          return linkReplacer(attribs, children);
        case "div":
          return <Box>{domToReact(children, parseReplacer)}</Box>;
        case "code":
          return <Code>{domToReact(children, parseReplacer)}</Code>;
        // Headings
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
        case "ol":
          return (
            <OrderedList>{domToReact(children, parseReplacer)}</OrderedList>
          );
        case "p":
          return <Text>{domToReact(children, parseReplacer)}</Text>;
        case "pre":
          return <Text as="pre">{domToReact(children, parseReplacer)}</Text>;
        case "span":
          // TODO: this would probably be good to do in all of these components?
          const props = attributesToProps(domNode.attribs);
          return <span {...props}>{domToReact(children, parseReplacer)}</span>;
        case "ul":
        case "dl":
          return (
            <UnorderedList>{domToReact(children, parseReplacer)}</UnorderedList>
          );
        // TODO: admonition <div class=\"admonition note\">
        // Dictionary term (for glossary)
        case "dt":
          return (
            <Badge variant="outline">
              {domToReact(children, parseReplacer)}
            </Badge>
          );
        // Dictionary definition (for glossary)
        case "dd":
          return <Box ml={3}>{domToReact(children, parseReplacer)}</Box>;
        default:
          console.error("Unaccounted for html element to parse:", name);
          return <>{domToReact(children, parseReplacer)}</>;
      }
    }
  },
};
