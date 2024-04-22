import axios from "axios";
import { toast } from "react-toastify";

// Function to send photo to Telegram channel
export const sendPhotoToTelegram = async (
  photo: any,
  setIsLoading: (args: boolean) => void
) => {
  try {
    const chatId: string | any = process.env.NEXT_PUBLIC_CHAT_ID;
    const apiUrl: string | any = process.env.NEXT_PUBLIC_TELEGRAM_UPLOAD_URI;

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("chat_id", chatId);

    if (!formData) {
      return toast.error("Send photo failed");
    }

    setIsLoading(true);
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setIsLoading(false);

    // Handle success
    if (response.status === 200) {
      return;
    }

    return toast.error("Send photo failed");
  } catch (error) {
    // Handle error
    return toast.error("Send photo failed");
  }
};
