import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";

export type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TOCAccordionItemProps = {
  headingLevel: number;
  // The props html-react-parser is returning
  link: JSX.Element | JSX.Element[] | string;
  children?: React.ReactNode;
};

export const TOCAccordionItem = ({
  headingLevel,
  link,
  children,
}: TOCAccordionItemProps) => {
  if (!link) return <></>;

  const heading = `h${headingLevel}` as Heading;
  // Note: when there's no children, we hide the collapsible content and icon
  return (
    <AccordionItem>
      <Heading as={heading}>
        <AccordionButton pl={headingLevel * 2}>
          {link}
          {children && <AccordionIcon />}
        </AccordionButton>
      </Heading>
      {children && <AccordionPanel p={0}>{children}</AccordionPanel>}
    </AccordionItem>
  );
};
