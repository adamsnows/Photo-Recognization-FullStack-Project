import api from "@/lib/api";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function uploadPhoto({ data, image }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify(data));

  try {
    const response = await api.post("/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Erro ao enviar imagem";
    throw new Error(message);
  }
}
