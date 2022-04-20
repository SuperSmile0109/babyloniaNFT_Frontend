import {
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NFTCard from "@components/NFTCard";
import { useEffect, useState } from "react";

const NFTList = (props: any) => {
  const bgColor = useColorModeValue("gray.400", "gray.700");
  const bgNFTCard = useColorModeValue("gray.600", "gray.400");
  const bgNFTCardImage = useColorModeValue("gray.500", "gray.500");

  const [collection, setCollection] = useState([]);
  const [collectionCategories, setCollectionCategories] = useState({});
  useEffect(() => {
    setCollection(props.Collection);
    setCollectionCategories(props.collectionCategories);
  }, [props.Collection]);

  return (
    <>
      {Object.entries(collectionCategories).map(
        ([cat, items]: any, idx: any) => {
          return (
            <Box key={idx}>
              <Text
                align="left"
                key={idx}
                fontFamily="'Ropa Sans'"
                fontSize={34}
              >
                {cat}
              </Text>
              <Divider></Divider>
              <br></br>
              <Flex bg={bgColor} alignItems="center" justifyContent="center">
                <SimpleGrid
                  columns={[2, 2, 4, 4]}
                  m={["4", "4", "4", "4"]}
                  alignItems="center"
                  justifyContent="center"
                  spacing={30}
                  mb={["4", "4", "14", "14"]}
                >
                  {items.map((item: any) => {
                    return (
                      <NFTCard
                        key={item["NFT Name"]}
                        id={item["NFT Name"]}
                        NFTName={item["NFT Name"]}
                        Collection={item.Collection}
                        ImageSrc={item["File Name"]}
                        Availability={item["Availability"]}
                        SellingPrice={item["Selling Price"]}
                        background={bgNFTCard}
                        backgroundImage={bgNFTCardImage}
                      />
                    );
                  })}
                </SimpleGrid>
              </Flex>
            </Box>
          );
        }
      )}

      <Box h="10vw"></Box>
    </>
  );
};

export default NFTList;
