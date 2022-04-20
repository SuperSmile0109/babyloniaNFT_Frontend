import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useAppSelector, useAppDispatch } from "@hooks";
const ImageLogo = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return (
    <Box
      w={["84px", "64px", "70px", "100px"]}
      h={["84px", "64px", "70px", "100px"]}
      _hover={{
        transform: "scale(1.05)",
        transitionDuration: "300ms",
      }}
    >
      <Image
  className={grayscaleMode === "gray" ? "grayscale" : ""}
        src={props.logo}
        onClick={(e) => {
          props.onClick();
        }}
        alt={props.title}
      ></Image>
    </Box>
  );
};

export default ImageLogo;
