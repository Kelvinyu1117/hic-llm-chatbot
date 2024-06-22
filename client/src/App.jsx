import { useState, useEffect } from 'react'
import { Flex, Container, Box, Card} from '@radix-ui/themes';
import { Heading, Text, TextField, Button, SegmentedControl, Avatar, ScrollArea, Select, Link } from '@radix-ui/themes';
import { AccessibilityIcon } from '@radix-ui/react-icons'
import { makeServer } from './server'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  // Get threads for first AI msg
  useEffect(() => {
    handleLoad()
  }, []);

  async function handleLoad() {
    try {
        const response = await fetch('/api/threads', { method: "get" });
        const data = await response.json()
        setResponseData(data);
    } catch (error) {
        console.log('There was an error when getting /api/threads', error);
    }
  }

  // Send & Get response for msg from users
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch('/api/threads', { method: "post", body: inputValue }); //inputValue from handleInputChange()
        const data = await response.json()
        setResponseData(data);
    } catch (error) {
        console.log('There was an error when posting /api/threads', error);
    }
    
  }
  return (
    <Container>
        {/* Nav Bar */}
        <Flex gap="3" py="2" m="4" align = "center">
        <Flex m="4" width="70%"> 
          <AccessibilityIcon width="30" height="30"/>
          <Heading>健康長者個人助手</Heading>
        </Flex>
          <SegmentedControl.Root defaultValue="inbox" radius="full">
            <SegmentedControl.Item value="inbox">繁</SegmentedControl.Item>
            <SegmentedControl.Item value="drafts">簡</SegmentedControl.Item>
            <SegmentedControl.Item value="sent">EN</SegmentedControl.Item>
          </SegmentedControl.Root>

          <Select.Root size="2" defaultValue="Bob"> {/* Should get from backend? */}
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Bob">Bob</Select.Item>
              <Select.Item value="Alice">Alice</Select.Item>
            </Select.Content>
          </Select.Root>

        </Flex>
        <Flex m="4" width="100%">

          {/* Left Panel */}
          <Box width="25%">
            <Text as="div" size="3"  weight="bold" color="gray"> 聊天板 </Text>
            <Box gap="20" width="100%" height="70vh">
                <Card size="1">
                  <Flex gap="4" align="center">
                    <Avatar size="4" radius="full" fallback="AI" color="indigo" />
                    <Box>
                      <Text as="div" size="2" weight="bold">
                        助手1
                      </Text>
                      <Text as="div" size="1" color="gray">
                        語氣溫柔
                      </Text>
                    </Box>
                  </Flex>
                </Card>
            </Box>
            <Link href="https://github.com/Kelvinyu1117/hic-llm-chatbot">*GitHub</Link>
          </Box>

          {/* Right Panel */}
          <Flex m="4" width='75%'>
            <Box width="100%">
              
              <ScrollArea type="always" scrollbars="vertical" width="100%" style={{ height: 500 }}>
                  {responseData?.messages.map((message, index) => (
                    <div key={index}>
                      <Text as="div" size="1" color="gray">{message.sender}</Text>,
                      {message.text} | {message.timestamp}
                    </div>
                  ))}
              </ScrollArea>

              <form method="post" onSubmit={handleSubmit}>
                <TextField.Root size="3" placeholder="今天你想問甚麼？" color="green" onChange={handleInputChange} value={inputValue}>
                  <TextField.Slot side="right" px="1">
                    <Button size="2" type="submit">發送</Button>
                  </TextField.Slot>
                </TextField.Root>
              </form>
            </Box>
          </Flex>
        </Flex>
    </Container>
  )
}

export default App
