# 🚦 Move Smart – Smart Traffic Automation System

**Move Smart** is an intelligent traffic management system that utilizes computer vision and machine learning to optimize traffic flow, reduce congestion, and prioritize emergency vehicles. Designed for smart cities, this system dynamically adjusts traffic signal timings based on real-time traffic conditions using video analysis.

---

## 📌 Features

- 🚗 Vehicle Detection: Detects and counts vehicles in real-time from CCTV/video feeds.
- 🚨 Emergency Vehicle Recognition: Identifies ambulances, fire trucks, and police vehicles using YOLOv8.
- ⏱ Dynamic Signal Timing: Automatically adjusts traffic light durations based on congestion levels.
- 🧠 Machine Learning: Implements ML models for accurate detection and classification.
- 📷 OpenCV Integration: Processes live video streams and displays bounding boxes with labels.
- 🌐 Scalable for Smart Cities: Designed to be integrated into existing traffic control infrastructure.

---

## 📁 Project Structure

move-smart/
│
├── dataset/                     # Training and test datasets
│   └── emergency_vehicles/     # YOLOv8-labeled images/videos
│
├── models/                     # Saved ML models
│   └── traffic_model.pt
│
├── src/
│   ├── vehicle_counter.py      # Counts and classifies vehicles
│   ├── emergency_detector.py   # Detects emergency vehicles
│   ├── signal_controller.py    # Manages signal timing logic
│   └── utils.py                # Helper functions
│
├── output/                     # Output videos/images with detections
│
├── requirements.txt            # Required Python packages
├── README.md                   # Project documentation
└── run.py                      # Main file to start the system

---

## 🛠 Installation

1. Clone the repo
   git clone https://github.com/yourusername/move-smart.git
   cd move-smart

2. Create a virtual environment (optional but recommended)
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate

3. Install dependencies
   pip install -r requirements.txt

---

## 🚀 Usage

1. Run the main script
   python run.py

2. Customize the video input source  
   Edit run.py to switch between live camera feed or pre-recorded video.

3. View Results  
   Processed videos with bounding boxes and labels will be saved in the output/ folder.

---

## 🧠 Technologies Used

- Python
- OpenCV
- YOLOv8
- TensorFlow / PyTorch
- NumPy, Pandas
- Matplotlib (for visualization)

---

## 📊 Future Enhancements

- Cloud-based deployment
- Dashboard to monitor real-time traffic stats
- Integration with IoT-enabled traffic lights
- Multi-camera support with city-scale deployment
- GPS tracking for emergency route optimization

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!  
Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙌 Acknowledgements

- YOLOv8 by Ultralytics  
- OpenCV community  
- TensorFlow and PyTorch contributors  
- MRCET Cyber Security Department – for hosting the hackathon where this project was born!
