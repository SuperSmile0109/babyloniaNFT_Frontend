// ConnectButton.tsx
import {
  Button,
  Box,
  Text,
  useToast,
  HStack,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Link,
  Image,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

import { formatEther } from "@ethersproject/units";
import { GrConnect } from "react-icons/gr";
import { useEffect } from "react";
import { BigNumberish } from "@ethersproject/bignumber";
import MetaMaskLogo from "../../assets/Metamask_logo.png";
import WalletConnectLogo from "../../assets/walletconnect-logo.png";
import TrustWalletBlueLogo from "../../assets/Trust_Wallet_Blue.png";
import AccountModal from "../AccountModal";
// import { useNavigate } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
import {
  // getWalletAddress,
  // setWalletAddress,
  walletActions,
} from "../../store/walletSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";

// type Props = {
//   handleOpenModal: any;
// };
declare const window: any;

export default function ConnectButton(props: any) {
  const toast = useToast();
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalConnectWallet = useDisclosure();
  const textColor = useColorModeValue("gray.900", "gray.200");
  const textBNBColor = useColorModeValue("gray.900", "gray.300");
  const BtnBorderColor = useColorModeValue("teal.600", "gray.500");

  const bgColor = useColorModeValue("teal.500", "teal.800");
  const bgBtnColor = useColorModeValue("gray.100", "gray.800");
  let chainCurrencyName = "BNB";
  if ([56, 97].includes(chainId as number)) chainCurrencyName = "Binance";
  if ([137, 80001].includes(chainId as number)) chainCurrencyName = "Polygon";
  if ([250, 4002].includes(chainId as number)) chainCurrencyName = "Fantom";
  if ([1, 4].includes(chainId as number)) chainCurrencyName = "Ethereum";
  if ([43113, 43114].includes(chainId as number)) chainCurrencyName = "Avalanche";

  useEffect(() => {
    // Check if MetaMask is installed on user's browser
    if (window.ethereum) {
      // const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      // const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    } else {
      // Show alert if Ethereum provider is not detected
      toast({
        title: "Connect to Wallet",
        description: "Install wallet!",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
    }
  }, []);

  // const walletAddress = useAppSelector(
  //   (state: any) => state.wallet.walletAddress
  // );
  const walletAddress = useAppSelector(
    (state: any) => state.wallet.walletAddress
  );
  const { hasCopied, onCopy } = useClipboard(walletAddress);

  const balance = useAppSelector((state: any) => state.wallet.balance);
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  const dispatch = useAppDispatch();

  // console.log("etherBalance :  ", etherBalance);
  if (typeof account !== "undefined") {
    console.log("account :  ", account);
    dispatch(walletActions.setWalletAddress(String(account)));
    // dispatch(walletActions.setChainId(chainId));
  }
  if (typeof etherBalance !== "undefined") {
    console.log(
      "etherBalance?????????????????????????????????? :  ",
      parseFloat(formatEther(etherBalance)) as BigNumberish
    );
    dispatch(
      walletActions.setBalance(
        parseFloat(formatEther(etherBalance)) as BigNumberish
      )
    );
  }

  const handleConnectWallet = async () => {
    // navigate("/ConnectWallet", { replace: true });
    // toast({
    //   title: "Connect to Walletkjlskjlkjsd",
    //   description: "Install a wallet!",
    //   status: "warning",
    //   duration: 10000,
    //   isClosable: true,
    // });
    const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
    const a = await activateBrowserWallet();
    await delay(1000);
    return a;
  };

  const setWalletInfo = (walletInfo: any) => {
    // setCookie("Wallet_Info", walletInfo, {
    //   path: "/",
    //   expires: new Date(Date.now() + 2592000),
    //   secure: true,
    //   sameSite: "none",
    // });
  };

  const ModalMetaMaskClick = () => {
    toast({
      title: "Connected to Wallet.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    // console.log(walletInfo());
    // initialWalletInfo();
    setWalletInfo({
      Wallet: "MetaMask",
      WalletAddress: "0x098098098089089098089089",
      BabyBalance: "",
    });
  };

  return account ? (
    <HStack {...props}>
      <Flex
        // display="flex"
        // direction="row"
        direction={props.direction}
        alignItems="center"
        // bg="gray.300"
        borderRadius="xl"
        py="0"
        bg={bgBtnColor}
        border="2px"
        borderColor={BtnBorderColor}
      >
        <Box px="2" display={props.display}>
          <Text color={textBNBColor} fontSize="xd" variant="ghost">
            {/* {balance && parseFloat(balance).toFixed(3)} */}
            <span>&nbsp;{chainCurrencyName} </span>
          </Text>
        </Box>
        <Button
          // add named function to handle opening modal
          onClick={onOpen}
          variant="ghost"
          bg={grayscaleMode === "gray" ? "gray.600" : bgColor}
          border="2px solid transparent"
          _hover={{
            border: "2px",
            borderStyle: "solid",
            borderColor: "yellow.500",
            bg: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
        >
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {walletAddress &&
              `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                walletAddress.length - 4,
                walletAddress.length
              )}`}
          </Text>
        </Button>
      </Flex>

      <Modal
        blockScrollOnMount={false}
        isOpen={modalConnectWallet.isOpen}
        onClose={modalConnectWallet.onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing="24px">
              <Link onClick={ModalMetaMaskClick}>
                <Image
                  w="150px"
                  mb="10"
                  p="2"
                  boxShadow="dark-lg"
                  border="1px"
                  borderColor="red.200"
                  borderRadius="5px"
                  src={MetaMaskLogo.src}
                  alt="Metamask Logo"
                ></Image>
              </Link>

              <Link>
                <Image
                  w="150px"
                  mb="10"
                  p="2"
                  boxShadow="dark-lg"
                  border="1px"
                  borderColor="red.200"
                  borderRadius="5px"
                  src={WalletConnectLogo.src}
                  alt="WalletConnect Logo"
                ></Image>
              </Link>
              <Link>
                <Image
                  w="150px"
                  mb="10"
                  p="2"
                  boxShadow="dark-lg"
                  border="1px"
                  borderColor="red.200"
                  borderRadius="5px"
                  src={TrustWalletBlueLogo.src}
                  alt="Trust Wallet Blue Logo"
                ></Image>
                onClick={onCopy}
              </Link>
            </HStack>

            <Text fontWeight="bold" mb="1rem">
              System Automatically Updates Your Wallet Info
            </Text>

            <Progress size="xs" isIndeterminate />
            <HStack>
              <Text fontWeight="bold" mb="1rem">
                Connected with :
              </Text>
              <Text mb="1rem">{walletAddress ? walletAddress : ""}</Text>
            </HStack>
            <Text>Your wallet addres : </Text>
            <Text as="kbd" fontWeight="bold">
              {walletAddress + "sss"}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button color="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">aaCopy Address</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AccountModal
        isOpen={isOpen}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
    </HStack>
  ) : (
    <Button
      {...props}
      // variantColor={textColor}
      // display={props.display}
      leftIcon={<GrConnect color={bgColor} />}
      bg={grayscaleMode === "gray" ? "gray.600" : bgColor}
      color={textColor}
      variant="solid"
      className="shadow-lg"
      onClick={() => {
        handleConnectWallet().then((a) => {
          if (a === undefined) {
            // navigate("/ConnectWallet", { replace: true });
            // toast({
            //   title: "Connect to Wallet!!!!!",
            //   description: "Install a wallet!",
            //   status: "warning",
            //   duration: 10000,
            //   isClosable: true,
            // });
          } else {
            // dispatch(walletActions.setWalletAddress());
          }
        });
      }}
    >
      Connect wallet
    </Button>
  );
}
