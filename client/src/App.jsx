import { useState } from 'react'
import { AccessibilityIcon } from '@radix-ui/react-icons'
import { Box, Heading, Flex, Text, Button } from '@radix-ui/themes';

function App() {
  const [responseData, setResponseData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/api/threads', { method: "post", body: formData });
        const data = await response.json()
        console.log(data);
        setResponseData(data);
    } catch (error) {
        console.log('There was an error', error);
    }
    
  }
  return (
    <Flex gap="3">
        <Flex gap="3" py="2" m="4" align = "center">
          <AccessibilityIcon width="30" height="30"/>
          <Heading>HIC LLM Chatbot</Heading>
        </Flex>
    </Flex>
    
  )
}

export default App
