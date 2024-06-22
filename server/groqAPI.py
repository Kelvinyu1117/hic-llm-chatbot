from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json
import logging 
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()


logging.basicConfig(level=logging.DEBUG)

client = Groq(api_key="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",)
chat_completion = client.chat.completions.create(
messages=[
            {
                "role": "user",
                "content": "Explain the importance of fast language models",
            }
 ],
 model="llama3-70b-8192",
    )
output="HelloWorld"

print (chat_completion.choices[0].message.content)

