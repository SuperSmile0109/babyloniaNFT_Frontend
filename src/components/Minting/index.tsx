import React, { useState, useEffect } from "react";
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
  Input,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAppSelector } from "@hooks";
import DefaultImage from "../../assets/images/default.png";
import { create } from "ipfs-http-client";
import Web3 from "web3";
import { useEthers, useEtherBalance, useSendTransaction } from "@usedapp/core";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
const contractAddress = "0x728f35b4512B71Ff18a96e4A2d93E156091D1c00";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "mintItem",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
declare const window: any;

type Trait = {
  type: string;
  value: string;
};

const Minting = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { account } = useEthers();

  const [attributes, setAttributes] = useState<Trait[]>();
  const [newType, setNewtype] = useState("");
  const [newValue, setNewValue] = useState("");

  const [name, setName] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");

  const [imageURI, setImageURI] = useState("");

  const [uploading, setUploading] = useState(false);
  const [ipfsuploading, setIpfsUploading] = useState(false);

  const bgColor = useColorModeValue("gray.200", "gray.700");

  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const handleAddNewAttribute = () => {
    if (newValue == "" || newType == "") {
      toast({
        title: "Invalid Input.",
        description: "Input the trait type and value correctly.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    //<<<<<<< kt-search-nft
    //    let _attr: Array<any>;
    //    _attr = [...attributes];
    //    _attr.push({
    //      type: newType,
    //      value: newValue,
    //    });
    //=======
    const _attr: Trait[] = [];

    if (attributes !== undefined && attributes?.length > 0)
      for (let index = 0; index < attributes.length; index++)
        _attr.push(attributes[index]);
    if (newType && newValue) {
      _attr.push({
        type: newType,
        value: newValue,
      });
    }

    setAttributes(_attr);
    setNewtype("");
    setNewValue("");
  };

  const handleClickTraitModal = () => {
    if (imageURI == "") {
      toast({
        title: "Select an image.",
        description: "You should select the nft art to add traits.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    onOpen();
  };

  const handleMint = async () => {
    const _metadata = {
      name,
      image: `https://ipfs.io/ipfs/${imageURI}`,
      externalLink,
      description,
      attributes,
    };

    setUploading(true);
    const added = await client.add(JSON.stringify(_metadata));
    const contract = new web3.eth.Contract(abi as any, contractAddress);
    // console.log(contract.methods);
    console.log(account);
    console.log(added.path);
    const result = await contract.methods
      .mintItem(`${added.path}`)
      .send({ from: account });
    setUploading(false);
  };

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
      <Box bg={bgColor} pb="150px">
        <Flex align="center" bg={bgColor}>
          <Box flex="1" bg={bgColor}>
            <VStack m="4">
              <Box w="40vw">
                <Flex direction="column" fontFamily="Ropa Sans">
                  <Text fontSize="5xl" fontWeight="600">
                    Create New Item
                  </Text>
                  <Text mt="10px">* Required fields</Text>
                  <Box mt="10px">
                    <Text fontSize="2xl">
                      Image, Video, Audio, or 3D Model<span>*</span>
                    </Text>
                    <Text>
                      File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                      WAV, OGG, GLB, GLTF. Max size: 100 MB
                    </Text>
                    <VStack start="left">
                      {ipfsuploading ? (
                        <Spinner size={"lg"} marginTop={"10"} />
                      ) : (
                        <label
                          htmlFor="image-file"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Image
                            boxSize="300px"
                            src={`${
                              imageURI == ""
                                ? DefaultImage.src
                                : `https://ipfs.io/ipfs/${imageURI}`
                            }`}
                            alt="Dan Abramov"
                            cursor={"pointer"}
                          />
                          <input
                            hidden
                            type={"file"}
                            id={"image-file"}
                            onChange={async (e) => {
                              let files:
                                | HTMLInputElement["files"]
                                | FileList
                                | null;
                              files = e.target.files;
                              if (files !== null) {
                                try {
                                  setIpfsUploading(true);
                                  const added = await client.add(files[0]);
                                  const url = `https://ipfs.io/ipfs/${added.path}`;
                                  setImageURI(added.path);
                                  setIpfsUploading(false);
                                } catch (error) {
                                  console.log("Error uploading file: ", error);
                                }
                              }
                            }}
                          />
                        </label>
                      )}
                    </VStack>
                  </Box>
                  <Box mt="20px">
                    <Text fontSize="2xl">
                      Name <span className="red  ">*</span>
                    </Text>
                    <Input
                      placeholder="Name"
                      size="md"
                      bg={useColorModeValue("white", "gray.700")}
                      color={useColorModeValue("black", "white")}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                  <Box mt="10px">
                    <Text fontSize="2xl">External Link</Text>
                    <Input
                      placeholder="External Link"
                      size="md"
                      bg={useColorModeValue("white", "gray.700")}
                      color={useColorModeValue("black", "white")}
                      onChange={(e) => setExternalLink(e.target.value)}
                    />
                  </Box>
                  <Box mt="10px">
                    <Text fontSize="2xl">Description</Text>
                    <Textarea
                      placeholder="Description"
                      bg={useColorModeValue("white", "gray.700")}
                      color={useColorModeValue("black", "white")}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Textarea>
                  </Box>
                  <Box mt="10px">
                    <Text fontSize="2xl">Supply</Text>
                    <Input
                      placeholder="Supply"
                      type="number"
                      size="md"
                      bg={useColorModeValue("white", "gray.700")}
                      color={useColorModeValue("black", "white")}
                      defaultValue={1}
                      onChange={(e) => setSupply(e.target.value)}
                    />
                  </Box>
                  <Box mt="30px">
                    <Center>
                      <Button
                        bg={useColorModeValue("white", "gray.600")}
                        color={useColorModeValue("black", "white")}
                        onClick={handleClickTraitModal}
                      >
                        <span>
                          <AddIcon />
                        </span>
                        <Text ml="10px" fontSize="25px">
                          Create
                        </Text>
                      </Button>

                      <Modal isOpen={isOpen} onClose={onClose} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Add Traits</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Table variant="simple">
                              <TableCaption>
                                Add traits for your Asset
                              </TableCaption>
                              <Thead>
                                <Tr>
                                  <Th>Name</Th>
                                  <Th>Description</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {attributes !== undefined &&
                                  attributes.map((item: Trait, index: any) => (
                                    <Tr key={index}>
                                      <Td>
                                        <Text>{item.type}</Text>
                                      </Td>
                                      <Td>
                                        <Text>{item.value}</Text>
                                      </Td>
                                    </Tr>
                                  ))}
                              </Tbody>
                              <Tfoot>
                                <Tr>
                                  <Td>
                                    <Input
                                      outline={
                                        "1px solid " +
                                        useColorModeValue("grey", "grey")
                                      }
                                      value={newType}
                                      onChange={(e: {
                                        target: { value: string };
                                      }) => {
                                        setNewtype(e.target.value);
                                      }}
                                      size="sm"
                                    />
                                  </Td>
                                  <Td>
                                    <Input
                                      outline={
                                        "1px solid " +
                                        useColorModeValue("grey", "grey")
                                      }
                                      value={newValue}
                                      onChange={(e: {
                                        target: { value: string };
                                      }) => {
                                        setNewValue(e.target.value);
                                      }}
                                      size="sm"
                                    />
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Th colSpan={2}>
                                    <Button
                                      width="100%"
                                      onClick={handleAddNewAttribute}
                                    >
                                      Add New Attribute
                                    </Button>
                                  </Th>
                                </Tr>
                              </Tfoot>
                            </Table>
                            <Box padding={"8px 24px 8px 24px"}>
                              <Button width="100%" onClick={handleMint}>
                                {uploading ? "Minting..." : "Mint"}
                              </Button>
                            </Box>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </Center>
                  </Box>
                </Flex>
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

export default Minting;
