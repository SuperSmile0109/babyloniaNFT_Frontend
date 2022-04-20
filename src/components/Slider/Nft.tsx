import { NextComponentType } from "next";

import Image from "src/components/Common/Image";
import { useAppSelector, useAppDispatch } from "@hooks";

import nft from "@assets/slides/SLIDES_NFT_002_4x3_withLogo.jpg";

const NFT: NextComponentType = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  return (
    <Image
      className={grayscaleMode === "gray" ? "grayscale" : ""}
      src={nft}
      layout="responsive"
      alt="nft"
    />
  );
};
export default NFT;
