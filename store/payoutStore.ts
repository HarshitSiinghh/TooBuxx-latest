import { create } from "zustand";
import { getPayoutApi, updatePayoutApi, PayoutDetails } from "@/services/payout";

type Bank = {
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
};

type Upi = {
  upi_id: string;
};

type PayoutStore = {
  bank: Bank | null;
  upi: Upi | null;
  loading: boolean;

  fetchPayout: () => Promise<void>;
  updatePayout: (data: PayoutDetails) => Promise<any>;
};

export const usePayoutStore = create<PayoutStore>((set) => ({
  bank: null,
  upi: null,
  loading: false,

  fetchPayout: async () => {
    try {
      set({ loading: true });
      const res = await getPayoutApi();

      if (res.success) {
        set({
          bank: res.data.bank,
          upi: res.data.upi,
        });
      }
    } catch (e) {
      console.log("❌ fetchPayout error:", e);
    } finally {
      set({ loading: false });
    }
  },

  updatePayout: async (data) => {
    try {
      set({ loading: true });

      const res = await updatePayoutApi(data);

      if (res.success) {
        const fresh = await getPayoutApi();
        if (fresh.success) {
          set({
            bank: fresh.data.bank,
            upi: fresh.data.upi,
          });
        }
      }

      return res;
    } catch (e) {
      console.log("❌ updatePayout error:", e);
      throw e;
    } finally {
      set({ loading: false });
    }
  },
}));
