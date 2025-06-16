# 1. Impor semua library yang dibutuhkan
import os
import base64
from collections import Counter

import cv2
import mediapipe as mp
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.models import load_model

# 2. Inisialisasi Aplikasi Flask
app = Flask(__name__)
CORS(app)

# 3. Setup Model dan MediaPipe
mp_holistic = mp.solutions.holistic
model = load_model('action_v2.h5', compile=False)
model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])

actions = np.array(['A', 'B', 'C', 'senin', 'selasa', 'rabu', 'aku', 'kamu', 'terima_kasih'])

# 4. Variabel Global untuk Deteksi Real-Time
sequence = []
predictions = []
threshold = 0.6  # Nilai yang bisa Anda sesuaikan

# 5. Fungsi Helper
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])

# 6. Endpoint untuk Deteksi REAL-TIME
@app.route('/predict', methods=['POST'])
def predict():
    global sequence, predictions
    
    data = request.get_json()
    img_data = data['image'].split(',')[1]
    img_binary = base64.b64decode(img_data)
    np_arr = np.frombuffer(img_binary, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    detected_word = ''
    left_hand_landmarks = []
    right_hand_landmarks = []

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        _, results = mediapipe_detection(frame, holistic)
        
        # Ekstrak koordinat tangan untuk bounding box
        if results.left_hand_landmarks:
            left_hand_landmarks = [{'x': lm.x, 'y': lm.y} for lm in results.left_hand_landmarks.landmark]
        if results.right_hand_landmarks:
            right_hand_landmarks = [{'x': lm.x, 'y': lm.y} for lm in results.right_hand_landmarks.landmark]

        # Proses untuk prediksi model
        keypoints = extract_keypoints(results)
        sequence.append(keypoints)
        sequence = sequence[-30:]
        
        if len(sequence) == 30:
            res = model.predict(np.expand_dims(sequence, axis=0), verbose=0)[0]
            
            # --- BLOK DEBUGGING YANG DITAMBAHKAN KEMBALI ---
            prediction_index = np.argmax(res)
            prediction_score = res[prediction_index]
            prediction_action = actions[prediction_index]
            # Cetak prediksi mentah setiap saat untuk memantau
            print(f"Prediksi Mentah: {prediction_action}, Skor: {prediction_score:.4f}")
            # --- AKHIR BLOK DEBUGGING ---

            predictions.append(prediction_index)
            
            # Logika stabilitas
            if np.unique(predictions[-10:])[0] == prediction_index:
                if prediction_score > threshold:
                    detected_word = prediction_action

    # Kembalikan kata DAN koordinat tangan
    return jsonify({
        'status': 'success', 
        'word': detected_word,
        'left_hand': left_hand_landmarks,
        'right_hand': right_hand_landmarks
    })

# 7. Endpoint untuk Upload VIDEO UTUH
@app.route('/predict-video', methods=['POST'])
def predict_video():
    # ... (kode untuk /predict-video tidak berubah, sudah benar) ...
    if 'video' not in request.files:
        return jsonify({'error': 'No video file found'}), 400

    video_file = request.files['video']
    temp_video_path = "temp_video.mp4"
    video_file.save(temp_video_path)

    cap = cv2.VideoCapture(temp_video_path)
    local_sequence = []
    all_predictions_indices = []
    
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            _, results = mediapipe_detection(frame, holistic)
            keypoints = extract_keypoints(results)
            local_sequence.append(keypoints)
            local_sequence = local_sequence[-30:]

            if len(local_sequence) == 30:
                res = model.predict(np.expand_dims(local_sequence, axis=0), verbose=0)[0]
                if res[np.argmax(res)] > threshold:
                    all_predictions_indices.append(np.argmax(res))
    
    cap.release()
    os.remove(temp_video_path)

    if len(all_predictions_indices) > 0:
        most_common_index = Counter(all_predictions_indices).most_common(1)[0][0]
        final_sentence = actions[most_common_index]
    else:
        final_sentence = "Tidak terdeteksi"

    return jsonify({'text': final_sentence})


# 8. Menjalankan Aplikasi
if __name__ == '__main__':
    app.run(port=5000, debug=True)