import tensorflow as tf
import numpy as np
import cv2

model = tf.keras.applications.MobileNetV2(weights='imagenet')

def preprocess_image(image_path):
    image = cv2.imread(image_path)  # Read the image using OpenCV
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
    image = cv2.resize(image, (224, 224))  # Resize to 224x224 pixels (required by MobileNetV2)
    image = np.expand_dims(image, axis=0)  # Add a batch dimension (for model input)
    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)  # Normalize image
    return image

image_path = 'road(1).jpg'
image = preprocess_image(image_path)

predictions = model.predict(image)

decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)
for i, pred in enumerate(decoded_predictions[0]):
    print(f"{i+1}: {pred[1]} ({pred[2]*100:.2f}%)")

