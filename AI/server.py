import keras.applications.xception as xception
from flask import Flask, request
from read import predict
app = Flask(__name__)

@app.route('/api/v1/predict/')
def process():
   url = request.args.get('url')
   return predict(url)

if __name__ == '__main__':
   app.run(debug = True)