import Header from "@components/Header";
import Footer from "@components/Footer";
import Menu from "../Menu";
import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useAppSelector } from "@hooks";

const NftStaking = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

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
      mt={["88px", "88px", "80px"]}
      h={["100vh", "100vh", "100vh", "90vh"]}
    >
      <Header></Header>
      <Box h={["100vh", "100vh", "100vh", "90vh"]} bg={bgColor} pb="100px">
        <Flex align="center" bg={bgColor}>
          <Box flex="1" bg={bgColor}>
            <VStack m="4">
              <Box h="60vh">
                <Center>
                  <Text>NFT Staking</Text>
                </Center>
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

export default NftStaking;
