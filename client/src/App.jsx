import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  async function getUser() {
    try {
      const response = await axios.get("http://127.0.0.1:5001/");
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  }

  async function Userpost(user_input) {
    try {
      const response = await axios.post("http://127.0.0.1:5001/user_question", {
        question: user_input,
      });
      console.log(JSON.stringify(response));
      document.getElementById("output").innerHTML = JSON.stringify(
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  }

  function chatBox() {
    let question = prompt("Please enter your question");
    Userpost(question);
    getUser();
  }

  return (
    <>
      <div className="card">
        {/*<button onClick={getUser}>Try GET</button>*/}
        <button onClick={chatBox}>Click Me</button>
        <p id="output"></p>
      </div>
    </>
  );
}
export default App;
