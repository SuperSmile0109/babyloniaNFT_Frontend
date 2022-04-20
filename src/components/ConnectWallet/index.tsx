import Header from "../Header";
import Footer from "../Footer";

import MetaMaskLogo from "../../assets/Metamask_logo.png";
import WalletConnectLogo from "../../assets/walletconnect-logo.png";
import TrustWalletBlueLogo from "../../assets/Trust_Wallet_Blue.png";
// import Web3 from "web3";

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
declare const window: any;

const ConnectWallet = () => {
  // const navigate = useNavigate();
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
      <Header></Header>
      <Box h="80vh" bg="gray.200" pb="100px">
        <Flex align="center" bg="gray.200">
          <Center minW="100vw" w={["90vw", "50vw", "40vw"]} h="70vh">
            <Box
              borderRadius="10px"
              bg="gray.400"
              h={["60vh", "50vh", "50vh"]}
              w={["90vw", "50vw", "40vw"]}
            >
              <VStack m="4">
                <Text> Wallets</Text>
                <Link href="https://metamask.io/download.html" isExternal>
                  <Button
                    variant="ghost"
                    minH="95px"
                    h="full"
                    bg="gray.300"
                    // onClick={(e) => {

                    //   navigate("https://metamask.io/download.html", {
                    //     replace: true,
                    //   });
                    // }}
                  >
                    <Image
                      w="250px"
                      src={MetaMaskLogo.src}
                      alt="MetaMaskLogo"
                    ></Image>
                  </Button>
                </Link>
                <Link href="https://trustwallet.com/download-page/" isExternal>
                  <Button
                    variant="ghost"
                    minH="95px"
                    h="full"
                    bg="gray.300"
                    // onClick={(e) => {
                    //   navigate("https://trustwallet.com/download-page/", {
                    //     replace: true,
                    //   });
                    // }}
                  >
                    <Image
                      w="250px"
                      src={TrustWalletBlueLogo.src}
                      alt="TrustWalletBlueLogo"
                    ></Image>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  minH="95px"
                  h="95px"
                  bg="gray.300"
                  onClick={(e) => {}}
                >
                  <Image
                    w="250px"
                    src={WalletConnectLogo.src}
                    alt="WalletConnectLogo"
                  ></Image>
                </Button>
              </VStack>
            </Box>
          </Center>
        </Flex>
      </Box>
      <Footer></Footer>
    </Container>
  );
};

export default ConnectWallet;
