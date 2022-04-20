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
  SimpleGrid,
  HStack,
  Input,
  useToast,
  Stack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ImageLogo from "../ImageLogo";
import MetaMaskLogo from "../../assets/Metamask_logo.png";
import WalletConnectLogo from "../../assets/walletconnect-logo.png";
import TrustWalletBlueLogo from "../../assets/Trust_Wallet_Blue.png";
import BSCNetLogo from "../../assets/networks/BSC_128x128.png";
import MoonbeamNetLogo from "../../assets/networks/Moonbeam_128x128.png";
import CeloNetLogo from "../../assets/networks/Celo_128x128.png";
import ThundercoreNetLogo from "../../assets/networks/Thundercore_128x128.png";
import AvalancheNetLogo from "../../assets/networks/Avalanche_128x128.png";
import HecoNetLogo from "../../assets/networks/Heco_128x128.png";
import PolygonNetLogo from "../../assets/networks/Polygon_128x128.png";
import ArbitrumNetLogo from "../../assets/networks/Arbitrum_128x128.png";
import KlaytnNetLogo from "../../assets/networks/Klaytn_128x128.png";
import FantomNetLogo from "../../assets/networks/Fantom_128x128.png";
import CronosNetLogo from "../../assets/networks/Cronos_128x128.png";
import HarmonyNetLogo from "../../assets/networks/Harmony_128x128.png";
import { useForm } from "react-hook-form";
import AlertPop from "../AlertPop";
import Menu from "../Menu";

