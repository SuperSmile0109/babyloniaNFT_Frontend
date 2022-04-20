import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import type { NextComponentType, NextPageContext } from "next";

import Image from "src/components/Common/Image";


import { menuItems } from "./index";

type TProps = {
  isOpen?: boolean;
};

// Swap first and 4th element
const menuItemsMobile = [...menuItems];
const tmp = menuItemsMobile[0];
menuItemsMobile[0] = menuItemsMobile[3];
menuItemsMobile[3] = tmp;

const MobileMenu: NextComponentType<NextPageContext, {}, TProps> = ({
  isOpen = false,
}) => {
  const showPopupMenuItem = ({
    href,
    name,
  }: {
    href: string;
    name: string;
  }) => (
    <ListItem key={name} height="47px">
      <Button
        as="a"
        href={href}
        bg="transparent"
        fontFamily="'Press Start 2P'"
        fontSize="18px"
        fontWeight={500}
      >
        {name}
      </Button>
    </ListItem>
  );

  return (
    <Box position="relative">
      <List
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        pt="18px"
        pb="60px"
      >
        {menuItemsMobile.slice(0, 3).map(({ img, href, name }) => (
          <ListItem
            key={name}
            position="relative"
            mb="10px"
            padding="8px"
            borderRadius="15px"
            background="rgba(57,93,126,0.52)"
            _hover={{
              "& > a, & > button": {
                background: "transparent",
                transform: "translateX(20%)",
              },
            }}
          >
            <Button
              href={href}
              as="a"
              height="74px"
              width="74px"
              transition="0.3s"
              target="_blank"
              background="transparent"
            >
              <Image src={img} alt={img} layout="fill" objectFit="cover" />
            </Button>
            <Text
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="'Changa'"
              fontSize="16px"
              left="0"
              top="100%"
              height="40px"
              width="100%"
              color="white"
            >
              {name}
            </Text>
          </ListItem>
        ))}
      </List>
      <List
        position="fixed"
        top={103}
        maxHeight={isOpen ? 500 : 0}
        w="90%"
        bg="brand.500"
        padding={isOpen ? "5%" : "0 5%"}
        borderTop={isOpen ? "3px solid" : "none"}
        borderColor="common.yellow"
        transition="0.3s"
        overflow="hidden"
        zIndex={12}
      >
        {showPopupMenuItem({ href: "/", name: "Home" })}
        {menuItemsMobile.slice(3).map(showPopupMenuItem)}
      </List>
    </Box>
  );
};

export default MobileMenu;
