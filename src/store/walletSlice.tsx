import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_WALLET_ADDRESS } from "../constants/ActionTypes";
import { BigNumberish } from "@ethersproject/bignumber";

// Define a type for the slice state
interface walletState {
  walletAddress: string;
  balance: BigNumberish;
  network: string;
  LastSelectedChainId: number;
}
// Define the initial state using that type
const initialState: walletState = {
  walletAddress: "",
  balance: 0.0,
  network: "",
  LastSelectedChainId: 0,
} as walletState;

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setBalance: (state, action: PayloadAction<BigNumberish>) => {
      state.balance = action.payload;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.LastSelectedChainId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWalletAddress, setBalance } = walletSlice.actions;
export const walletActions = walletSlice.actions;
export default walletSlice.reducer;
