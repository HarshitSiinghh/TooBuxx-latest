import { BASE_URL } from "@/constants/api";

/* ================= TYPES ================= */

export interface NotificationSettingsAPI {
  push_enabled: number;
  email_enabled: number;
  gold_enabled: number;
  reward_enabled: number;
  transaction_enabled: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
  type?: string;
}

/* ================= SETTINGS ================= */

export const getNotificationSettingsApi = async () => {
  const res = await fetch(`${BASE_URL}/notifications/settings`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data; // ✅ same as web: res.data.data
};

export const updateNotificationSettingsApi = async (
  payload: NotificationSettingsAPI
) => {
  const res = await fetch(`${BASE_URL}/notifications/settings`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
};

/* ================= NOTIFICATIONS ================= */

export const getInboxNotificationsApi = async (): Promise<NotificationItem[]> => {
  const res = await fetch(`${BASE_URL}/notifications/inbox`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
};

export const getTransactionNotificationsApi = async (): Promise<
  NotificationItem[]
> => {
  const res = await fetch(`${BASE_URL}/notifications/transactions`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
};

/* ================= MAPPERS ================= */

export const apiToUI = (apiData: NotificationSettingsAPI) => ({
  marketing: Boolean(apiData.push_enabled),
  emailNotifications: Boolean(apiData.email_enabled),
  priceAlerts: Boolean(apiData.gold_enabled),
  rewards: Boolean(apiData.reward_enabled),
  transactions: Boolean(apiData.transaction_enabled),
});

export const uiToAPI = (uiData: any): NotificationSettingsAPI => ({
  push_enabled: uiData.marketing ? 1 : 0,
  email_enabled: uiData.emailNotifications ? 1 : 0,
  gold_enabled: uiData.priceAlerts ? 1 : 0,
  reward_enabled: uiData.rewards ? 1 : 0,
  transaction_enabled: uiData.transactions ? 1 : 0,
});

/* ================= EXTRA ================= */

export const getUnreadCountApi = async () => {
  const res = await fetch(`${BASE_URL}/notifications/unread-count`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json(); // { total_unread: number }
};

export const markInboxReadApi = async () => {
  const res = await fetch(
    `${BASE_URL}/notifications/inbox/mark-all-read`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return await res.json();
};

export const markTransactionsReadApi = async () => {
  const res = await fetch(
    `${BASE_URL}/notifications/transactions/mark-all-read`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return await res.json();
};
