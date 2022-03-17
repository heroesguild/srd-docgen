import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import { parseReplacer } from "./parseReplacer";

export const AdmonitionReplacement = ({ domNode }: { domNode: DOMNode }) => {
  if (domNode instanceof Element && domNode.attribs) {
    const { attribs, children } = domNode;
    const props = attributesToProps(attribs);
    console.log(domNode);
    return (
      <Alert
        alignItems="flex-start"
        boxShadow="base"
        rounded="md"
        flexDirection="column"
        justifyContent="flex-start"
        my={3}
        p={0}
        status="info"
        textAlign="left"
        variant="left-accent"
        {...props}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          p={3}
        >
          <AlertIcon />
          <AlertTitle fontSize="lg">
            {domToReact(
              children.filter((c) => {
                if (c instanceof Element && domNode.attribs) {
                  return c.attribs.class === "admonition-title";
                }
                return false;
              }),
              parseReplacer
            )}
          </AlertTitle>
        </Flex>
        <AlertDescription width="100%" background={"white"} p={3}>
          {domToReact(
            children.filter((c) => {
              if (c instanceof Element && domNode.attribs) {
                return c.attribs.class === "simple";
              }
              return false;
            }),
            parseReplacer
          )}
        </AlertDescription>
      </Alert>
    );
  }
  return null;
};