declare const window: any;
const ChainSelector = () => {
  const textColor = useColorModeValue("gray.900", "gray.200");
  const bgColor = useColorModeValue("gray.300", "gray.700");
  const bgBoxColor = useColorModeValue("gray.500", "gray.600");
  const bgButtonColor = useColorModeValue("#F58634", "gray.800");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const onSubmit = async (data: any) => {
    console.log("ONSUBMIT");
    let params = [
      {
        chainId: `0x${Number(data.chainId).toString(16)}`,
        chainName: data.networkName,
        nativeCurrency: {
          //   name: data.currencyName,
          symbol: data.currencySymbol,
          decimals: 18,
        },
        rpcUrls: [data.rpcUrls],
        // blockExplorerUrls: [data.blockExplorerUrls],
      },
    ];
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: params,
      })
      .catch((error: any) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        toast({
          title: "Error",
          description: JSON.stringify(data),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const addBSCNet = () => {
    console.log("addBSC");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "Binance Coin",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addBSCTestNet = () => {
    console.log("addBSCTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            chainName: "Binance Smart Chain Testnet",
            nativeCurrency: {
              name: "Binance Coin",
              symbol: "tBNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addMoonbeamNet = () => {
    console.log("addMoonbeamNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x504",
            chainName: "moonbeam",
            nativeCurrency: {
              name: "Glimmer (GLMR)",
              symbol: "GLMR",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.api.moonbeam.network"],
            blockExplorerUrls: ["https://rpc.api.moonbeam.network"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addMoonbeamTestNet = () => {
    console.log("addMoonbeamTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x507",
            chainName: "moonbase-alphanet",
            nativeCurrency: {
              name: "Glimmer (GLMR)",
              symbol: "GLMR",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
            blockExplorerUrls: ["https://rpc.api.moonbase.moonbeam.network"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addCeloTestNet = () => {
    console.log("addCeloTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xAEF3",
            chainName: "Alfajores Testnet",
            nativeCurrency: {
              name: "CELO",
              symbol: "CELO",
              decimals: 18,
            },
            rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
            blockExplorerUrls: [
              "https://alfajores-blockscout.celo-testnet.org",
            ],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addCeloNet = () => {
    console.log("addCeloNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA4EC",
            chainName: "Celo (Mainnet)",
            nativeCurrency: {
              name: "CELO",
              symbol: "CELO",
              decimals: 18,
            },
            rpcUrls: ["https://forno.celo.org"],
            blockExplorerUrls: ["https://explorer.celo.org"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addThundercoreTestNet = () => {
    console.log("addThundercoreTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x12",
            chainName: "ThunderCore Testnet",
            nativeCurrency: {
              name: "Thundercore",
              symbol: "TT",
              decimals: 18,
            },
            rpcUrls: ["https://testnet-rpc.thundercore.com"],
            blockExplorerUrls: ["https://scan-testnet.thundercore.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addThundercoreNet = () => {
    console.log("addThundercoreNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x6c",
            chainName: "ThunderCore",
            nativeCurrency: {
              name: "ThunderCore",
              symbol: "TT",
              decimals: 18,
            },
            rpcUrls: ["https://mainnet-rpc.thundercore.com"],
            blockExplorerUrls: ["https://scan.thundercore.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addAvalancheTestNet = () => {
    console.log("addAvalancheTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xa869",
            chainName: "Avalanche FUJI C-Chain (testnet)",
            nativeCurrency: {
              name: "Avalanche Test",
              symbol: "AVAX",
              decimals: 18,
            },
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addAvalancheNet = () => {
    console.log("addAvalancheNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xa86a",
            chainName: "Avalanche Mainnet C-Chain",
            nativeCurrency: {
              name: "Avalanche",
              symbol: "AVAX",
              decimals: 18,
            },
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://snowtrace.io/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addHecoTestNet = () => {
    console.log("addHecoTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x100",
            chainName: "heco-testnet",
            nativeCurrency: {
              name: "HECO",
              symbol: "HT",
              decimals: 18,
            },
            rpcUrls: ["https://http-testnet.hecochain.com/"],
            blockExplorerUrls: ["https://scan-testnet.hecochain.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addHecoNet = () => {
    console.log("addHecoNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x80",
            chainName: "heco-mainnet",
            nativeCurrency: {
              name: "HECO",
              symbol: "HT",
              decimals: 18,
            },
            rpcUrls: ["https://http-mainnet.hecochain.com/"],
            blockExplorerUrls: ["https://scan.hecochain.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addArbitrumTestNet = () => {
    console.log("addArbitrumTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x66EEB",
            chainName: "Arbitrum Testnet",
            nativeCurrency: {
              name: "AETH",
              symbol: "AETH",
              decimals: 18,
            },
            rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
            blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addArbitrumNet = () => {
    console.log("addArbitrumNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA4B1",
            chainName: "Arbitrum One",
            nativeCurrency: {
              name: "AETH",
              symbol: "AETH",
              decimals: 18,
            },
            rpcUrls: ["https://arb1.arbitrum.io/rpc"],
            blockExplorerUrls: ["https://arbiscan.io"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addKlaytnTestNet = () => {
    console.log("addKlaytnTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x3E9",
            chainName: "Klaytn Testnet Baobab",
            nativeCurrency: {
              name: "Klay",
              symbol: "Klay",
              decimals: 18,
            },
            rpcUrls: ["https://api.baobab.klaytn.net:8651"],
            blockExplorerUrls: ["https://www.klaytn.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addKlaytnNet = () => {
    console.log("addKlaytnNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x2019",
            chainName: "Klaytn Mainnet",
            nativeCurrency: {
              name: "Klay",
              symbol: "KLAY",
              decimals: 18,
            },
            rpcUrls: ["https://kaikas.cypress.klaytn.net:8651"],
            blockExplorerUrls: ["https://scope.klaytn.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addFantomTestNet = () => {
    console.log("addFantomTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xfa2",
            chainName: "Fantom Testnet",
            nativeCurrency: {
              name: "Fantom",
              symbol: "FTM",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.testnet.fantom.network/"],
            blockExplorerUrls: ["https://testnet.ftmscan.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addFantomNet = () => {
    console.log("addFantomNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xfa",
            chainName: "Fantom Opera",
            nativeCurrency: {
              name: "Fantom",
              symbol: "FTM",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.ftm.tools/"],
            blockExplorerUrls: ["https://ftmscan.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addCronosTestNet = () => {
    console.log("addCronosTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x152",
            chainName: "Cronos Testnet",
            nativeCurrency: {
              name: "Cronos",
              symbol: "TCRO",
              decimals: 18,
            },
            rpcUrls: ["https://cronos-testnet-3.crypto.org:8545"],
            blockExplorerUrls: ["https://cronos.crypto.org/explorer/testnet3"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addCronosNet = () => {
    console.log("addCronosNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x19",
            chainName: "Cronos",
            nativeCurrency: {
              name: "Cronos",
              symbol: "CRO",
              decimals: 18,
            },
            rpcUrls: ["https://evm-cronos.crypto.org"],
            blockExplorerUrls: ["https://cronos.crypto.org/explorer/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addHarmonyTestNet = () => {
    console.log("addHarmonyTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x6357D2E0",
            chainName: "Harmony Testnet Shard 0",
            nativeCurrency: {
              name: "ONE Harmony",
              symbol: "ONE",
              decimals: 18,
            },
            rpcUrls: ["https://api.s0.b.hmny.io"],
            blockExplorerUrls: ["https://explorer.pops.one"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addHarmonyNet = () => {
    console.log("addHarmonyNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x63564C40",
            chainName: "Harmony Mainnet Shard 0",
            nativeCurrency: {
              name: "ONE Harmony",
              symbol: "ONE",
              decimals: 18,
            },
            rpcUrls: ["https://api.harmony.one"],
            blockExplorerUrls: ["https://explorer.harmony.one"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addPolygonNet = () => {
    console.log("addPolygonNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "Polygon(MATIC) Coin",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addPolygonTestNet = () => {
    console.log("addPolygonTestNet");

    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Matic Mumbai",
            nativeCurrency: {
              name: "Polygon(MATIC) Coin",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addEthereumNet = () => {
    console.log("addEthereumNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
              name: "Binance Coin",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Container
      maxW="100vw"
      bg="black.900"
      pt="0"
      pb="1"
      pl="0"
      pr="0"
      w="100vw"
      mt={["88px", "88px", "124px"]}
      //   h="80vh"
    >
      <Header></Header>
      <Box pt="10" w={["100vw", "100vw", "100vw"]} h="full" bg={bgColor}>
        <Flex w="100vw">
          <Wrap justify="center" spacing={["", "", "", "50px"]} mx="1">
            <WrapItem w={["100vw", "100vw", "30vw"]} pb={["40px","50px","10px"]}>
              <Center w={["100vw", "100vw", "30vw"]} >
                <VStack align="center" spacing="2" >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg={bgColor}
                  >
                    <Box
                      justifyContent="center"
                      p={2}
                      borderRadius="5px"
                      bg={bgBoxColor}
                      // align="center"
                      // h={["60vh", "50vh", "50vh"]}
                      w={["90vw", "90vw", "30vw"]}
                    >
                      <Text align="center"> Add testnet to Wallet </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" bg={bgColor} >
                    <Box
                    
                      borderRadius="5px"
                      bg={bgBoxColor}
                      // align="center"
                      h={["full", "50vh", "full"]}
                      w={["90vw", "90vw", "30vw"]}
                    >
                      <Center >
                        <SimpleGrid m={["2","2","4"]} columns={3} spacing={5}   >
                          <ImageLogo
                            logo={BSCNetLogo}
                            onClick={addBSCTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={MoonbeamNetLogo}
                            onClick={addMoonbeamTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={CeloNetLogo}
                            onClick={addCeloTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={ThundercoreNetLogo}
                            onClick={addThundercoreTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={AvalancheNetLogo}
                            onClick={addAvalancheTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={HecoNetLogo}
                            onClick={addHecoTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={PolygonNetLogo}
                            onClick={addPolygonTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={ArbitrumNetLogo}
                            onClick={addArbitrumTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={KlaytnNetLogo}
                            onClick={addKlaytnTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={FantomNetLogo}
                            onClick={addFantomTestNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={CronosNetLogo}
                            onClick={addCronosTestNet}
                          ></ImageLogo>
                          <ImageLogo
                          
                            logo={HarmonyNetLogo}
                            onClick={addHarmonyTestNet}
                          ></ImageLogo>
                        </SimpleGrid>
                      </Center>
                    </Box>
                  </Flex>
                </VStack>
              </Center>
            </WrapItem>
            <WrapItem w={["100vw", "100vw", "30vw"]} pb={["40px","50px","10px"]}>
              <Center w={["100vw", "100vw", "30vw"]}>
                <VStack spacing="2" align="center" w="100%">
                  <Flex align="center" bg={bgColor}>
                    <Box
                      p={2}
                      borderRadius="5px"
                      bg={bgBoxColor}
                      // align="center"
                      // h={["60vh", "50vh", "50vh"]}
                      w={["90vw", "90vw", "30vw"]}
                    >
                      <Text align="center"> Add mainnet to Wallet </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" bg={bgColor}>
                    <Box
                      borderRadius="5px"
                      bg={bgBoxColor}
                      // align="center"
                      h={["full", "50vh", "full"]}
                      w={["90vw", "90vw", "30vw"]}
                    >
                      <Center>
                        <SimpleGrid m={["2","2","4"]} columns={3} spacing={5}>
                          <ImageLogo
                            logo={BSCNetLogo}
                            onClick={addBSCNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={MoonbeamNetLogo}
                            onClick={addMoonbeamNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={CeloNetLogo}
                            onClick={addCeloNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={ThundercoreNetLogo}
                            onClick={addThundercoreNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={AvalancheNetLogo}
                            onClick={addAvalancheNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={HecoNetLogo}
                            onClick={addHecoNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={PolygonNetLogo}
                            onClick={addPolygonNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={ArbitrumNetLogo}
                            onClick={addArbitrumNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={KlaytnNetLogo}
                            onClick={addKlaytnNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={FantomNetLogo}
                            onClick={addFantomNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={CronosNetLogo}
                            onClick={addCronosNet}
                          ></ImageLogo>
                          <ImageLogo
                            logo={HarmonyNetLogo}
                            onClick={addHarmonyNet}
                          ></ImageLogo>
                        </SimpleGrid>
                      </Center>
                    </Box>
                  </Flex>
                </VStack>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w={["100vw", "100vw", "100vw", "100vw"]}>
                <VStack>
                  <Box
                    //   mt="-120"
                    p={2}
                    borderRadius="5px"
                    bg={bgBoxColor}
                    // align="center"
                    // h={["60vh", "50vh", "50vh"]}
                    w={["90vw", "90vw", "60vw", "30vw"]}
                  >
                    <Text align="center"> Information / Edit Manually </Text>
                  </Box>
                  <Flex align="center" bg={bgColor}>
                    <Box
                      borderRadius="5px"
                      bg={bgBoxColor}
                      // align="center"
                      h="full"
                      w={["90vw", "90vw", "60vw", "30vw"]}
                    >
                      <Center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Text
                            pt="3"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            align="left"
                          >
                            Network Name
                          </Text>
                          <Input
                            color={textColor}
                            bg="gray.100"
                            type="text"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            placeholder="Network Name"
                            {...register("networkName", {
                              required: "Enter network name",
                              minLength: 3,
                              maxLength: 100,
                            })}
                          ></Input>
                          {errors.networkName && (
                            <AlertPop title={errors.networkName.message} />
                          )}
                          <Text
                            pt="3"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            align="left"
                          >
                            RPC URL
                          </Text>
                          <Input
                            color={textColor}
                            bg="gray.100"
                            type="text"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            placeholder="RPC URL"
                            {...register("rpcUrls", {
                              required: "Enter RPC URL",
                              minLength: 3,
                              maxLength: 100,
                            })}
                          ></Input>
                          {errors.rpcUrls && (
                            <AlertPop title={errors.rpcUrls.message} />
                          )}
                          <Text
                            pt="3"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            align="left"
                          >
                            Chain ID
                          </Text>
                          <Input
                            color={textColor}
                            bg="gray.100"
                            type="text"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            placeholder="Chain ID"
                            {...register("chainId", {
                              required: "Enter Chain ID",
                              maxLength: 10,
                            })}
                          ></Input>
                          {errors.chainId && (
                            <AlertPop title={errors.chainId.message} />
                          )}
                          <Text
                            pt="3"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            align="left"
                          >
                            Currency Symbol (optional)
                          </Text>
                          <Input
                            color={textColor}
                            bg="gray.100"
                            type="text"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            placeholder="Currency Symbol"
                            {...register("currencySymbol")}
                          ></Input>
                          <Text
                            pt="3"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            align="left"
                          >
                            Block Explorer URL (optional)
                          </Text>
                          <Input
                            color={textColor}
                            bg="gray.100"
                            type="text"
                            w={["90vw", "80vw", "55vw", "27vw"]}
                            placeholder="Block Explorer URL"
                            {...register("blockExplorerUrls")}
                          ></Input>

                          <Flex my="3" w="27vw" justifyContent="center">
                            <Button
                              borderRadius="md"
                              bg={bgButtonColor}
                              _hover={{ bg: "teal" }}
                              variant="ghost"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Flex>
                        </form>
                      </Center>
                    </Box>
                  </Flex>
                </VStack>
              </Center>
            </WrapItem>
          </Wrap>
        </Flex>
        <Box h="150px"></Box>
      </Box>
      <Menu />
      <Footer></Footer>
    </Container>
  );
};

export default ChainSelector;
