import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [responseData, setResponseData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch('http://localhost:5000/api/threads', { method: "post", body: formData })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResponseData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
