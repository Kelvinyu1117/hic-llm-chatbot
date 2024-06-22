import { createServer, Model, hasMany, belongsTo } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  function genAI(text){
    return "AI Waiting To answer" + text;
  }

  let server = createServer({
    environment,

    models: {
      user: Model.extend({
        threads: hasMany()
      }),
      thread: Model.extend({
        user: belongsTo()
      }),
    },

    seeds(server) {
      const bob = server.create("user", { name: "Bob" })
      const alice = server.create("user", { name: "Alice" })

      server.create("threads", { 
        id: 1,
        name: "Health Bot",
        user: bob,
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
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all();
      })

      this.get("/threads", (schema) => {
        // return schema.threads.all();
        return { 
          id: 1,
          name: "Health Bot",
          user: "bob",
          messages: [
            {
              id: 1,
              text: "你好，你今年幾歲？有甚麼健康諮詢？",
              sender: "ai",
              timestamp: "2023-06-18T10:30:00Z"
            },
          ]
        }
      })

      let newID = 4; 

      this.post("/threads", (schema, request) => {
        // let text = JSON.parse(request.requestBody) 
        // id = newID++;

        // let newMessage = db.threads.messages.insert({
        //     id: newID++,
        //     text: genAI(text),
        //     sender: "ai",
        //     timestamp: "2023-06-18T10:30:15Z"
        //   });

        //   newMessage;
        
        // return threads.save();

        return { 
          id: 1,
          name: "Health Bot",
          user: "bob",
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
        }

      })
    }
  })

  return server
}