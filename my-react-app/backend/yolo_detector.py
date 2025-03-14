import cv2
import torch
import os

MODEL_PATH = "yolov8n.pt"
PROCESSED_FOLDER = "processed_videos"

# Load YOLOv8 model
model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH)

def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return None

    filename = os.path.basename(video_path)
    output_path = os.path.join(PROCESSED_FOLDER, f"processed_{filename}")

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # YOLO Detection
        results = model(frame)
        detected_frame = results.render()[0]

        out.write(detected_frame)

    cap.release()
    out.release()

    return f"processed_videos/processed_{filename}"
