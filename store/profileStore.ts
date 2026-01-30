// import { create } from "zustand";

// type Profile = {
//   username: string;
//   email: string;
//   phone: string;
//   profile_photo: string | null;
// };

// type ProfileState = {
//   profile: Profile | null;
  
//   setProfile: (p: Profile) => void;
//   clearProfile: () => void;
// };

// export const useProfileStore = create<ProfileState>((set) => ({
//   profile: null,
//   setProfile: (p) => set({ profile: p }),
//   clearProfile: () => set({ profile: null }),
// }));








// import { create } from "zustand";

// /* ========= TYPES ========= */

// type Profile = {
//   username: string;
//   email: string;
//   phone: string | null;
//   profile_photo: string | null;
// };

// type Referral = {
//   referral_code: string;
//   referral_url: string;
// };

// type ProfileState = {
//   profile: Profile | null;
//   referral: Referral | null;                 // ✅ NEW

//   setProfile: (p: Profile) => void;
//   setReferral: (r: Referral) => void;        // ✅ NEW
//   clearProfile: () => void;
// };

// /* ========= STORE ========= */

// export const useProfileStore = create<ProfileState>((set) => ({
//   profile: null,
//   referral: null,                            // ✅ NEW

//   setProfile: (p) => set({ profile: p }),
//   setReferral: (r) => set({ referral: r }),  // ✅ NEW

//   clearProfile: () => set({ profile: null, referral: null }),
// }));



import { create } from "zustand";

/* ========= TYPES ========= */

type Profile = {
  username: string;
  email: string;
  phone: string | null;
  profile_photo: string | null;
};

type Referral = {
  referral_code: string;
  referral_url: string;
};

type Wallet = {
  wallet_id: number;
  deposit_balance: string;
  withdraw_balance: string;
  locked_balance: string;
  total_money_balance: string;

  instant_gold_grams: string;
  daily_gold_grams: string;
  weekly_gold_grams: string;
  monthly_gold_grams: string;
  total_gold_grams: string;
};

/* ========= STATE ========= */

type ProfileState = {
  profile: Profile | null;
  referral: Referral | null;
  wallet: Wallet | null;                 // ✅ NEW

  setProfile: (p: Profile) => void;
  setReferral: (r: Referral) => void;
  setWallet: (w: Wallet) => void;        // ✅ NEW
  clearProfile: () => void;
};

/* ========= STORE ========= */

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  referral: null,
  wallet: null,                          // ✅ NEW

  setProfile: (p) => set({ profile: p }),
  setReferral: (r) => set({ referral: r }),
  setWallet: (w) => set({ wallet: w }),  // ✅ NEW

  clearProfile: () =>
    set({
      profile: null,
      referral: null,
      wallet: null,                      // ✅ NEW
    }),
}));
