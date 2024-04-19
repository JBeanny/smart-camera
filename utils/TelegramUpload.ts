import axios from "axios";

// Function to send photo to Telegram channel
export const sendPhotoToTelegram = async (photo: any) => {
  const chatId: string | any = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("chat_id", chatId);

  const apiUrl: string | any = process.env.NEXT_PUBLIC_TELEGRAM_API;

  axios
    .post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // Handle success
      console.log("Photo sent successfully:", response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Failed to send photo:", error);
    });
};
