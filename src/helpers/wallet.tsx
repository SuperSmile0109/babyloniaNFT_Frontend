import { useAppSelector, useAppDispatch } from "../hooks";
import {
  setWalletAddress,
  setBalance,
  walletActions,
} from "../store/walletSlice";
// TODO : must be deleted
const wallet = {
  state: useAppSelector,
  Dispatch: useAppDispatch,

  setWalletAddress,
  setBalance,
  walletActions,
};
export default wallet;
