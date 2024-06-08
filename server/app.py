from flask import Flask, request, jsonify
from flask_cors import CORS #https://pypi.org/project/Flask-Cors/


app = Flask(__name__)
CORS(app)


@app.route('/GET', methods=['GET'])
def hello():
    if request.method == 'GET':
        return jsonify(message="Hello from server!")

@app.route('/POST', methods=['POST'])
def get_path():
    if request.method == 'POST':
        response=request.get_json()
        print(response)
        return (response)
    


if __name__ == '__main__':
    app.run(debug=True, port=5001) # default port is 5000, assign a different port for a new app 
# Cmd: set FLASK_RUN_PORT=5001 ; flask run
# location of backend API: http://127.0.0.1:5001
    