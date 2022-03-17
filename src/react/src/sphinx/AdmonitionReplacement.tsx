import React from "react";
import {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";

import { Admonition } from "../components/Admonition";
import { parseReplacer } from "./parseReplacer";

const findChild = (children: DOMNode[], className: string) => {
  return children.filter((c) => {
    if (c instanceof Element && c.attribs) {
      return c.attribs.class === className;
    }
    return false;
  });
};

export const AdmonitionReplacement = ({ domNode }: { domNode: DOMNode }) => {
  if (domNode instanceof Element && domNode.attribs) {
    const { attribs, children } = domNode;
    const props = attributesToProps(attribs);
    const title = domToReact(
      findChild(children, "admonition-title"),
      parseReplacer
    );

    const description = domToReact(
      findChild(children, "simple"),
      parseReplacer
    );

    return <Admonition description={description} title={title} {...props} />;
  }
  return null;
};
