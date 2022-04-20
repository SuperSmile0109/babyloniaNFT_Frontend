import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Body from "../Body";
import { Container, Flex, Box, Text, Center } from "@chakra-ui/react";

const PageNotFound = () => {
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
      h="80vh"
    >
      <Header />
      <Flex align="center" w="full" alignItems="center" bg="gray.500" h="80vh">
        <Box w="full"  h="50vh">
          <Text
            align="center"
            fontFamily="bold"
            fontSize={"64px"}
            color="gray.300"
          >
            404
          </Text>
          <Text
            align="center"
            fontFamily="bold"
            fontSize={"24px"}
            color="gray.300"
          >
            Page Not Found
          </Text>
        </Box>
      </Flex>
      <Footer />
    </Container>
  );
};

export default PageNotFound;
