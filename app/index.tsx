import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // TODO: replace with real auth later

  if (!isLoggedIn) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
