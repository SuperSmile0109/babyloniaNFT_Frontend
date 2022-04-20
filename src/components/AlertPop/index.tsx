import React from "react";
import { Alert, AlertIcon, AlertTitle, Tooltip } from "@chakra-ui/react";

export default function AlertPop(props: any) {
  return (
    // <Tooltip hasArrow label="Search places" bg="red.600">
    //   <AlertIcon />
    // </Tooltip>
    // <Tooltip hasArrow label="Search places" isOpen>
      <Alert
        status="error"
        w="80%"
        mt="1"
        ml="10"
        borderTopRightRadius={15}
        borderBottomRightRadius={15}
        borderBottomLeftRadius={35}
      >
        <AlertIcon />
        <AlertTitle mr={1}>{props.title}</AlertTitle>
      </Alert>
   
  );
}
