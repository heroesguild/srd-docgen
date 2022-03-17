import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

type children = string | JSX.Element | JSX.Element[];

type AdmonitionProps = {
  description: children;
  title: children;
};

export const Admonition = ({ description, title }: AdmonitionProps) => (
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
  >
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      p={3}
    >
      <AlertIcon />
      <AlertTitle fontSize="lg">{title}</AlertTitle>
    </Flex>
    <AlertDescription width="100%" background={"white"} p={3}>
      {description}
    </AlertDescription>
  </Alert>
);
