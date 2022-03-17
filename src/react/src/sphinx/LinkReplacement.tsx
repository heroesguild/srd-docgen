import React from "react";

import {
  domToReact,
  Element,
  DOMNode,
  attributesToProps,
} from "html-react-parser";
import { Link, LinkOverlay } from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { parseReplacer } from "./parseReplacer";

/** Decides what kind of Chakra link component to replace an a tag with */
export const LinkReplacement = ({ domNode }: { domNode: DOMNode }) => {
  if (domNode instanceof Element && domNode.attribs) {
    const { attribs, children } = domNode;
    const props = attributesToProps(domNode.attribs);

    if (attribs.class === "reference internal") {
      return (
        <Link as={ReachLink} to={attribs.href} {...props}>
          {domToReact(children, parseReplacer)}
        </Link>
      );
    } else if (attribs.class === "reference external") {
      return (
        <Link href={attribs.href} isExternal {...props}>
          {/* FIXME: ExternalLinkIcon not displaying */}
          {domToReact(children, parseReplacer)} <ExternalLinkIcon mb={1} />
        </Link>
      );
    } else if (attribs.class === "headerlink") {
      return (
        <LinkOverlay href={attribs.href} {...props}>
          {/* For now: removing the paragraph icon and lifting the link to the header itself */}
        </LinkOverlay>
      );
    } else {
      console.error("Unhandled parsed html link type: ", attribs);
      return (
        <Link as={ReachLink} to={attribs.href} {...props}>
          {domToReact(children, parseReplacer)}
        </Link>
      );
    }
  }
  return null;
};
