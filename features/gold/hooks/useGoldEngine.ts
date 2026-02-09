
// import { useEffect, useState } from "react";
// import { getMyGoldSipApi, getGoldPriceApi } from "@/services/gold";
// import { getProfileApi } from "@/services/profile";
//  import { getPortfolioApi } from "@/services/portfolio";

// export type Bucket = "instant" | "daily" | "weekly" | "monthly";
// export type Karat = "18K" | "22K" | "24K";

// export const useGoldEngine = () => {

//   const [tab,setTab] = useState<Bucket>("instant");
//   const [karat,setKarat] = useState<Karat>("24K");

//   const [engine,setEngine] = useState<any>({
//     pricePerGram:0,
//     walletBalance:0,

//     engines:{
//       instant:{ savedGrams:0 },

//       daily:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null },
//       weekly:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null },
//       monthly:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null }
//     }
//   });

//   /* ================= LOAD ENGINE ================= */

//   const loadEngine = async ()=>{
//     try{

//       /* ===== PRICE ===== */
//       const priceRes = await getGoldPriceApi();
//       console.log("GOLD PRICE 👉",priceRes);

//       /* ===== MY SIP ===== */
//       const sipRes = await getMyGoldSipApi();
//       console.log("MY GOLD SIP 👉",JSON.stringify(sipRes));

//       /* ================= PRICE SET ================= */

//       const pricePerGram =
//         priceRes?.data?.price_per_gram_24K ||
//         priceRes?.data?.market_sell_price_24K ||
//         0;

//       /* ================= SIP DATA ================= */

//       const sipData = sipRes?.data || {};

//       const dailyArr = sipData?.daily || [];
//       const weeklyArr = sipData?.weekly || [];
//       const monthlyArr = sipData?.monthly || [];

//       /* ===== FILTER BY CARET ===== */

//       /* ===== PROFILE WALLET ===== */
// const profileRes = await getProfileApi();
// console.log("PROFILE 👉",profileRes);

// const wallet = profileRes?.data?.wallet;

// /* ===== PORTFOLIO ===== */
// const portfolioRes = await getPortfolioApi();
// console.log("PORTFOLIO 👉",portfolioRes);

// const portfolio = portfolioRes || {};

//       // const dailySip = dailyArr.find((s:any)=>s.caret===karat);
//       // const weeklySip = weeklyArr.find((s:any)=>s.caret===karat);
//       // const monthlySip = monthlyArr.find((s:any)=>s.caret===karat);


//       /* ===== PICK LATEST ACTIVE SIP PER CARET ===== */

// const getLatestSip = (arr:any[])=>{
//   if(!arr?.length) return null;

//   const filtered = arr.filter((s:any)=>s.caret===karat);
//   if(!filtered.length) return null;

//   // ACTIVE sip first
//   const active = filtered.find((s:any)=>s.status==="ACTIVE");
//   if(active) return active;

//   // warna latest sip
//   return filtered[filtered.length-1];
// };

// const dailySip = getLatestSip(dailyArr);
// const weeklySip = getLatestSip(weeklyArr);
// const monthlySip = getLatestSip(monthlyArr);

//       /* ================= SET ENGINE ================= */

//       setEngine((prev:any)=>({
//         ...prev,
//         pricePerGram,

//         engines:{
//           instant:{ ...prev.engines.instant },

//           daily:{
//             ...prev.engines.daily,
//             isActive: !!dailySip && dailySip.status!=="STOPPED",
//             isPaused: dailySip?.status==="PAUSED",
//             amount: dailySip?.amount_per_cycle || 0,
//             savedGrams: dailySip?.gold_grams || 0,
//             data: dailySip || null
//           },

//           weekly:{
//             ...prev.engines.weekly,
//             isActive: !!weeklySip && weeklySip.status!=="STOPPED",
//             isPaused: weeklySip?.status==="PAUSED",
//             amount: weeklySip?.amount_per_cycle || 0,
//             savedGrams: weeklySip?.gold_grams || 0,
//             data: weeklySip || null
//           },

//           monthly:{
//             ...prev.engines.monthly,
//             isActive: !!monthlySip && monthlySip.status!=="STOPPED",
//             isPaused: monthlySip?.status==="PAUSED",
//             amount: monthlySip?.amount_per_cycle || 0,
//             savedGrams: monthlySip?.gold_grams || 0,
//             data: monthlySip || null
//           }
//         }
//       }));

//     }catch(e){
//       console.log("GOLD LOAD ERROR",e);
//     }
//   };

//   /* ===== AUTO LOAD ===== */
//   useEffect(()=>{
//     loadEngine();
//   },[karat]);

//   return{
//     tab,setTab,
//     karat,setKarat,
//     engine,setEngine,
//     loadEngine
//   };
// };


