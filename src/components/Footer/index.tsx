import {
  Text,
  VStack,
  Stack,
  Image,
  Container,
  Flex,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import BabyloniaLogo from "../../assets/Logo.png";
import SocialNetworkIcons from "../SocialNetworkIcons";
// 0x358c11d119c60cfa17c9b9a99ea3da21ff407e1f
export default function Footer() {
  const bgColor = useColorModeValue("gray.700", "gray.900");
  return (
    <Flex
      as="footer"
      position="fixed"
      left="0"
      bottom="0"
      mx="0"
      px="0"
      w="100%"
      h="70px"
      zIndex={200}
    > 
      <Container as="main" mt="0" mx="0" px="0" minWidth="full">
        <Stack bg={bgColor} h="full">
          <VStack w="full" align="left" p="15px">
            <Center>
              <SocialNetworkIcons></SocialNetworkIcons>
            </Center>
          </VStack>
        </Stack>
      </Container>
    </Flex>
  );
}
