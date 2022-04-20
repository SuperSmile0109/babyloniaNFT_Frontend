import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { GrClose as CloseIcon } from "react-icons/gr";
import { useRef, useEffect, useState } from "react";

const MenuToggle = (props: any) => {
  const { toggle, isToggleOpen } = props;
  const btnRef = useRef(null);
  

  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle} pr="40px">
      <Button ref={btnRef}>
        {isToggleOpen ? <CloseIcon size="40px" /> : <MenuIcon size="40px" />}
      </Button>
    </Box>
  );
};

export default MenuToggle;
