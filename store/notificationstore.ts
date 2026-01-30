import { create } from "zustand";
import { getUnreadCountApi } from "@/services/notification";


type NotificationState = {
inboxUnread: number;
txnUnread: number;
loadCounts: () => Promise<void>;
clearInbox: () => void;
clearTxn: () => void;
};


export const useNotificationStore = create<NotificationState>((set) => ({
inboxUnread: 0,
txnUnread: 0,


loadCounts: async () => {
try {
const res = await getUnreadCountApi();
if (res?.success) {
set({
inboxUnread: Number(res.inbox_unread || 0),
txnUnread: Number(res.transaction_unread || 0),
});
}
} catch (e) {
console.log("❌ GLOBAL NOTIFICATION COUNT ERROR:", e);
}
},


clearInbox: () => set({ inboxUnread: 0 }),
clearTxn: () => set({ txnUnread: 0 }),
}));