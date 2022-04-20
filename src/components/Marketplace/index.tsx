import Header from "@components/Header";
import Footer from "@components/Footer";
import Menu from "../Menu";
import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import StakingSlide from "@assets/Slides_Staking_001_3x4_1.png";
import Image from "@components/Common/Image";
import { useAppSelector } from "@hooks";
import { useEffect, useState } from "react";
import NFTs from "@nft/NFTCategories.json";
import AllCollection from "@nft/NFT_meta_01.json";
import NFTList from "@components/NFTList";
import _ from "lodash";

interface Categories {
  name: string;
  collection: string;
  subcategories: [any];
}
interface SubCategories {
  name: string;
  collection: string;
}

const Marketplace = () => {
  const [filteredCollection, setFilteredCollection] = useState<any[]>([]);
  const [filterString, setFilterString] = useState("");
  const [NFTCategories, setNFTCategories] = useState<Categories[]>([]);
  const [SelectedNFTCategories, setSelectedNFTCategories] =
    useState<Categories>({ name: "", collection: "", subcategories: [""] });
  const [subCategories, setSubCategories] = useState<SubCategories[]>([]);
  const [categories, setCategories] = useState({});
  const [SelectedSubCategories, setSelectedSubCategories] =
    useState<Categories>({ name: "", collection: "", subcategories: [""] });

  useEffect(() => {
    setupApi().then((data: any) => {
      setNFTCategories(data);
    });
    AllCollectionApi().then((data: any) => {
      setFilteredCollection(data);
      setCategories(_.groupBy(data, "Collection"));
      console.log("categories : ", _.groupBy(data, "Collection"));
      console.log("categories groupby: ", Object.values(categories));
    });
  }, []);

  useEffect(() => {
    setFilter(
      filterString,
      SelectedNFTCategories.name,
      SelectedSubCategories.collection
    );

  }, [SelectedSubCategories.collection]);

  useEffect(() => {
    setSelectedSubCategories({ name: "", collection: "", subcategories: [""] });
    setFilter(
      filterString,
      SelectedNFTCategories.name,
      SelectedSubCategories.collection
    );
  }, [SelectedNFTCategories.name]);

  useEffect(() => {
    setFilter(
      filterString,
      SelectedNFTCategories.name,
      SelectedSubCategories.collection
    );
  }, [filterString]);

  const setupApi = async () => {
    console.log(NFTs);
    return NFTs;
  };
  const setFilter = (
    inputText: string,
    selectedCategory: string,
    selectedCollection: string
  ) => {
    let q = AllCollection;
    if (selectedCategory !== "" && selectedCategory.toLowerCase() !== "all") {
      q = q.filter(
        (d) => d.Collection.toLowerCase() === selectedCollection.toLowerCase()
      );
    }

    if (inputText.length > 0) {
      q = q.filter(
        (d) =>
          inputText.toLowerCase() === "" ||
          d["NFT Name"].toLowerCase().includes(inputText.toLowerCase())
      );
    }

    setFilteredCollection(q);
    setCategories(_.groupBy(q, "Collection"));
  };

  function InputChanged(e: any) {
    setFilterString(e.target.value);
    setFilter(
      e.target.value,
      SelectedNFTCategories.name,
      SelectedSubCategories.collection
    );
  }
  const AllCollectionApi = async () => {
    return AllCollection;
  };

  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  const bgColor = useColorModeValue("gray.400", "gray.700");
  const categoryBgColor = useColorModeValue("gray.100", "gray.800");
  const selectedCategoryBgColor = useColorModeValue("gray.800", "gray.300");
  const CategoryTextColor = useColorModeValue("gray.900", "gray.200");
  const selectedCategoryTextColor = useColorModeValue("gray.400", "gray.900");
  const subCategoryTextColor = useColorModeValue("gray.900", "gray.200");
  const selectedSubCategoryTextColor = useColorModeValue(
    "gray.400",
    "gray.900"
  );
  const subCategoryBgColor = useColorModeValue("gray.300", "gray.800");
  const selectedSubCategoryBgColor = useColorModeValue("gray.800", "gray.300");
  const subCategoryBorderColor = useColorModeValue("gray.300", "gray.800");
  const selectedSubCategoryBorderColor = useColorModeValue(
    "gray.800",
    "gray.300"
  );

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
      <Menu></Menu>
      <Box
        h={["100vh", "100vh", "100vh", "full"]}
        //   pt="300px"
        bg={bgColor}
        pb="100px"
        align="center"
        justifyContent="center"
      >
        <Flex bg={bgColor} alignItems="center" justifyContent="center">
          <Box bg={bgColor}>
            {console.log(
              "SelectedSubCategories.name = ",
              SelectedSubCategories.name
            )}
            <Input
              w={["90vw", "90vw", "50vw", "30vw"]}
              mt="15px"
              onChange={InputChanged}
            ></Input>
            <HStack m="4" alignItems="center" justifyContent="center" flexWrap="wrap">
              {NFTCategories &&
                NFTCategories.map((category: Categories, index: any) => {
                  return (
                    <>
                      <Box
                        bg={
                          category.name === SelectedNFTCategories.name
                            ? selectedCategoryBgColor
                            : categoryBgColor
                        }
                        color={
                          category.name === SelectedNFTCategories.name
                            ? selectedCategoryTextColor
                            : CategoryTextColor
                        }
                        key={index}
                        borderRadius="10px"
                        m="2px"
                        p="10px"
                        onClick={() => {
                          setSelectedNFTCategories(category);
                          setSubCategories(category.subcategories);
                          console.log("category **==", category);
                        }}
                        h="full"
                      >
                        <Text fontFamily="'Ropa Sans'" fontSize={18}>
                          {category.name}
                        </Text>
                      </Box>
                    </>
                  );
                })}
            </HStack>
            <HStack m="4" alignItems="center" justifyContent="center">
              {subCategories &&
                subCategories.map((category: any, index: any) => {
                  return (
                    <Box
                      bg={
                        category.name === SelectedSubCategories.name
                          ? selectedCategoryBgColor
                          : categoryBgColor
                      }
                      color={
                        category.name === SelectedSubCategories.name
                          ? selectedCategoryTextColor
                          : CategoryTextColor
                      }
                      key={"a" + index}
                      borderRadius="10px"
                      m="2px"
                      p="10px"
                      onClick={() => setSelectedSubCategories(category)}
                      h="full"
                    >
                      <Text fontFamily="'Ropa Sans'" fontSize={18}>
                        {category.name}
                      </Text>
                    </Box>
                  );
                })}
            </HStack>
            <NFTList
              category={SelectedNFTCategories}
              subcategory={SelectedSubCategories}
              Collection={filteredCollection}
              collectionCategories={categories}
            ></NFTList>
          </Box>
        </Flex>
      </Box>

      <Footer></Footer>
    </Container>
  );
};

export default Marketplace;
