import React, { ReactNode } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";

import { useBurgerMenu } from "../../hooks/useBurgerMenu";

type LinkExternalProps = {
  children: ReactNode;
  to: string;
};

export const LinkExternal = ({ children, to, ...props }: LinkExternalProps) => {
  const setBurgerIsOpen = useBurgerMenu();
  const onClickHandler = () => {
    setBurgerIsOpen(false);
  };

  return (
    <Link href={to} isExternal onClick={onClickHandler} {...props}>
      {/* FIXME: ExternalLinkIcon not displaying */}
      {children} <ExternalLinkIcon mb={1} />
    </Link>
  );
};
