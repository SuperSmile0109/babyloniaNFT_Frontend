import { useEffect, useState } from "react";
// import { grayscale } from "@store/grayscaleStore";
import { useAppSelector, useAppDispatch } from "@hooks";
import { setGrayScaleMode } from "@store/grayscaleSlice";
declare const window: any;

const getSavedState = (initialState: any = "") => {
  if (typeof window !== "undefined") {
    let GrayScaleMode: string = localStorage.getItem("GrayScaleMode") + "";
    const savedState = GrayScaleMode;
    if (savedState) return savedState;
  }
  if (initialState) return initialState;
  else "";
};
export default function useGrayScaleMode(initialState: any = "color") {
  const dispatch = useAppDispatch();
  const grayscaleMode = useAppSelector(
    (state: any) => state.grayscale.grayscaleMode
  );
  if (typeof initialState !== "string") initialState = "color";
  const [value, setValue] = useState(getSavedState(initialState));

  useEffect(() => {
    dispatch(setGrayScaleMode(value));
    localStorage.setItem("GrayScaleMode", value + "");
  }, [value, dispatch]);
  return [value, setValue];
}
