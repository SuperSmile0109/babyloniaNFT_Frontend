import React, { useEffect, useState } from "react";
import {
  useEthers,
  ERC20Interface,
  useContractCalls,
  useEtherBalance,
} from "@usedapp/core";
import {
  Box,
  Text,
  Flex,
  useToast,
  Stack,
  Skeleton,
  useClipboard,
  Button,
  useDisclosure,
  Wrap,
  VStack,
  Img,
  Spacer,
  HStack,
  SimpleGrid,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  WrapItem,
  useColorModeValue,
  Grid,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiWallet3Line } from "react-icons/ri";
import { formatUnits } from "@ethersproject/units";
// import { useAsync } from "react-async";
// import { getCookie, setCookie } from "typescript-cookie";
import { PoolTokenList } from "../../constants/Tokens";
import get_tokens_balances_from_binance from "../../context/actions/get_tokens_balances_from_binance";
import get_tokens_balances_from_polygon from "../../context/actions/get_tokens_balances_from_polygon";
import get_tokens_balances_from_fantom from "../../context/actions/get_tokens_balances_from_fantom";
// import grayscaleCss from "@assets/css/grayscale.css";
import { formatEther } from "@ethersproject/units";

import { walletActions } from "@store/walletSlice";
import { useAppSelector, useAppDispatch } from "@hooks";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
// import Image from "@components/Common/Image";
declare const window: any;

function useTokensBalance(tokenList?: any[], account?: string | null) {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token: any) => ({
          abi: ERC20Interface,
          address: token.address,
          method: "balanceOf",
          args: [account],
        }))
      : []
  );
}

