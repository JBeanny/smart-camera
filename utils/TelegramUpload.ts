import axios from "axios";

// Function to send photo to Telegram channel
export const sendPhotoToTelegram = async (photo: any) => {
  try {
    const chatId: string | any = process.env.NEXT_PUBLIC_CHAT_ID;
    const apiUrl: string | any = process.env.NEXT_PUBLIC_TELEGRAM_UPLOAD_URI;

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("chat_id", chatId);

    if (!formData) {
      console.log("form data is null");
      return;
    }

    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle success
    console.log("Photo sent successfully:", response.data);
  } catch (error) {
    // Handle error
    console.error("Failed to send photo:", error);
  }
};
