import axios from "axios";

const apiKey = process.env["OPENAI_API_KEY"];

export async function sendRequest(prompt: string): Promise<string> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey ?? ""}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    data,
    { headers }
  );
  // eslint-disable-next-line
  const chatGPTReply = response.data.choices[0].message.content;
  // eslint-disable-next-line
  return chatGPTReply;
}
