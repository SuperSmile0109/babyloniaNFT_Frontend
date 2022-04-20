import { NextComponentType } from "next";

import NextImage from "src/components/Common/Image";

import tokenomics from "@assets/slides/SLIDES_TOKEN_011_1600x1400_withLogo.png";
import { useAppSelector, useAppDispatch } from "@hooks";
const Tokenomics: NextComponentType = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  return (
    <NextImage
      className={grayscaleMode === "gray" ? "grayscale" : ""}
      src={tokenomics}
      layout="responsive"
      alt="tokenamics"
    />
  );
};
export default Tokenomics;
