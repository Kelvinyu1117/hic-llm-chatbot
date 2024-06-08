import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [responseData, setResponseData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:5000/api/threads', { method: "post", body: formData });
        const data = await response.json()
        console.log(data);
        setResponseData(data);
    } catch (error) {
        console.log('There was an error', error);
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
        <label>Ask Your AI:<br />
        {responseData && (
          <div>
            {responseData.content} | {responseData.timestamp}
          </div>
        )}
        <textarea name="postContent" rows={4} cols={80} />
        </label>
        <br />
        <button type="submit">Send</button>
    </form>
  )
}

export default App
