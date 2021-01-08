import numpy as np
from flask import Flask,render_template,request,jsonify

from ai import to_predict

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/about',methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/api/mnist', methods=['POST'])
def mnist():
    # input = ((255 - np.array(request.json, dtype=np.uint8)) / 255.0).reshape(1, 784)
    input2 = (np.array(request.json, dtype=np.uint8)).reshape(1, 784)
    # output1 = regression(input)
    # output2 = convolutional(input)
    # return jsonify(results=[output1, output2])
    output3 = to_predict(input2)
    # print(input2)
    return jsonify(results=[])
    # return jsonify(results=[output3])
