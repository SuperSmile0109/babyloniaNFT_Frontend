import { Box, Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
// import { Link as LinkRouter, useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@hooks";

const ButtonWithIcon = (props: any) => {
  const router = useRouter();
  const bgColorLight = useColorModeValue("gray.200", "gray.500");
  const bgColorDark = useColorModeValue("gray.500", "gray.700");
  const textColorLight = useColorModeValue("gray.900", "gray.100");
  const textColorDark = useColorModeValue("gray.800", "gray.300");
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  if (props.icon) {
    return (
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button 
         fontFamily="'Ropa Sans'" fontSize={18}
          py="5px"
          h="40px"
          mx="3px"
          bg={router.pathname === props.pathname ? bgColorLight : bgColorDark}
          variant="ghost"
          w="full"
          color={
            router.pathname === props.pathname ? textColorLight : textColorDark
          }
        >
          {props.label}
        </Button>
      </ButtonGroup>
    );
  } else
    return (
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          py="5px"
          h="55px"
          mr="10px"
          bg={router.pathname === props.pathname ? bgColorLight : bgColorDark}
          variant="ghost"
          w="160px"
          color={
            router.pathname === props.pathname ? textColorLight : textColorDark
          }
        >
          <Box mr="10px" w="40}px" h="40px" py="1px">
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              src={props.icon}
              width={40}
              height={40}
              alt={props.lable}
            ></Image>
          </Box>
          {props.label}
        </Button>
      </ButtonGroup>
    );
};

export default ButtonWithIcon;
