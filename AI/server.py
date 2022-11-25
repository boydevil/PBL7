import keras.applications.xception as xception
from flask import Flask
from read import predict
app = Flask(__name__)

@app.route('/process/<USER_ID>/<IMG_ID>')
def hello_name(USER_ID, IMG_ID):
   return predict(USER_ID, IMG_ID)

if __name__ == '__main__':
   app.run(debug = True)