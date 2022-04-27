import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

type TOCAccordionItemProps = {
  // The props html-react-parser is returning
  link: JSX.Element | JSX.Element[] | string;
  children?: React.ReactNode;
};

export const TOCAccordionItem = ({ link, children }: TOCAccordionItemProps) => {
  if (!link) return <></>;

  // Note: when there's no children, we hide the collapsible content and icon
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          {link}
          {children && <AccordionIcon />}
        </AccordionButton>
      </h2>
      {children && <AccordionPanel>{children}</AccordionPanel>}
    </AccordionItem>
  );
};
