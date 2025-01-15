import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { isLoading, useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PrimaryFont, SecondaryFont } from "@/constants/Fonts";
import useAuthStore from "@/features/user/store/useAuthStore";
import { HttpStatusCode } from "axios";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { session } = useAuthStore();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    ...SecondaryFont,
    ...PrimaryFont,
  });

  useEffect(() => {
    if (loaded) {
      if (!session.isAuth) {
        router.replace("/login");
      } else {
        router.replace("/(home)");
      }

      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

// index file should be change to login screen
