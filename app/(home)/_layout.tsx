import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useAuthStore from "@/features/user/store/useAuthStore";
import useSWR from "swr";
import api_client from "@/service/api-service";
import { ActivityIndicator } from "react-native";
import useToaster from "@/hooks/useToaster";
import axios from "axios";

type HomeLayoutProps = {};

const HomeLayout = ({}: HomeLayoutProps) => {
  const { setSession, session } = useAuthStore();
  const { toaster } = useToaster();
  const PROFILE_DATA = useSWR("/user/profile", api_client, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    refreshInterval: 0,
  });

  useEffect(() => {
    if (!session.isAuth) {
      router.replace("/login");
    }
  }, [session, PROFILE_DATA.data]);

  // useEffect(() => {
  //   console.log(PROFILE_DATA);

  //   if (!PROFILE_DATA.isLoading && PROFILE_DATA.error) {
  //     setSession({
  //       isAuth: false,
  //       token: undefined,
  //       profile: {
  //         picture: undefined,
  //         username: undefined,
  //         email: undefined,
  //       },
  //     });
  //     console.log(PROFILE_DATA.error);
  //     router.replace("/login");
  //   }
  // }, [PROFILE_DATA]); // Run this effect only when PROFILE_DATA.error changes

  // Show loading indicator while data is being fetched
  if (PROFILE_DATA.isLoading) {
    return <ActivityIndicator size="large" />;
  }

  console.log(PROFILE_DATA.data);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          paddingTop: 10,
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
