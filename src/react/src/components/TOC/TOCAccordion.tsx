import React from "react";
import { Accordion } from "@chakra-ui/react";

type TOCAccordionProps = {
  children: React.ReactNode;
};

export const TOCAccordion = ({ children }: TOCAccordionProps) => {
  return (
    <Accordion
      // TODO: should change based on the current url
      defaultIndex={[0]}
      allowMultiple
      allowToggle
    >
      {children}
    </Accordion>
  );
};
