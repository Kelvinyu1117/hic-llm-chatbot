import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  async function getUser() {
    try {
      const response = await axios.get("http://127.0.0.1:5001/GET");
      console.log(JSON.stringify(response));
      document.getElementById("post").innerHTML = JSON.stringify(
        response.data["message"]
      );
    } catch (error) {
      console.error(error);
    }
  }

  function myFunction() {
    let question = prompt("Please enter your question");

    axios
      .post("http://127.0.0.1:5001/POST", {
        question: question,
      })
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });

    getUser();
  }

  return (
    <>
      <div className="card">
        {/*<button onClick={getUser}>Try GET</button>*/}
        <button onClick={myFunction}>Click Me</button>
        <p id="post"></p>
      </div>
    </>
  );
}
export default App;
