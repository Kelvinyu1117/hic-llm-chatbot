import json
import requests
from dotenv import load_dotenv
import os

load_dotenv()
 
API_KEY = os.getenv("API_KEY")
Secret_KEY = os.getenv("Secret_KEY")
#access_token= '24.eb1f45c8ee87c563f10a4d93ca66d82e.2592000.1721612493.282335-85625207'
 
def get_access_token():
    """
    使用 API Key，Secret Key 获取access_token，替换下列示例中的应用API Key、应用Secret Key
    """
 
    url = f"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_KEY}&client_secret={Secret_KEY}"
 
    payload = json.dumps("")
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
 
    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json().get("access_token")
 
 
def do_chat():
    url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat?access_token=" + get_access_token()

    payload = json.dumps({
        "messages": [
            {
                "role": "user",
                "content": "如何预防常见的心血管疾病，如心脏病和中风？"
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
 
if __name__ == '__main__':  
    do_chat()
 