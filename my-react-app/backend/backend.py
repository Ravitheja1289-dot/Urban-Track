import cv2
import time
import asyncio
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from ultralytics import YOLO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = YOLO("yolov8n.pt")

video_path = "traffic_video.mp4"
cap = cv2.VideoCapture(video_path)

vehicle_count = 0

def generate_frames():
    global vehicle_count
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        vehicle_types = {}
        total = 0

        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                label = model.names[int(box.cls[0])]
                conf = round(float(box.conf[0]), 2)

                # Only count vehicles
                if label in ['car', 'truck', 'bus', 'motorcycle']:
                    total += 1
                    vehicle_types[label] = vehicle_types.get(label, 0) + 1

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                text = f"{label} {conf}"
                cv2.putText(frame, text, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        vehicle_count = total
        global vehicle_type_counts
        vehicle_type_counts = vehicle_types

        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

vehicle_type_counts = {}

@app.get("/vehicle_count")
async def get_vehicle_count():
    return JSONResponse(content={
        "count": vehicle_count,
        "types": vehicle_type_counts
    })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
