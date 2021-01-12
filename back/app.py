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
    # 预处理
    # 将白底黑字转换为黑底白字
    input2 = ((255-np.array(request.json, dtype=np.uint8))).reshape(28, 28)

    output3 = to_predict(input2).tolist()

    return jsonify(results=[output3])