export default function TokenList(props: any) {
  // const UNISWAP_DEFAULT_TOKEN_LIST_URI =
  //   "https://gateway.ipfs.io/ipns/tokens.uniswap.org";
  // const { name, logoURI, tokens } =
  //   useTokenList(UNISWAP_DEFAULT_TOKEN_LIST_URI) || {};
  // const [grayscaleMode, setGrayscaleMode] = useState(false);
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  const textColor = useColorModeValue("gray.900", "gray.100");
  const bgColor = useColorModeValue("gray.300", "gray.600");
  const bgListColor = useColorModeValue("gray.300", "gray.600");
  const bgMenuColor = useColorModeValue("gray.300", "gray.600");
  const bgBuyBtnColor = useColorModeValue("gray.100", "gray.800");
  const bgBuyBtnTextColor = useColorModeValue("gray.900", "gray.200");

  const [tokenList, setTokenList] = useState<any[]>([]);
  const [loadStatus, setLoadStatus] = useState("");
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers();
  const { hasCopied, onCopy } = useClipboard("");
  const [log, setLog] = useState<string[]>([]);
  const [showZeroTokens, SetShowZeroTokens] = useState(false);
  const toast = useToast();
  const balanceWallet = useAppSelector((state: any) => state.wallet.balance);
  const etherBalance = useEtherBalance(account);
  // const Balance = useEtherBalance(account);
  const router = useRouter();

  const loadTokenList = () => {
    console.log("account = (", account, ")");
    if ([56, 97].includes(chainId as number))
      get_tokens_balances_from_binance(String(account), String(chainId))
        .then((data) => {
          var list: any = [];
          data.map((i: any) => {
            if (i.symbol === "BABY") list.push(i);
          });
          data.map((i: any) => {
            if (i.symbol === "BNB") {
              // dispatch(balanceWallet);
              let balance = 0.0;
              if (typeof etherBalance !== "undefined") {
                balance = parseFloat(formatEther(etherBalance));
              }
              i.balance = balance;
              i.usd_balance = i.price * balance;
              console.log("BNB = ", i);
            }
            if (i.symbol !== "BABY") list.push(i);
          });
          // console.log("liiiissstttttt ====", list);
          setTokenList(list);
        })
        .catch((error) => {
          console.log("error", error);
        });
    console.log("polygoin, account = (", chainId, ")");
    if ([137, 80001].includes(chainId as number))
      get_tokens_balances_from_polygon(String(account), String(chainId))
        .then((data) => {
          var list: any = [];
          data.map((i: any) => {
            if (i.symbol === "MATIC") list.push(i);
          });
          data.map((i: any) => {
            if (i.symbol !== "MATIC") list.push(i);
          });
          // console.log("liiiissstttttt ====", list);
          setTokenList(list);
        })
        .catch((error) => {
          console.log("error", error);
        });
    if ([250, 4002].includes(chainId as number))
      get_tokens_balances_from_fantom(String(account), String(chainId))
        .then((data) => {
          var list: any = [];
          data.map((i: any) => {
            if (i.symbol === "FTM") {
              // dispatch(balanceWallet);
              // let balance = 0.0;
              // if (typeof etherBalance !== "undefined") {
              //   balance = parseFloat(formatEther(etherBalance));
              // }
              // i.balance = balance;
              // i.usd_balance = i.price * balance;
              console.log("FTM = ", etherBalance);
              list.push(i);
            }
          });
          data.map((i: any) => {
            if (i.symbol !== "FTM") list.push(i);
          });
          console.log("liiiissstttttt ====", list);
          setTokenList(list);
        })
        .catch((error) => {
          console.log("error", error);
        });
  };

  const addToken = (params: any) =>
    window.ethereum
      .request({ method: "wallet_watchAsset", params })
      .then(() => setLog([...log, "Success, Token added!"]))
      .catch((error: Error) => setLog([...log, `Error: ${error.message}`]));

  const addTokenToWallet = async (param: any) => {
    const p: any = {
      type: param.type,
      options: {
        address: param.contract,
        symbol: param.symbol,
        decimals: param.decimals,
        image: param.icon,
      },
    };
    const params = await addToken(p);
  };
  // const { data, error, isLoading } = useAsync({ promiseFn: loadTokenList });

  const BuyToken = (param: any) => {
    router.push("/Crowdsale1");
  };
  // const wallet = useAppSelector((state: any) => state.wallet.walletAddress);
  const dispatch = useAppDispatch();
  // dispatch(walletActions.setWalletAddress(account as string));

  const getList = async () => {
    await loadTokenList();
  };
  const addCommas = (num: any) => {
    // num = num.toString();
    // var pattern = /(-?\d+)(\d{3})/;
    // while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
    // return num;
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  useEffect(() => {
    if (account !== undefined) {
      getList();
    }
  }, [chainId, account]);

  useEffect(() => {
    if (etherBalance !== undefined) {
      getList();
    }
  }, [etherBalance]);

  if (!account)
    return (
      <Center w="100vw">
        <Flex
          {...props}
          pb="25px"
          px="1px"
          borderRadius="10"
          w={["100vw", "92vw", "50vw"]}
          h={["50vh", "60vh", "60vh"]}
          justifyContent="center"
          align="center"
          bg={bgColor}
          mt={["0vh", "7vh", "5vh"]}
        >
          <Wrap spacing="20px" justify="center">
            <Text color={textColor}>Disconnected!</Text>
            <Text color={textColor}>You can connect to your wallet</Text>
          </Wrap>
        </Flex>
      </Center>
    );

  if (![56, 97, 137, 80001, 250, 4002].includes(chainId as number))
    return (
      <Center w="100vw">
        <VStack
          {...props}
          color={textColor}
          overflowX="auto"
          maxW="80vw"
          // h="100%"
          whiteSpace="nowrap"
          pb="17px"
          px="2"
          borderRadius="10"
          // colorScheme="teal"

          // w="472px"
          w={["100vw", "50vw", "30vw"]}
          h="full"
          justifyContent="center"
          align="center"
          py="5vh"
          bg={bgColor}
          mt={["0vh", "7vh", "5vh"]}
        >
          <Text color={textColor}>unsupported network! {chainId}</Text>
          <Spacer></Spacer>
          <Text> Supported Network: </Text>
          <Text> Binance Smart chain </Text>
          <Text> Binance test net </Text>
        </VStack>
      </Center>
    );
  // console.log("rendering :  tokenList =", tokenList);

  if (!tokenList) return <></>;
  if (tokenList === [] || tokenList.length < 1)
    return (
      <Center w="100vw">
        <Box
          {...props}
          w={["100vw", "90vw", "50vw", "30vw"]}
          borderRadius="10px"
          overflowX="auto"
          maxW="100vw"
          // h="100%"
          color={textColor}
          whiteSpace="nowrap"
          pb="17px"
          px="2"
          bg={bgColor}
          mt={["0vh", "7vh", "5vh"]}
          // colorScheme="teal"
        >
          <Text my="10" align="center">
            Wait ...
          </Text>

          <Stack justifyItems="center">
            <Skeleton height="48px" />
            <Skeleton height="48px" />
            <Skeleton height="48px" />
            <Skeleton height="48px" />
            <Skeleton height="48px" />
          </Stack>
        </Box>
      </Center>
    );

  if ([56, 97, 137, 80001, 250, 4002].includes(chainId as number))
    return (
      <Stack w="100vw" justifyContent="center" alignItems="center">
        <Box
          {...props}
          // overflowX="auto"
          w={["94vw", "94vw", "60vw", "30vw"]}
          borderRadius="10px"
          maxW="100vw"
          // w="200px"
          // h="full"
          // minH="140%"
          whiteSpace="nowrap"
          pb="5px"
          // ml="10px"
          mt={["0vh", "7vh", "5vh"]}
          // colorScheme="teal"
        >
          {tokenList &&
            tokenList.map((tokenItem: any, idx: any) => (
              <Stack
                key={idx}
                spacing="5px"
                borderRadius="10px"
                bg={bgListColor}
                mx="5px"
                my="10px"
              >
                <Flex alignItems="center">
                  <Image
                    className={grayscaleMode === "gray" ? "grayscale" : ""}
                    // objectFit="cover"
                    w="40px"
                    h="40px"
                    p="0"
                    ml="10px"
                    // boxSize="50px"
                    // objectFit='cover'
                    src={tokenItem.icon.src}
                    alt={tokenItem.symbol}
                  />
                  <Box ml="10px">
                    <VStack pt="3px" align="left">
                      <Text fontSize="18px" color={textColor}>
                        {tokenItem.symbol.toString()}
                      </Text>
                      <WrapItem>
                        <Text fontSize="14px" color="gray.500">
                          {"$" + addCommas(tokenItem.price).toString()}
                        </Text>
                      </WrapItem>
                    </VStack>
                  </Box>
                  <Box w="300px" h="50px"></Box>
                  <Box w="300px" align="right">
                    {tokenItem.symbol === "BABY" && (
                      <Button
                        bg={bgBuyBtnColor}
                        color={bgBuyBtnTextColor}
                        variant="ghost"
                        mr="15px"
                        align="right"
                        onClick={() => {
                          router.push("/Crowdsale1");
                          // BuyToken(PoolTokenList[idx]);
                        }}
                      >
                        Buy Baby
                      </Button>
                    )}
                    {tokenItem.symbol !== "BABY" && (
                      <VStack
                        pt="3px"
                        align="left"
                        pr="15px"
                        justifyContent="right"
                      >
                        <Text fontSize="18px" color={textColor} align="right">
                          {addCommas(
                            tokenItem.balance.toFixed(8) * 1
                          ).toString() +
                            " " +
                            tokenItem.symbol.toString()}
                        </Text>
                        <Text align="right" mr="35px" color="gray.500">
                          {"$" +
                            addCommas(tokenItem.usd_balance.toFixed(8) * 1)
                              .toString()
                              .trim()}
                        </Text>
                      </VStack>
                    )}
                  </Box>
                </Flex>
              </Stack>
            ))}
        </Box>
        <Box h="110px" w="100vw"></Box>
      </Stack>
    );
  // if ([137, 80001].includes(chainId as number)) return <Text>nothing</Text>;
  // if ([250, 4002].includes(chainId as number)) return <Text>nothing</Text>;
  return <Text>nothing</Text>;
}
