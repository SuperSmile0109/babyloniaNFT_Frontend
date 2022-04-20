// AccountModal.tsx
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useClipboard,
  // useDisclosure,
  useToast,
} from "@chakra-ui/react";
// const toast = useToast();
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import Identicon from "../Identicon";
import { setWalletAddress, walletActions } from "@store/walletSlice";
import { useAppSelector, useAppDispatch } from "@hooks";

// AccountModal.tsx
export default function AccountModal(props: any) {
  const { isOpen, onClose } = props;
  const { chainId, account, deactivate } = useEthers();
  const dispatch = useAppDispatch();
  console.log("chainId :  ", chainId);
  dispatch(walletActions.setChainId(Number(chainId)));

  const walletAddress = useAppSelector(
    (state: any) => state.wallet.walletAddress
  );
  const balance = useAppSelector((state: any) => state.wallet.balance);

  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(account ? account : "");
  const Disscounect = () => {
    deactivate();
    toast({
      title: "Disconnect Wallet.",
      description: "Your wallet dissconnected!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
        overflowX="auto"
        whiteSpace="nowrap"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="10"
            border="2px"
            borderStyle="solid"
            borderColor="gray.700"
            px={2}
            pt={2}
            pb={2}
            mb={2}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Connected with wallet
              </Text>
              <Button
                variant="outline"
                size="sm"
                borderColor="green.800"
                borderRadius="3xl"
                color="green.500"
                fontSize="16px"
                fontWeight="normal"
                px={2}
                onClick={Disscounect}
                height="26px"
                _hover={{
                  background: "none",
                  borderColor: "green.300",
                  textDecoration: "underline",
                }}
              >
                Disconnect
              </Button>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text
                color="white"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {walletAddress &&
                  `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                    walletAddress.length - 4,
                    walletAddress.length
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <Button
                variant="link"
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "whiteAlpha.800",
                }}
                onClick={() => {
                  onCopy();
                  toast({
                    title: "Copy To Clipboard.",
                    description: "Your wallet address copied to clipboard!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={
                  chainId === 97
                    ? `https://testnet.bscscan.com/address/${account}`
                    : `https://bscscan.com/address/${account}`
                }
                isExternal
                color="gray.400"
                ml={6}
                _hover={{
                  color: "whiteAlpha.800",
                  textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="end"
          background="gray.700"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Text
            color="white"
            textAlign="left"
            fontWeight="medium"
            fontSize="md"
          ></Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
