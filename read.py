from keras.models import load_model
import keras.applications.xception as xception
from PIL import Image, ImageOps #Install pillow instead of PIL
import numpy as np
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = load_model('model.h5', compile=False)
model.summary()
# Load the labels
class_names = open('labels.txt', 'r').readlines()
IMAGE_WIDTH = 71
IMAGE_HEIGHT = 71
# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1.
data = np.ndarray(shape=(1, IMAGE_WIDTH, IMAGE_HEIGHT, 3), dtype=np.float32)

# Replace this with the path to your image
image = Image.open('garbage_classification\\plastic\\plastic21.jpg').convert('RGB')

#resize the image to a 224x224 with the same strategy as in TM2:
#resizing the image to be at least 224x224 and then cropping from the center
size = (IMAGE_WIDTH, IMAGE_HEIGHT)
image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

#turn the image into a numpy array
image_array = np.asarray(image)

# Normalize the image
normalized_image_array = (image_array.astype(np.float32)) 

# Load the image into the array
data[0] = normalized_image_array

# run the inference
prediction = model.predict(data)
index = np.argmax(prediction)
class_name = class_names[index]
confidence_score = prediction[0][index]

print('Class:', class_name, end='')
print('Confidence score:', confidence_score)
print(prediction[0])
