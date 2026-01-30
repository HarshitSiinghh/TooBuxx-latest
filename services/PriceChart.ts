// import { BASE_URL } from "@/constants/api";

// export const getGoldPriceChart = async (
//   range: "1W" | "1M" | "6M" | "1Y" | "3Y" | "5Y"
// ) => {
//   const res = await fetch(`${BASE_URL}/gold/chart?range=${range}`, {
//     method: "GET",
//     credentials: "include",
//   });

//   const json = await res.json();
//   return json.data;
// };



 import { BASE_URL } from "@/constants/api";
// import { BASE_URL } from "@/constants/config";


export const getGoldPriceChartApi = async (range: string) => {
try {
const url = `${BASE_URL}/gold/price-chart?range=${range}`;
console.log("CHART URL 👉", url);


const res = await fetch(url, {
method: "GET",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
});


if (!res.ok) {
const text = await res.text();
console.log("❌ CHART RAW RESPONSE 👉", text);
throw new Error(`HTTP ${res.status}`);
}


const data = await res.json();
return data;


} catch (err: any) {
console.log("❌ Chart error:", err.message);
throw err;
}
};