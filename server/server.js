import { createServer } from "miragejs"

export default function () {
  createServer({
    routes() {
      this.get("/thread", () => ({
        data: [],
      }))
    },
  })
}
 
  