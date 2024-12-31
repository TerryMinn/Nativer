import { Pressable, View } from "react-native";
import React, { useState } from "react";
import { ToastTitle, useToast, Toast } from "../components/ui/toast";
import { HStack } from "../components/ui/hstack";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  HelpCircleIcon,
  Icon,
} from "../components/ui/icon";
import { VStack } from "../components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type ToastHookType = {
  placement?:
    | "top"
    | "bottom"
    | "top right"
    | "top left"
    | "bottom right"
    | "bottom left";
  duration?: number;
};

export type ToastType = "info" | "success" | "error" | "warning";

const useToaster = (options: ToastHookType = {}) => {
  const { duration = 3000, placement = "top" } = options;
  const toast = useToast();
  const [toastId, setToastId] = useState<string>("");

  const toastRender = (type: ToastType, title: string, id: string) => {
    switch (type) {
      case "info":
        return (
          <>
            <View className="flex flex-row items-center gap-3">
              <Icon as={HelpCircleIcon} color="#17adfc" className=" mt-0.5" />
              <VStack space="xs">
                <ToastTitle
                  style={{ color: "#17adfc" }}
                  className="font-semibold line-clamp-1"
                >
                  {title}
                </ToastTitle>
              </VStack>
            </View>

            <HStack className="min-[450px]:gap-3 gap-1 justify-center items-center">
              <Pressable onPress={() => toast.close(id)}>
                <Icon as={CloseIcon} color="#17adfc" size={"xs"} />
              </Pressable>
            </HStack>
          </>
        );
      case "success":
        return (
          <>
            <View className="flex flex-row items-center gap-3">
              <Icon as={CheckCircleIcon} color="#2DCF63" className=" mt-0.5" />
              <VStack space="xs">
                <ToastTitle
                  style={{ color: "#2DCF63" }}
                  className="font-semibold line-clamp-1"
                >
                  {title}
                </ToastTitle>
              </VStack>
            </View>

            <HStack className="min-[450px]:gap-3 gap-1 justify-center items-center">
              <Pressable onPress={() => toast.close(id)}>
                <Icon as={CloseIcon} color="#2DCF63" size={"xs"} />
              </Pressable>
            </HStack>
          </>
        );
      case "error":
        return (
          <>
            <View className="flex flex-row items-center gap-3">
              <Icon as={CloseCircleIcon} className="stroke-error-500 mt-0.5" />
              <VStack space="xs">
                <ToastTitle className="font-semibold text-error-500 line-clamp-1">
                  {title}
                </ToastTitle>
              </VStack>
            </View>

            <HStack className="min-[450px]:gap-3 gap-1 justify-center items-center">
              <Pressable onPress={() => toast.close(id)}>
                <Icon as={CloseIcon} className="stroke-error-500" size={"xs"} />
              </Pressable>
            </HStack>
          </>
        );
      case "warning":
        return (
          <>
            <View className="flex flex-row items-center gap-3">
              <Icon as={AlertCircleIcon} color="#efa92e" className=" mt-0.5" />
              <VStack space="xs">
                <ToastTitle
                  style={{ color: "#efa92e" }}
                  className="font-semibold line-clamp-1"
                >
                  {title}
                </ToastTitle>
              </VStack>
            </View>

            <HStack className="min-[450px]:gap-3 gap-1 justify-center items-center">
              <Pressable onPress={() => toast.close(id)}>
                <Icon as={CloseIcon} color="#efa92e" size={"xs"} />
              </Pressable>
            </HStack>
          </>
        );
      default:
        return (
          <Icon as={CloseCircleIcon} className="stroke-error-500 mt-0.5" />
        );
    }
  };

  const toaster = (type: ToastType, title: string) => {
    console.log("Hello");
    if (!toast.isActive(toastId)) {
      const newId = Math.random();
      setToastId(newId.toString());
      toast.show({
        id: newId.toString(),
        duration,
        placement,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;

          return (
            <Toast
              action={type}
              variant="outline"
              nativeID={uniqueToastId}
              className=" gap-6  w-full shadow max-w-[443px] flex-row justify-between rounded-full"
            >
              {toastRender(type, title, id)}
            </Toast>
          );
        },
      });
    }
  };

  return { toaster };
};

export default useToaster;
