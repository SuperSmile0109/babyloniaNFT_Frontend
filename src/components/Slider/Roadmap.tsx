import { NextComponentType } from "next";

import Image from "src/components/Common/Image";

import roadmap from "@assets/slides/Babylonia-TheRoadmap02.jpg";
import { useAppSelector, useAppDispatch } from "@hooks";
const Roadmap: NextComponentType = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return (
    <Image
      className={grayscaleMode === "gray" ? "grayscale" : ""}
      src={roadmap}
      layout="responsive"
      alt="betting"
    />
  );
};

export default Roadmap;
