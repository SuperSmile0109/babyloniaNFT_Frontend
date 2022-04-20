import React from "react";
import { Box, Text, HStack, Link, Center } from "@chakra-ui/react";
import BabyloniaLogo from "@assets/Logo.png";
import Image from "next/image";
// import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@hooks";

export default function BabyLogo(props: any) {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return (
    <Link href="https://www.babylonia.app">
      <Box
        zIndex="200"
        // shadow="md"
        _hover={{
          borderWidth: "4",
          borderColor: "gray.100",
          shadow: "dark-lg",
          shadowColor: "red.100",
        }}
        _focus={{ boxShadow: "outline" }}
        borderWidth={2}
        borderColor="gray.500"
        borderRadius="full"
        p="0"
        my="4"
        ml="22px"
        w="50px"
        h="50px"
        {...props}
        display={{ base: "none", md: "block" }}
      >
        <Image
          width="50px"
          height="50px"
          className={grayscaleMode === "gray" ? "grayscale" : ""}
          src={BabyloniaLogo}
          alt="Babylonia Logo"
        ></Image>
      </Box>

      <Box
        shadow="md"
        borderWidth={2}
        borderRadius="full"
        {...props}
        p="0"
        m="2"
        w="60px"
        h="60px"
        display={{ base: "block", md: "none" }}
      >
        <Image
          className={grayscaleMode === "gray" ? "grayscale" : ""}
          src={BabyloniaLogo}
          alt="Babylonia Logo"
        ></Image>
      </Box>
    </Link>
  );
}
