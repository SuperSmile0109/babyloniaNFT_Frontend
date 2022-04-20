import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Box,
  Container,
  Flex,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import TokenSwap from "../TokenSwap";
import Menu from "../Menu";

const Crowdsale1 = () => {
  const bgColor = useColorModeValue("gray.300", "gray.700");
  return (
    <Container maxW="100vw" h="full" bg="black.900" pt="0" pb="3" pl="0" pr="0">
      <Header />
      <Box>
        <Flex
          maxW="100vw"
          h={["80vh", "90vh", "90vh", "90vh"]}
          align="center"
          bg={bgColor}
          mt={["6vh", "10vh", "8vh", "12vh"]}
          pb="10px"
        >
          <Box flex="100vw" bg={bgColor} h="full">
            <VStack>
              <TokenSwap></TokenSwap>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Menu />
      <Footer />
    </Container>
  );
};

export default Crowdsale1;
