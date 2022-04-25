import React from "react";
import {
  domToReact,
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";

import { LinkReplacement } from "../../sphinx/LinkReplacement";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { TOCAccordion } from "./TOCAccordion";
import { TOCAccordionItem } from "./TOCAccordionItem";

/**
 * Replaces raw HTML nodes with Chakra UI React component counterparts
 * for the Table of Contents */
export const tocParser: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, name, children, parent } = domNode;
      const props = attributesToProps(attribs);
      switch (name) {
        case "a":
          if (attribs.class === "headerlink") return null;

          return <LinkReplacement domNode={domNode} />;
        case "div":
          // Ignoring the divs on the index page for the TOC
          return <>{domToReact(children, tocParser)}</>;
        // removing any html headers generated by the index page to keep just the links
        case "h1":
          return <></>;
        case "li":
          // @ts-expect-error
          if (children.find((c) => c.name === "ul")) {
            // If the li has ul as children, it must be expandable
            return (
              <TOCAccordionItem
                link={domToReact(
                  /* @ts-expect-error */
                  children.filter((c) => c.name === "a"),
                  tocParser
                )}
              >
                {/* The collapsed content */}
                {domToReact(
                  // @ts-expect-error
                  children.filter((c) => c.name === "ul"),
                  tocParser
                )}
              </TOCAccordionItem>
            );
            // @ts-expect-error
          } else if (parent.attribs.name === "ul") {
            return (
              <ListItem {...props}>
                <>{domToReact(children, tocParser)}</>
              </ListItem>
            );
          }

        case "p":
          return null;
        case "ul":
          // The root ul becomes the accordion
          // @ts-expect-error
          if (parent.attribs.class.includes("toctree-wrapper")) {
            return (
              <TOCAccordion>{domToReact(children, tocParser)}</TOCAccordion>
            );
          }
          // @ts-expect-error
          if (children.find((c) => c.name === "ul")) {
            // TODO: should this be a ul?
            return <>{domToReact(children, tocParser)}</>;
            // return (
            //   // <UnorderedList {...props}>
            //     <>{domToReact(children, tocParser)}</>
            //   // </UnorderedList>
            // );
          }
          // TODO: should this be a ul?
          // return <>{domToReact(children, tocParser)}</>;
          return (
            <UnorderedList {...props}>
              {domToReact(children, tocParser)}
            </UnorderedList>
          );

        default:
          console.log("Unaccounted for html element to parse:", name);
          return <></>;
      }
    }
  },
};
