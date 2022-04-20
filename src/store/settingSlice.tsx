import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BigNumberish } from "@ethersproject/bignumber";

// Define a type for the slice state
interface settingState {
  showZeroTokens: boolean;
  selectedWallet: string;
}
// Define the initial state using that type
const initialState: settingState = {
  showZeroTokens: false,
  selectedWallet: "",
} as settingState;

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<settingState>) => {
      state = action.payload;
    },
    setShowZeroTokens: (state, action: PayloadAction<boolean>) => {
      state.showZeroTokens = action.payload;
    },
    setSelectedWallet: (state, action: PayloadAction<string>) => {
      state.selectedWallet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowZeroTokens, setSelectedWallet, setSetting } =
  settingSlice.actions;
export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
