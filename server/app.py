from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/threads', methods=['GET', 'POST'])
def handle_threads():
    #Displaying 
    if request.method == 'POST':
        content = request.form['postContent']
        response = {
            "content": content,
            "timestamp": datetime.now(),
        }
        return jsonify(response), 201

    # http://localhost:5000/api/threads
    if request.method == 'GET':
        threads = {
            "content": "Content 1",
            "current_time": datetime.now(),
        }
        return jsonify(threads)

if __name__ == '__main__':
    app.run(debug=True)
