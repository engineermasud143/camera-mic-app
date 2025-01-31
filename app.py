import os
import base64
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
IMAGE_FOLDER = os.path.join(UPLOAD_FOLDER, 'images')
AUDIO_FOLDER = os.path.join(UPLOAD_FOLDER, 'audio')

os.makedirs(IMAGE_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_image', methods=['POST'])
def upload_image():
    image_data = request.form['imageData'].split(',')[1]
    image_bytes = base64.b64decode(image_data)
    with open(os.path.join(IMAGE_FOLDER, 'image.png'), 'wb') as f:
        f.write(image_bytes)
    return redirect(url_for('index'))

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    audio_data = request.form['audioData'].split(',')[1]
    audio_bytes = base64.b64decode(audio_data)
    with open(os.path.join(AUDIO_FOLDER, 'audio.wav'), 'wb') as f:
        f.write(audio_bytes)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)