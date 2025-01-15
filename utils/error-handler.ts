import { ToastType } from "@/hooks/useToaster";
import axios from "axios";

export async function withErrorHandling<T>(
  callback: () => Promise<T>,
  toaster: (type: ToastType, title: string) => void,
  errorHandler?: (error: unknown) => void
): Promise<T | void> {
  try {
    return await callback();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    }

    if (axios.isAxiosError(error)) {
      toaster("error", error.response?.data.message || "An error occurred");
    } else {
      toaster("error", "An unexpected error occurred");
    }
  }
}
