import React, { useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Menu from "../Menu";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  filter,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import StakingSlide from "@assets/Slides_Staking_001_3x4_1.png";
// import theme from "./theme";
// import Layout from "./components/Layout";
import TokenSwap from "../TokenSwap";
import Image from "@components/Common/Image";
import useGrayScaleMode from "@hooks/useGrayScaleMode";
import { useAppSelector, useAppDispatch } from "@hooks";

const Invest = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  useEffect(() => {
    console.log("kjkjkjkjkj", grayscaleMode);
  }, [grayscaleMode]);

  const grayscale = {
    filter: "grayscale(1)",
  };

  const bgColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Container
      maxW=".xl"
      bg="black.900"
      pt="0"
      pb="3"
      pl="0"
      pr="0"
      w="100vw"
      mt={["88px", "88px", "124px"]}
      h={["100vh", "100vh", "100vh", "90vh"]}
    >
      <Header></Header>
      <Box h={["100vh", "100vh", "100vh", "90vh"]} bg={bgColor} pb="100px">
        <Flex align="center" bg={bgColor}>
          <Box flex="1" bg={bgColor}>
            <VStack m="4">
              <Box h="60vh">
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  src={StakingSlide}
                  alt="StakingSlide"
                ></Image>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Menu></Menu>

      <Footer></Footer>
    </Container>
  );
};

export default Invest;
