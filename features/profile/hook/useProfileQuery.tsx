import useAuthStore from "@/features/user/store/useAuthStore";
import { IProfile } from "@/features/user/types/user.type";
import api_client from "@/service/api-service";
import { HttpStatusCode, isAxiosError } from "axios";
import { useEffect } from "react";
import useSWR from "swr";

export const useProfileQuery = () => {
  const { logout } = useAuthStore();
  const { isLoading, data, error } = useSWR<IProfile>(
    "/user/profile",
    api_client
  );

  useEffect(() => {
    if (isAxiosError(error) && !isLoading) {
      if (error.response?.data.statusCode === HttpStatusCode.Unauthorized) {
        logout();
      }
    }
  }, [error, isLoading]);

  console.log(data, error, isLoading, "in profile query");

  return {
    isLoading,
    data,
    error,
  };
};
