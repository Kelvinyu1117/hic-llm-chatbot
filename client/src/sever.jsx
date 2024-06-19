import { createServer } from "miragejs";

let threads = [
    {
      id: 1,
      name: "Health Bot",
      messages: [
        {
          id: 1,
          text: "你好，你今年幾歲？有甚麼健康諮詢？",
          sender: "ai",
          timestamp: "2023-06-18T10:30:00Z"
        },
        {
          id: 2,
          text: "64",
          sender: "user",
          timestamp: "2023-06-18T10:30:15Z"
        },
        {
          id: 3,
          text: "有甚麼健康諮詢？",
          sender: "ai",
          timestamp: "2023-06-18T10:31:00Z"
        }
      ]
    },
    {
      id: 2,
      name: "About HIC LLM",
      messages: [
        {
          id: 1,
          text: "I'm having trouble with the login process. Can someone help?",
          sender: "user",
          timestamp: "2023-06-18T11:45:00Z"
        },
        {
          id: 2,
          text: "Sure, let me take a look. Can you provide more details?",
          sender: "ai",
          timestamp: "2023-06-18T11:45:20Z"
        },
        {
          id: 3,
          text: "Okay, I think I've found the issue. Try clearing your cache and cookies.",
          sender: "user",
          timestamp: "2023-06-18T11:46:10Z"
        }
      ]
    }
  ];

export default function makeServer() {
  createServer({
    routes() {
      this.namespace = "/api";

      this.post("/threads", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 100);

        return {thread : attrs};
      });

      this.get("/threads", () => {
        return {threads};
      });
    },
  });
}