import tensorflow as tf
import numpy as np
import cv2

# Load a pre-trained model from TensorFlow Hub
model = tf.keras.applications.MobileNetV2(weights='imagenet')

# Preprocess the image
def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (224, 224))  # Resize to model input size
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)
    return image

# Load and analyze the image
image_path = 'ryan-walton-AbNO2iejoXA-unsplash.jpg'
image = preprocess_image(image_path)
predictions = model.predict(image)

# Decode predictions
decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)
for i, pred in enumerate(decoded_predictions[0]):
    print(f"{i+1}: {pred[1]} ({pred[2]*100:.2f}%)")
