from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json
import logging 
import os
from dotenv import load_dotenv
import requests
from supabase import create_client, Client
from datetime import datetime
import uuid

# load environmental variable
load_dotenv()
API_KEY: str = os.getenv("API_KEY")
Secret_KEY: str = os.getenv("Secret_KEY")
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)



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
        prompt = prompt+"請將以上內容轉換成繁體字, 然後以繁體回答"

        print(prompt)
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
        #question=json.loads(request.get_json())
        question=request.get_json()
        app.logger.info("print api call content")
        print(question["topic_id"])
        print(question["user"])   # user: bob
        print(question["name"])   #name: "Health Bot",
        print(question["question"])
        print(question)
        print(type(question)) # <class 'dict'>
        userdata=supabase.table("ChatHistory").insert({"topic_id":question["topic_id"],"user":question["user"], "name":question["name"],"message_id":str(uuid.uuid4()),"text":question["question"],"sender":"user", "timestamp": str(datetime.now())}).execute()
        #print (data)

        anwser=callLLM(question["question"])
        result=anwser['result']
        print(result)
        print(type(anwser["result"])) #<class 'str'>
        aidata=supabase.table("ChatHistory").insert({"topic_id":question["topic_id"],"user":question["user"], "name":question["name"],"message_id":str(uuid.uuid4()),"text":result,"sender":"ai", "timestamp": str(datetime.now())}).execute()
        
        chatHistory = supabase.table("ChatHistory").select("*").eq("topic_id", question["topic_id"]).execute()   # select columno, eq row
        app.logger.info("print caht history") 
        print (chatHistory)
        print (type(chatHistory))
        return (chatHistory.json())


if __name__ == '__main__': # function to run (except imported)
    app.run(debug=True, port=5002) # flask --app app run --debug --port 5002