import { useEffect, useState } from "react";
import { getMyGoldSipApi, getGoldPriceApi } from "@/services/gold";
import { getProfileApi } from "@/services/profile";
import { getPortfolioApi } from "@/services/portfolio";

export type Bucket = "instant" | "daily" | "weekly" | "monthly";
export type Karat = "18K" | "22K" | "24K";

export const useGoldEngine = () => {

  const [tab,setTab] = useState<Bucket>("instant");
  const [karat,setKarat] = useState<Karat>("24K");

  const [engine,setEngine] = useState<any>({
    pricePerGram:0,
    walletBalance:0,
    totalGoldGrams:0,
    totalGoldValue:0,

    engines:{
      instant:{ savedGrams:0 },

      daily:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null },
      weekly:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null },
      monthly:{ isActive:false, isPaused:false, amount:0, savedGrams:0, data:null }
    }
  });

  /* ================= LOAD ENGINE ================= */

  const loadEngine = async ()=>{
    try{

      /* ===== GOLD PRICE ===== */
      const priceRes = await getGoldPriceApi();
      console.log("GOLD PRICE 👉",priceRes);

      const pricePerGram =
        priceRes?.data?.price_per_gram_24K ||
        priceRes?.data?.market_sell_price_24K ||
        0;

      /* ===== SIP ===== */
      const sipRes = await getMyGoldSipApi();
      console.log("MY GOLD SIP 👉",JSON.stringify(sipRes));

      const sipData = sipRes?.data || {};
      const dailyArr = sipData?.daily || [];
      const weeklyArr = sipData?.weekly || [];
      const monthlyArr = sipData?.monthly || [];

      /* ===== PROFILE WALLET ===== */
      const profileRes = await getProfileApi();
      console.log("PROFILE 👉",profileRes);

      const wallet = profileRes?.data?.wallet;

      /* ===== PORTFOLIO ===== */
     const portfolioRes = await getPortfolioApi();
console.log("PORTFOLIO 👉",portfolioRes);

const portfolio = portfolioRes || {};



      /* ===== TOTAL GOLD ===== */
const totalGoldGrams =
  Number(portfolio?.gold_24K?.grams || 0) +
  Number(portfolio?.gold_22K?.grams || 0) +
  Number(portfolio?.gold_18K?.grams || 0);

const totalGoldValue =
  Number(portfolio?.gold_24K?.current_value || 0) +
  Number(portfolio?.gold_22K?.current_value || 0) +
  Number(portfolio?.gold_18K?.current_value || 0);


      /* ===== SIP PICK FUNCTION ===== */
      const getLatestSip = (arr:any[])=>{
        if(!arr?.length) return null;

        const filtered = arr.filter((s:any)=>s.caret===karat);
        if(!filtered.length) return null;

        const active = filtered.find((s:any)=>s.status==="ACTIVE");
        if(active) return active;

        return filtered[filtered.length-1];
      };

      const dailySip = getLatestSip(dailyArr);
      const weeklySip = getLatestSip(weeklyArr);
      const monthlySip = getLatestSip(monthlyArr);

      /* ===== SET ENGINE ===== */

      setEngine((prev:any)=>({
        ...prev,
        pricePerGram,

        walletBalance:Number(wallet?.deposit_balance || 0),
        totalGoldGrams,
        totalGoldValue,

        engines:{
          instant:{
            ...prev.engines.instant,
            savedGrams:totalGoldGrams
          },

          daily:{
            ...prev.engines.daily,
            isActive: !!dailySip && dailySip.status!=="STOPPED",
            isPaused: dailySip?.status==="PAUSED",
            amount: dailySip?.amount_per_cycle || 0,
            savedGrams: dailySip?.total_grams || 0,
            data: dailySip || null
          },

          weekly:{
            ...prev.engines.weekly,
            isActive: !!weeklySip && weeklySip.status!=="STOPPED",
            isPaused: weeklySip?.status==="PAUSED",
            amount: weeklySip?.amount_per_cycle || 0,
            savedGrams: weeklySip?.total_grams || 0,
            data: weeklySip || null
          },

          monthly:{
            ...prev.engines.monthly,
            isActive: !!monthlySip && monthlySip.status!=="STOPPED",
            isPaused: monthlySip?.status==="PAUSED",
            amount: monthlySip?.amount_per_cycle || 0,
            savedGrams: monthlySip?.total_grams || 0,
            data: monthlySip || null
          }
        }
      }));

    }catch(e){
      console.log("GOLD LOAD ERROR",e);
    }
  };

  useEffect(()=>{
    loadEngine();
  },[karat]);

  return{
    tab,setTab,
    karat,setKarat,
    engine,setEngine,
    loadEngine
  };
};
