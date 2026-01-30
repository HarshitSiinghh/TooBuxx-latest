import { create } from "zustand";

type Wallet = {
  wallet_id: string;
  wallet_address: string;
  total_gold: number;
  total_money: number;
  reward_points: number;
  total_deposit: number;
  total_withdrawal: number;
  status: string;
};

type WalletState = {
  wallet: Wallet | null;
  setWallet: (w: Wallet) => void;
  clearWallet: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  setWallet: (w) => set({ wallet: w }),
  clearWallet: () => set({ wallet: null }),
}));
