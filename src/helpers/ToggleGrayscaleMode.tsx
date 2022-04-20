import useGrayScaleMode from "@hooks/useGrayScaleMode";

const ToggleGrayscaleMode = () => {
  const [state1, setState1] = useGrayScaleMode();
  console.log(state1);
  // setState1(state1 === "" ? "dark" : "");
};

export default ToggleGrayscaleMode;
