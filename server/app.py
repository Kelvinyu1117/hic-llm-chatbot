from flask import Flask, request, jsonify
from flask_cors import CORS #https://pypi.org/project/Flask-Cors/
import json

app = Flask(__name__)
CORS(app)

def callLLM(user_prompt):
    output="HelloWorld"
    return (output)


@app.route('/user_question', methods=['POST'])
def get_path():
    if request.method == 'POST':
        question=request.get_json()
        return jsonify(callLLM(question))
    
@app.route('/', methods=['GET'])
def hello():
    if request.method == 'GET':
        return jsonify(message="Hello from server!")



if __name__ == '__main__':
    app.run(debug=True, port=5001) # default port is 5000, assign a different port for a new app 

# location of backend API: http://127.0.0.1:5001
    