import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { AiOutlineCheckSquare, AiOutlineBorder } from "react-icons/ai";
// import { Link as LinkRouter, useLocation } from "react-router-dom";
import ButtonWithIcon from "../ButtonWithIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@hooks";

const BabyMenuTextItem = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  const { isLast = true, to, icon, label = "Menu Item", ...rest } = props;

  const router = useRouter();
  return (
    <Link href={to} passHref>
      <Flex
        my="3vw"
        py="2"
        bg={router.pathname === to ? "gray.300" : "gray.100"}
        borderRadius="15"
      >
        <Center>
          {/* <ButtonWithIcon pathname={to} icon={icon} label={label}></ButtonWithIcon> */}
          {/* {router.pathname === to ? (
            <AiOutlineCheckSquare size="40px" />
          ) : (
            <AiOutlineBorder size="40px" />
          )} */}
          <Box pr="10px" pt="5px" pl="15px">
            <Image
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              src={props.icon}
              width="40px"
              height="40px"
              alt="image"
            ></Image>
          </Box>
          <Text
            fontSize="2xl"
            color={router.pathname === to ? "black" : "gray.600"}
            display="block"
            {...rest}
            w="70vw"
          >
            {label}
          </Text>
        </Center>
      </Flex>
    </Link>
  );
};
export default BabyMenuTextItem;
