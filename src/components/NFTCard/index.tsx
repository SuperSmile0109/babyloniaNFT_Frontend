import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppSelector } from "@hooks";
import BabyIcon from "@assets/icons/tokens/NFTCard/icon_baby_02_64px.png";
import BNBIcon from "@assets/icons/tokens/NFTCard/icon_bnb_01_64px.png";
import PolygonIcon from "@assets/icons/tokens/NFTCard/icon_polygon_01_64px.png";
import ETHIcon from "@assets/icons/tokens/NFTCard/icon_eth_01_64px.png";
import AVAXIcon from "@assets/icons/tokens/NFTCard/icon_avax_01_64px.png";
import FantomIcon from "@assets/icons/tokens/NFTCard/icon_fantom_01_64px.png";

const NFTCard = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const bgColor = useColorModeValue("gray.400", "gray.800");
  const bgNFTCard = useColorModeValue("gray.400", "gray.400");
  const bgNFTCardImage = useColorModeValue("gray.300", "gray.500");
  const img = props.ImageSrc;
  return (
    <Box
      className={grayscaleMode === "gray" ? "grayscale" : ""}
      w={["40vw", "40vw", "15vw", "15vw"]}
      bg={bgNFTCard}
      h="full"
      pb="15px"
      borderRadius="15px"
      boxShadow="dark-lg"
    >
      <Box
        w={["38vw", "38vw", "14vw", "14vw"]}
        bg={bgNFTCardImage}
        // h="full"
        p={1}
        borderRadius="15px"
        mt={2}
      >
        <Image borderRadius="15px" src={img} alt={img} pb={1}></Image>
        <Box bg={bgColor} borderBottomRadius="10px" pt={1}>
          <SimpleGrid columns={2} spacing={3}>
            <Box>
              <Text align="left" ml={2} fontFamily="'Ropa Sans'" fontSize={14}>
                {props["Collection"]}
              </Text>
            </Box>
            <Box>
              <Text align="right" mr={2} fontFamily="'Ropa Sans'" fontSize={14}>
                Available: {props["Availability"]}
              </Text>
            </Box>
          </SimpleGrid>

          <Text
            // bg="red"
            // width={"full"}
            align="left"
            mx={2}
            fontFamily="'Ropa Sans'"
            fontSize={22}
          >
            {props["NFTName"]}
          </Text>
          <Box mx={2} bg="white" h="1px"></Box>
          <Flex align="center" >
            <Text
              fontFamily="'Ropa Sans'"
              fontSize={12}
              align="left"
              pl={2}
              pr={1}
              my={2}
            // pb="2"
            >
              Asking Price: {props["SellingPrice"]} BABY
            </Text>
            <Flex direction="row" justifyContent="center" alignItems="center" flexWrap="wrap">
              <Image boxSize="20px" src={BabyIcon.src} alt="BabyToken" mr={2} />
              <Image boxSize="16px" src={BNBIcon.src} alt="BNBToken" />
              <Image boxSize="16px" src={PolygonIcon.src} alt="PolygonToken" />
              <Image boxSize="16px" src={ETHIcon.src} alt="ETHToken" />
              <Image boxSize="16px" src={AVAXIcon.src} alt="AVAXToken" />
              <Image boxSize="16px" src={FantomIcon.src} alt="FantomToken" />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCard;
