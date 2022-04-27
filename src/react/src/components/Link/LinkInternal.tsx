import React, { ReactNode } from "react";

import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";
import { useBurgerMenu } from "../../hooks/useBurgerMenu";

type LinkInternalProps = {
  children: ReactNode;
  to: string;
};

export const LinkInternal = ({ children, to, ...props }: LinkInternalProps) => {
  const setBurgerIsOpen = useBurgerMenu();
  const onClickHandler = () => {
    setBurgerIsOpen(false);
  };

  return (
    <Link as={ReachLink} onClick={onClickHandler} to={to} {...props}>
      {children}
    </Link>
  );
};
