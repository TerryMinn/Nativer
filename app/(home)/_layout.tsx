import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useSWR from "swr";
import api_client from "@/service/api-service";
import { IProfile } from "@/features/user/types/user.type";
import Loading from "@/components/loading";
import useAuthStore from "@/features/user/store/useAuthStore";
type HomeLayoutProps = {};

const HomeLayout = ({}: HomeLayoutProps) => {
  const { setSession, session, logout } = useAuthStore();
  const { data, isLoading, error } = useSWR<IProfile>(
    "/user/profile",
    api_client
  );
  const user_data = data?.data;

  useEffect(() => {
    setSession({
      ...session,
      profile: {
        username: user_data?.data?.name,
        picture: user_data?.data?.profile?.picture,
        gender: user_data?.data?.profile?.gender,
        date_of_birth: user_data?.data?.profile?.date_of_birth,
      },
    });
  }, [data]);

  if (error) {
    logout();
    router.replace("/login");
  }

  if (isLoading) {
    return <Loading />;
  }

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
          height: 75,
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
