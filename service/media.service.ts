import api_client from "./api-service";

export const uploadPhotos = async (formData: FormData) =>
  await api_client.post("/media/upload/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
