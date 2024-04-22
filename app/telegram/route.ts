import { NextRequest } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";

const token: string | any = process.env.NEXT_PUBLIC_BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: false,
});

export async function POST(req: NextRequest, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = await req.formData();
    const chatId: string | any = data.get("chat_id");
    const file: Blob | any = data.get("file");

    if (!file || !chatId) {
      const response = {
        status: 400,
        message: "Insufficient request parameters.",
      };

      return new Response(JSON.stringify(response));
    }

    // Create the directory if it doesn't exist
    // const uploadDir = "./public";

    // Read file contents as a Buffer
    // const fileBuffer = await file.arrayBuffer();
    // // Save the file to the server
    // const filePath = `${__dirname}/../${file.name}`;
    // console.log("dirname: ", filePath);
    // fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Create the directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Read file contents as a Buffer
    const fileBuffer = await file.arrayBuffer();
    // Save the file to the server
    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    return bot
      .sendPhoto(chatId, filePath)
      .then(() => {
        // File upload successful
        const response = {
          status: 200,
          message: "File upload successful",
        };
        return new Response(JSON.stringify(response));
      })
      .catch((error) => {
        // Error uploading file to Telegram
        console.error("Error uploading file to Telegram:", error);

        const response = {
          status: 500,
          message: "Error uploading file to Telegram",
        };

        return new Response(JSON.stringify(response));
      });
  } catch (err) {
    console.log("error: ", err);

    const response = {
      status: 500,
      message: "Internal Server Error",
    };

    return new Response(JSON.stringify(response));
  }
}
