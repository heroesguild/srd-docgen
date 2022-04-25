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
  children: React.ReactNode;
};

export const TOCAccordionItem = ({ link, children }: TOCAccordionItemProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          {link}
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>{children}</AccordionPanel>
    </AccordionItem>
  );
};
