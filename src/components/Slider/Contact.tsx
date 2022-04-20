import { NextComponentType } from "next";

import Image from "@components/Common/Image";

import contact from "@assets/slides/SLIDES_CONTACT_011_1600x1400_withLogo.png";
import { useAppSelector, useAppDispatch } from "@hooks";

const Contact: NextComponentType = () => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);

  return <Image 
  className={grayscaleMode === "gray" ? "grayscale" : ""}
  src={contact} layout="responsive" alt="betting" />;
};
export default Contact;
