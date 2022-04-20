import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import {
  Image,
  Center,
  Button,
  Divider,
  Box,
  Spacer,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
// SettingsIcon,
import BabyTokenIcon from "../../assets/Token-Icons/BABY_64.png";
import BUSDTokenIcon from "../../assets/Token-Icons/BUSD_64.png";
import { useEthers, useEtherBalance, useSendTransaction } from "@usedapp/core";
import { useToast } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { ethers, utils } from "ethers";
import useRefresh from "../../context/useRefresh";

import ethereum from "@usedapp/core/dist/esm/src/model/chain/ethereum";

import config from "../../config";

import presaleContractJSON from "../../babies/abis/Presale.json";
import tokenJSON from "../../babies/abis/BABYToken.json";
import busdJSON from "../../babies/abis/BUSDToken.json";
import { useAppSelector, useAppDispatch } from "@hooks";
// import { RiSwapBoxLine } from "react-icons/ri";
declare const window: any;

function Hello() {
  // alert("Hello");
}

function TokenSwap(props: any) {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  const textTitleColor = useColorModeValue("gray.300", "gray.100");
  const textColor = useColorModeValue("gray.900", "gray.200");

  const bgColor = useColorModeValue("gray.100", "#1B1F3A");
  const bgBoxColor = useColorModeValue("#254B62", "gray.600");
  const buttonColor = useColorModeValue("#F58634", "#0E1555");
  const buttonTxtColor = useColorModeValue("gray.900", "gray.200");

  let web3 = new Web3();
  if (typeof window !== "undefined") web3 = new Web3(window.ethereum);

  const toast = useToast();

  const { activateBrowserWallet, account } = useEthers();
  const BNBBalance = useEtherBalance(account);
  const [bnbValue, setBnbValue] = useState("0");
  const [babyValue, setBabyValue] = useState("0");
  const { sendTransaction, state } = useSendTransaction();
  const [busdAllowrance, setBusdAllowrance] = useState(web3.utils.toBN(0));
  const { fastRefresh } = useRefresh();
  const [babyBalance, setBabyBalance] = useState("");
  const [busdBalance, setBusdBalance] = useState("");
  const [presaleRate, setPresaleRate] = useState(200);

  const tokenContractAddress = "0xeA3B1C3CE9a168f5AF6F9B8E1B4E65B7f727eCa0"; //config.contractAddress.babyToken[networkId];
  const ITokenContract = new web3.eth.Contract(
    tokenJSON.abi as any,
    tokenContractAddress
  );

  const presaleContractAddress = "0x3cc4E0529753D4c9061179796EC50EC00D3fE87C"; //config.contractAddress.presale[networkId];
  const IPresaleContractAddress = new web3.eth.Contract(
    presaleContractJSON.abi as any,
    presaleContractAddress
  );

  const busdContractAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee"; //config.contractAddress.busd[networkId];
  const IBusdContractAddress = new web3.eth.Contract(
    busdJSON as any,
    busdContractAddress
  );
  const tokenContract = {
    address: tokenContractAddress,
    abi: tokenJSON.abi,
    contract: ITokenContract,
    decimals: 18,
  };

  const presaleContract = {
    address: presaleContractAddress,
    abi: presaleContractJSON.abi,
    contract: IPresaleContractAddress,
  };

  const busdContract = {
    address: busdContractAddress,
    abi: busdJSON,
    contract: IBusdContractAddress,
    decimals: 18,
  };

  const ApproveBusd = async (address: string | null | undefined) => {
    const spender = presaleContract.address;
    const result = await busdContract.contract.methods
      .approve(spender, ethers.constants.MaxUint256)
      .send({ from: address });
    return result;
  };

  const checkAllowanceBusd = async (owner: string | null | undefined) => {
    const spender = presaleContract.address;
    const result = await busdContract.contract.methods
      .allowance(owner, spender)
      .call();
    return web3.utils.toBN(result);
  };

  const getBusdBalance = async (address: string) => {
    const result = await busdContract.contract.methods
      .balanceOf(address)
      .call();
    return web3.utils.toBN(result);
  };

  const getBalance = async (address: string) => {
    //const result = await callMethod(tokenContract.contract.methods['balanceOf'], [address]);
    const result = await tokenContract.contract.methods
      .balanceOf(address)
      .call();
    return web3.utils.toBN(result);
  };

  const getDepositRate = async () => {
    const result = await presaleContract.contract.methods.depositRate().call();
    return result;
  };

  const DepositBusd = async (
    address: string | null | undefined,
    amount: string
  ) => {
    console.log(address, amount);
    const result = await presaleContract.contract.methods
      .DepositBusd(amount)
      .send({ from: address });
    return result;
  };

  useEffect(() => {
    if (account != undefined || account != null) {
      getRates();
      loadUserDetail();
    } else {
      setBabyBalance("-");
      setBusdBalance("-");
    }
  }, [account]);

  const getRates = async () => {
    const busdbalance = await getBusdBalance(account ? account : "");
    const babybalance = await getBalance(account ? account : "");
    const depositRate = await getDepositRate();
    setBabyBalance(web3.utils.fromWei(babybalance));
    setBusdBalance(web3.utils.fromWei(busdbalance));
    setPresaleRate(depositRate);
  };

  const loadUserDetail = useCallback(async () => {
    const tokenAllowrance = await checkAllowanceBusd(account);
    setBusdAllowrance(tokenAllowrance);
    console.log("busd allowrance", tokenAllowrance);
  }, [account, fastRefresh]);

  const approveTokens = async () => {
    const result = await ApproveBusd(account);
    const tokenAllowrance = await checkAllowanceBusd(account);
    toast({
      title: "Successfully approved.",
      description: "You can purchase BABY with your BUSD from now.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    loadUserDetail();
  };

  // const { state, send , sendTransaction} = useContractFunction(contract, "withdraw", {
  //   transactionName: "Unwrap",
  // });

  function handleConnectWallet() {
    BNBBalance ? Hello() : activateBrowserWallet();
  }

  const Buy = async () => {
    const amount = `${bnbValue}`;
    const result = await DepositBusd(account, web3.utils.toWei(amount));
    getRates();
    return;
  };

  return (
    <Flex
      {...props}
      m="1px"
      pt={["5vh", "10vh", "12vh", "15vh"]}
      w={["80vw", "94vw", "50vw", "30vw"]}
    >
      <Box
        w={["94vw", "94vw", "50vw", "30vw"]}
        borderRadius="15px"
        m="0px"
        bg={grayscaleMode === "gray" ? "gray.500" : bgBoxColor}
        // boxShadow="2xl"
        // colorshodow="0px 0px 120px rgba(0, 0, 0,1)"
        boxShadow="lg"
        p="25px"
      >
        <Flex>
          <Box
            color={grayscaleMode === "gray" ? "gray.100" : textTitleColor}
            fontSize="18px"
          >
            Crowdsale #1
          </Box>
          <Spacer />
          {/* <Box>
            <RepeatIcon w={6} h={6} color="green.100" />
          </Box> */}
        </Flex>
        <Flex height="5">
          <Divider orientation="horizontal" pt="5px"></Divider>
        </Flex>
        <Box
          bg={grayscaleMode === "gray" ? "gray.700" : bgColor}
          id="BNB Field"
          p="5"
          height="100px"
          borderRadius="10"
          color={grayscaleMode === "gray" ? "gray.100" : textColor}
        >
          <Flex>
            <Box>From</Box>
            <Spacer />
            <Box>
              <Text paddingRight={"0"}>
                Balance : {parseFloat(busdBalance).toFixed(4)}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                type={"number"}
                value={bnbValue}
                max={parseFloat(busdBalance)}
                min={0}
                onChange={(e) => {
                  setBnbValue(e.target.value);
                  setBabyValue(
                    (parseFloat(e.target.value) * presaleRate).toString()
                  );
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  color={grayscaleMode === "gray" ? "gray.500" : textColor}
                  h="1.75rem"
                  size="sm"
                  style={{ marginRight: "10px", height: "35px" }}
                  onClick={() => {
                    setBnbValue(busdBalance);
                    setBabyValue(
                      (parseFloat(busdBalance) * presaleRate).toString()
                    );
                  }}
                >
                  Max
                </Button>
                <Image
                  className={grayscaleMode === "gray" ? "grayscale" : ""}
                  src={BUSDTokenIcon.src}
                  style={{ marginRight: "20px" }}
                  alt="BABY Icon"
                  boxSize="35px"
                  objectFit="cover"
                  display="inline"
                ></Image>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>

        <Flex height="2"></Flex>
        <Box
          color={grayscaleMode === "gray" ? "gray.100" : textColor}
          id="Baby Field"
          p="5"
          height="100px"
          bg={grayscaleMode === "gray" ? "gray.700" : bgColor}
          borderRadius="10"
        >
          <Flex>
            <Box>To</Box>
            <Spacer />
            <Box>
              <Text paddingRight="0">
                Balance : {parseFloat(babyBalance).toFixed(4)}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <InputGroup>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={"number"}
                  value={babyValue}
                  min={0}
                  max={presaleRate * parseFloat(busdBalance)}
                  onChange={(e) => {
                    setBabyValue(e.target.value);
                    setBnbValue(
                      (parseFloat(e.target.value) / presaleRate)
                        .toFixed(5)
                        .toString()
                    );
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Image
                    className={grayscaleMode === "gray" ? "grayscale" : ""}
                    src={BabyTokenIcon.src}
                    style={{ marginLeft: "20px" }}
                    alt="BABY Icon"
                    boxSize="35px"
                    objectFit="cover"
                    display="inline"
                  ></Image>
                </InputRightElement>
              </InputGroup>
            </InputGroup>
          </Flex>
        </Box>
        <Flex height="2"></Flex>
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          margin={"10px 5px 10px 5px"}
        >
          <Box
            color={grayscaleMode === "gray" ? "gray.100" : textTitleColor}
            fontSize="18px"
          >
            Rate
          </Box>
          <Box
            color={grayscaleMode === "gray" ? "gray.100" : textTitleColor}
            fontSize="18px"
          >
            {`1 BUSD per ${presaleRate}BABY`}
            <RepeatIcon marginLeft={"10px"} marginTop={"-3.5px"} />
          </Box>
        </Flex>
        <Center>
          {account &&
            (busdAllowrance < web3.utils.toBN(100) ? (
              <Button
                focusBorderColor="none"
                id="swap_button"
                border="0"
                w="95%"
                h="60px"
                borderRadius="15"
                backgroundColor="#F58634"
                onClick={approveTokens}
              >
                Approve
              </Button>
            ) : (
              <Button
                focusBorderColor="none"
                id="swap_button"
                border="0"
                w="95%"
                h="60px"
                borderRadius="15"
                // backgroundColor="#F58634"
                bg={grayscaleMode === "gray" ? "gray.700" : buttonColor}
                onClick={Buy}
                color={grayscaleMode === "gray" ? "gray.500" : buttonTxtColor}
              >
                Buy
              </Button>
            ))}

          {!account && (
            <Button
              focusBorderColor="none"
              id="swap_button"
              border="0"
              w="95%"
              h="60px"
              borderRadius="15"
              color={grayscaleMode === "gray" ? "gray.400" : buttonTxtColor}
              backgroundColor={
                grayscaleMode === "gray" ? "gray.800" : buttonColor
              }
              onClick={handleConnectWallet}
            >
              Connect wallet
            </Button>
          )}
        </Center>
      </Box>
    </Flex>
  );
}

export default TokenSwap;
