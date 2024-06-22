from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json
import logging 
import os
from dotenv import load_dotenv
import requests

# load environmental variable
load_dotenv()
API_KEY = os.getenv("API_KEY")
Secret_KEY = os.getenv("Secret_KEY")

app = Flask(__name__)
allowed_origins = ["http://localhost:3000", "https://localhost:3000"]  
logging.basicConfig(level=logging.DEBUG)
CORS(app, origins=allowed_origins)  

def callLLM(prompt):
    def get_access_token():
 
        url = f"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_KEY}&client_secret={Secret_KEY}"
    
        payload = json.dumps("")
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
        response = requests.request("POST", url, headers=headers, data=payload)

        return response.json().get("access_token")
 
 
    def do_chat(prompt):
        url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat?access_token=" + get_access_token()

        payload = json.dumps({
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 1.0,
            "response_format": "json_object"
        })
        headers = {
            'Content-Type': 'application/json'
        }
    
        response = requests.request("POST", url, headers=headers, data=payload)
        print (response.json())
        print (payload)
        app.logger.info("called") # append a info log, .error for error
        return (response.json())
    return (do_chat(prompt))

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/threads', methods=['GET', 'POST'])
def handle_threads():
    #Displaying 
    if request.method == 'POST':
        question=request.get_json()
        print(question)
        print(type(question))
        anwser=callLLM(question)
        modified_anwser={
            "id": anwser['id'],
            "userPrompt":question,
            "result":anwser['result'],
        }
        return (jsonify(modified_anwser)) 

    # http://localhost:5000/api/threads
    if request.method == 'GET':
        question=request.get_json()
        print(question)
        print(type(question))
        anwser=callLLM(question)
        modified_anwser={
            "id": anwser['id'],
            "userPrompt":question,
            "result":anwser['result'],
        }
        return (jsonify(modified_anwser)) 


if __name__ == '__main__': # if __name__ == '__main__'的意思是：当.py文件被直接运行时，if __name__ == '__main__'之下的代码块将被运行；当.py文件以模块形式被导入时，if __name__ == '__main__'之下的代码块不被运行。
    app.run(debug=True, port=5002) # flask --app app run --debug --port 5002


