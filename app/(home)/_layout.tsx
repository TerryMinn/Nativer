import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useAuthStore from "@/features/user/store/useAuthStore";

type HomeLayoutProps = {};

const HomeLayout = ({}: HomeLayoutProps) => {
  const { session } = useAuthStore();

  useEffect(() => {
    if (!session.isAuth) {
      router.replace("/login");
    }
  }, [session]);

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
