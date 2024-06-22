// https://daily.dev/blog/introduction-to-mirage-js-mocking-apis
import { createServer } from "miragejs";

export default function makeServer() {
  createServer({
    routes() {
      // use the routes() hook to set the API routes we want to mock
      this.namespace = "/api"; // Set the base namespace used for all routes defined with get, post, put or del.

      this.post("/threads", () => {
        //schema, request
        // callback function. This function returns data that will be returned when the API endpoint is called.
        //let attrs = JSON.parse(request.requestBody);  //request.requestBody holds the body of a POST request.
        //attrs.id = Math.floor(Math.random() * 100);
        return JSON.stringify({
          //returns an object
          status: true,
          msg: "New post successfully published.",
        });
        //concole.log("hello");
      });
    },
  });
}
