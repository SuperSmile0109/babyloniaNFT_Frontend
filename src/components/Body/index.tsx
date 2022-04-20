import {
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import TokenList from "../TokenList";
import ConnectButton from "../ConnectButton";

export default function Body(props: any) {
  const bgColor = useColorModeValue("gray.400", "gray.700");
  return (
    <Flex
      w="100vw"
      h={["full", "80vh", "85vh", "full"]}
      pt={["88px", "88px", "80px", "80px"]}
      bg="gray.200"
    >
      <Box bg={bgColor}>
        <Box
          h="100vh"
          w="100vw"
          display="block"
          pos="fixed"
          top="0px"
          left="0px"
          bg={bgColor}
          zIndex="-1"
        ></Box>
        <VStack>
          <Stack h="90vh" w="100vw" pt="15px"></Stack>
        </VStack>
      </Box>
    </Flex>
  );
}
