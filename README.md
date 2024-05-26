# A Health Information Chinese LLM Chatbot
A Health Information Chinese LLM Chatbot in web for HK Elderly aged 65 or above, who has simple Tech Literacy (copy & paste, sharing in social media, a bit typing in Chinese) & Little English Skills, to countering health-related disinformation.

## Feature

### Todo
- [ ] Basic Conversation with Free LLM Model in Chinese

## Setup

The project consists of two independent applications: a web-based client and a server-side application.

### Client
The client is built by React with Vite.

#### Installation

```sh
npm install
```

#### Development

Run the Vite dev server:

```sh
npm run dev
```

### Server
The server is built by Flask. 

To setup the local virtual environment:

#### Conda

```sh
conda create -n <your-env-name> python=3.10
conda activate <your-env-name>
pip install -r server/requirements.txt
```

To launch the server application:
```sh
cd server
flask run
```
