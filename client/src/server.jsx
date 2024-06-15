import { createServer } from "miragejs";

export default function makeServer() {
  createServer({
    routes() {
      this.namespace = "/api";

      this.post("/threads", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 100);

        return concole.log("hello");
      });
    },
  });
}
