import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FcPicture } from "react-icons/fc";
import { VscColorMode } from "react-icons/vsc";
import BabyLogo from "../BabyLogo";
import TopMenu from "../TopMenu";
import TopMobileMenu from "../TopMobileMenu";
import useGrayScaleMode from "@hooks/useGrayScaleMode";
import ConnectButton from "@components/ConnectButton";
import NetworkSelected from "../NetworkSelected";

export default function Header(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.700", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");
  const [grayscaleMode, setGrayscaleMode] = useGrayScaleMode();

  return (
    <Flex
      {...props}
      zIndex="200"
      as="header"
      position="fixed"
      left="0"
      top="0"
      mx="0"
      px="0"
      w="100%"
    >
      <Container mt="0" mx="0" px="0" minWidth="full">
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={0}
          bg={bg}
          h="full"
        >
          <GridItem colSpan={[1, 1, 2]}>
            <Flex h="full">
              <Box>
                <BabyLogo></BabyLogo>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={[1, 1, 2]}>
            <Flex h="full" alignItems="center" justifyContent="center">
              <TopMenu />
            </Flex>
          </GridItem>
          <GridItem colSpan={[4, 4, 2]}>
            <Flex h="full" alignItems="center" justifyContent="right">
              <IconButton
                aria-label="Toggle grayscale mode"
                borderRadius="full"
                // mx="10px"
                bg="gray.600"
                onClick={() => {
                  setGrayscaleMode(
                    grayscaleMode === "color" ? "gray" : "color"
                  );
                  if (grayscaleMode === "gray") {
                    document.documentElement.style.setProperty(
                      "img",
                      `filter: grayscale(1)`
                    );
                  }
                }}
                icon={
                  grayscaleMode !== "color" ? (
                    <FcPicture size="30px" />
                  ) : (
                    <VscColorMode size="30px" />
                  )
                }
              />
              <IconButton
                aria-label="Toggle dark mode"
                borderRadius="full"
                mx="10px"
                bg="gray.600"
                onClick={toggleColorMode}
                icon={
                  colorMode !== "light" ? (
                    <MdLightMode size="30px" />
                  ) : (
                    <MdDarkMode size="30px" />
                  )
                }
              />
              <NetworkSelected />
              <Stack
                spacing={8}
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
                p="2"
                m="2"
              >
                <ConnectButton
                  key="aaa1"
                  display={{ base: "none", md: "none", xl: "block" }}
                  direction={"row"}
                />
              </Stack>
              <Box>
                <TopMobileMenu />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
}