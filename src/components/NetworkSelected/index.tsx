import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import BuyIcon from "@assets/Icon_Buy_001_128x128.png";
import PolygonNetwork from "@assets/networks/Polygon_128x128.png";
import FantomNetwork from "@assets/networks/Fantom_128x128.png";
import EthereumNetwork from "@assets/networks/icon_eth_01_64px.png";
import AvaxNetwork from "@assets/networks/icon_avax_01_64px.png";
import BinanceNetwork from "@assets/networks/BSC_128x128.png";
import UnselectedNetworks from "@assets/networks/Networks.png";
import { setWalletAddress, walletActions } from "../../store/walletSlice";
import { useAppSelector, useAppDispatch } from "@hooks";
// import { default as chains } from "@config/chains.json";
import { default as  chains} from "../../config/chains.json";
import Image from "next/image";
declare const window: any;

const NetworkSelected = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const bgBtnDrawerSelected = useColorModeValue("gray.600", "gray.300");
  const bgBtnDrawerNotSelected = useColorModeValue("gray.300", "gray.800");
  const bgBtnTextSelected = useColorModeValue("gray.100", "gray.900");
  const bgBtnTextNotSelected = useColorModeValue("gray.800", "gray.400");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const LastSelectedChainId = useAppSelector(
    (state: any) => state.wallet.LastSelectedChainId
  );

  const addChainToNetwork = (ChainId: number) => {
    const chain = chains.find((c: any) => c.id === ChainId);
    console.log("addBSC", chain && chain.name);
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ChainId,
            chainName: chain && chain.name + "ssssss",
            nativeCurrency: chain && chain.nativeCurrency,
            rpcUrls: chain && chain.rpc,
            blockExplorerUrls: chain && chain.explorers,
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
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
  const addFantomTestNet = () => {
    console.log("addFantomTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xfa2",
            chainName: "Fantom testnet",
            nativeCurrency: {
              name: "FTM",
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

  const addEthereumNet = () => {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
    });
  };

  const addEthereumTestNet = () => {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
    });
  };
  const addAvaxMainNet = () => {
    console.log("addFantomTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA86A",
            chainName: "Avax mainnet",
            nativeCurrency: {
              name: "AVAX",
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

  const addAvaxTestNet = () => {
    console.log("addFantomTestNet");
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA869",
            chainName: "Avax testnet",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc/"],
            blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  console.log("LastSelectedChainId :", LastSelectedChainId);
  return (
    <>
      <IconButton
        aria-label="Network Chain Selected"
        w="40px"
        h="40px"
        bg="gray.500"
        color="gray.100"
        borderRadius="full"
        // display={{ base: "block", sm: "block", md: "block", xl: "none" }}
        onClick={onOpen}
      >
        <Image
          className={grayscaleMode === "gray" ? "grayscale" : ""}
          src={
            LastSelectedChainId === 97 || LastSelectedChainId === 56
              ? BinanceNetwork
              : LastSelectedChainId === 137 || LastSelectedChainId === 80001
              ? PolygonNetwork
              : LastSelectedChainId === 250 || LastSelectedChainId === 4002
              ? FantomNetwork
              : LastSelectedChainId == 1 || LastSelectedChainId == 4
              ? EthereumNetwork
              : LastSelectedChainId == 43113 || LastSelectedChainId == 43114
              ? AvaxNetwork
              : UnselectedNetworks
          }
          alt="Babylonia chain selector is a tool to simplify the process of adding compatible networks and blockchains to MetaMask"
        ></Image>
      </IconButton>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Select Network Chain
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                // bg={bgBtnDrawer}
                bg={
                  LastSelectedChainId === 56
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addBSCNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={BinanceNetwork}
                  alt="Binance Mainnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 56
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Binance Mainnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 97
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addBSCTestNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={BinanceNetwork}
                  alt="Binance Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 97
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Binance Testnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 137
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addPolygonNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={PolygonNetwork}
                  alt="Polygon Mainnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 137
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Polygon Mainnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 80001
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addPolygonTestNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={PolygonNetwork}
                  alt="Polygon Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 80001
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Polygon Testnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 250
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addFantomNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={FantomNetwork}
                  alt="Fantom mainnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 250
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Fantom Mainnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 4002
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addFantomTestNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={FantomNetwork}
                  alt="Fantom Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 4002
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Fantom Testnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 1
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addEthereumNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={EthereumNetwork}
                  alt="Ethereum Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 1
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Ethereum Mainnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 4
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addEthereumTestNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={EthereumNetwork}
                  alt="Ethereum Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 4
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Ethereum Testnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 0xA86A
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addAvaxMainNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={AvaxNetwork}
                  alt="Avax Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 0xA86A
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Avax Mainnet
                </Text>
              </Flex>
              <Flex
                align="center"
                cursor={'pointer'}
                className={'selectchain-item'}
                borderRadius="15"
                my="2"
                bg={
                  LastSelectedChainId === 0xA869
                    ? bgBtnDrawerSelected
                    : bgBtnDrawerNotSelected
                }
                onClick={() => {
                  addAvaxTestNet();
                }}
              >
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  width="40px"
                  height="40px"
                  src={AvaxNetwork}
                  alt="Avax Testnet"
                ></Image>
                <Text
                  ml="10px"
                  color={
                    LastSelectedChainId === 0xA869
                      ? bgBtnTextSelected
                      : bgBtnTextNotSelected
                  }
                >
                  Avax Testnet
                </Text>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NetworkSelected;
