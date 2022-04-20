import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GrayScaleMode {
  value: string;
}

const initialState: GrayScaleMode = {
  value: "color",
};

const grayScaleMode = createSlice({
  name: "grayScaleMode",
  initialState,
  reducers: {
    setGrayScaleMode: (state: GrayScaleMode, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setGrayScaleMode } = grayScaleMode.actions;
export default grayScaleMode.reducer;
