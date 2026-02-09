import { BASE_URL } from "@/constants/api";

/* BUY */
export const buySilverApi = async (amount:number) => {
  const res = await fetch(`${BASE_URL}/metals/silver/instant-buy`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body: JSON.stringify({
      amount,
      purity:"999"
    })
  });

  return res.json();
};

/* CREATE SIP */
// export const createSilverSipApi = async (amount:number) => {
//   const res = await fetch(`${BASE_URL}/metals/silver/sip/create`,{
//     method:"POST",
//     headers:{ "Content-Type":"application/json"},
//     credentials:"include",
//     body: JSON.stringify({
//       sip_type:"DAILY",
//       amount_per_cycle:amount,
//       purity:"999"
//     })
//   });

//   return res.json();
// };

/* CREATE SIP */
export const createSilverSipApi = async (data:{
  amount_per_cycle:number;
  sip_type:"DAILY"|"WEEKLY"|"MONTHLY";
}) => {

  console.log("📡 SIP CREATE BODY 👉", data);

  const res = await fetch(`${BASE_URL}/metals/silver/sip/create`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body: JSON.stringify({
      sip_type: data.sip_type,        // 🔥 dynamic now
      amount_per_cycle: data.amount_per_cycle,
      purity:"999"
    })
  });

  return res.json();
};


/* MY SIP */
export const getMySilverSipApi = async () => {
  const res = await fetch(`${BASE_URL}/metals/silver/sip/my`,{
    method:"GET",
    credentials:"include"
  });

  return res.json();
};

/* PAUSE */
export const pauseSilverSipApi = async (sip_id:number) => {
  const res = await fetch(`${BASE_URL}/metals/silver/sip/pause`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body: JSON.stringify({sip_id})
  });

  return res.json();
};

/* RESUME */
export const resumeSilverSipApi = async (sip_id:number) => {
  const res = await fetch(`${BASE_URL}/metals/silver/sip/resume`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body: JSON.stringify({sip_id})
  });

  return res.json();
};

/* STOP */
export const stopSilverSipApi = async (sip_id:number) => {
  const res = await fetch(`${BASE_URL}/metals/silver/sip/stop`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    credentials:"include",
    body: JSON.stringify({
      sip_id,
      requested_method:"UPI"
    })
  });

  return res.json();
};
